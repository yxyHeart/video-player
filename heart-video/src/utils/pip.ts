class Pip{
    public inited = false
    public element?:HTMLVideoElement
    public onEnter?:(e:Event) => void
    public onExit?:(e:Event) => void

    init(
        element:HTMLVideoElement,
        onEnter:(e:Event)=>void,
        onExit:(e:Event)=>void
    ){
        this.inited = true
        this.element = element
        this.onEnter = onEnter
        this.onExit = onExit
        this.element.addEventListener('enterpictureinpicture',
            this.handleEnter.bind(this)
        )
        this.element.addEventListener('leavepictureinpicture',
            this.handleExit.bind(this)
        )
       
    }
    handleEnter(e:any){
        if(this.onEnter){
            this.onEnter(e)
        }
    }
    handleExit(e:any){
        if(this.onExit){
            this.onExit(e)
        }
    }
    get supported(){
        if(!this.inited) return false
        return (document as any).pictureInPictureEnabled as boolean
    }
    get pictureInPictureElement(){
        return (document as any).pictureInPictureElement as Element | null
    }
    request(){
        if(this.element){
            (this.element as any).requestPictureInPicture()
        }
    }
    exit(){
        (document as any).exitPictureInPicture()
    }
    toggle(){
        if(this.pictureInPictureElement){
            this.exit()
        }else{
            this.request()
        }
    }

}
export default Pip