import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { FileUploader } from '@/api/user';

const { Dragger } = Upload;



const UploadField: React.FC = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
  
      return false;
    },
  };

  const handleUpload = async()=>{
    const file = fileList[0]
    const fileUploader = new FileUploader(file)
    await fileUploader.calculateFileMD5()
    fileUploader.uploadFile()
      .then((res:any)=>{
        console.log(res)
      })
      .catch((error:any)=>{
        console.log(error)
    })
    // fileUploader.check()

  }
  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Dragger>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  )
}

export default UploadField;