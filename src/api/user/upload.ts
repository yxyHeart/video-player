import SparkMD5 from "spark-md5";
import { request } from "@/utils/service"
import type * as User from './type/user'


class FileUploader{
    private readonly chunkSize = 1 * 1024 * 1024;
    private file:File
    private fileMD5:string|null=null
    constructor(file:File){
        this.file = file
    }
    async calculateFileMD5(){
        await this.getFileMD5().then((MD5)=>{
            this.fileMD5 = MD5 as string
        })
    }
    getFileMD5(){
        return new Promise((resolve)=>{
            let fileReader = new FileReader()
            fileReader.onload = function(event){
                let fileMD5 = SparkMD5.ArrayBuffer.hash(event.target!.result as ArrayBuffer)
                resolve(fileMD5)
            }
            fileReader.readAsArrayBuffer(this.file)
        })
    }

    uploadFile() {
        return new Promise((resolve, reject) => {
            if (!this.file) {
                reject("No file selected.");
                return;
            }
            if (this.fileMD5 === null) {
                reject("File MD5 not available.");
                return;
            }
      
            let fileArr = this.sliceFile();
            let fileName = this.file.name;
            console.log(fileArr)
            let promises = fileArr.map((e, i) => {
                return new Promise((resolve, reject) => {
                let data = new FormData();
                data.append("totalNumber", String(fileArr.length));
                data.append("chunkSize", String(this.chunkSize));
                data.append("chunkNumber", String(i));
                data.append("md5", this.fileMD5!);
                data.append("file", new File([e], fileName));
                for(const [k,v] of data.entries()){
                    console.log(k,v)
                }
                this.upload(data)
                    .then(resolve)
                    .catch((error) => {
                        reject(error);
                    });
                });
            });
      
        Promise.all(promises)
            .then(() => {
                resolve("File upload completed.");
            })
            .catch((error) => {
                reject(error);
            });
        });
      }
    upload(data:FormData){
        return request({
            url:"users/uploadBig",
            method:"post",
            data
        },
        "multipart/form-data"
        )
    }

    sliceFile(){
        const chunks = []
        let start = 0
        let end
    
        while(start < this.file.size){
            end = Math.min(start + this.chunkSize, this.file.size)
            chunks.push(this.file.slice(start, end))
            start = end
        }
        return chunks
    }

    check(data:User.GetUserCheckFileData){
        return request<User.GetUserCheckFileResponseData>({
            url:"users/checkFile",
            method:'get',
            data:data
        })
    }
}

export default FileUploader
