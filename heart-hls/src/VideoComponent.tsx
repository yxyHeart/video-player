import React, {Component} from "react";
import Hls from "hls.js";
import { type Source } from './types'
import { getMasterM3U8Blob } from "./utils";

type NativeVideoProps = React.HTMLProps<HTMLVideoElement>

type VideoProps = NativeVideoProps & {
    paused: boolean
    currentQuality: string
    useAutoQuality: boolean
    sources: Source[]
    onRef(el: HTMLVideoElement | null): void
}

export default class VideoComponent extends Component<VideoProps>{
    hls?:Hls
    src!:string
    video:HTMLVideoElement | null = null
    manuallyBuildAdaptiveM3U8Blob = false
    hasLoadStarted = false

    componentDidMount(): void {
        const {src, sources, useAutoQuality} = this.props
        this.hls = new Hls({autoStartLoad:false})
        this.hls.attachMedia(this.video!)

        const isAutoQualitySourceProvided = Boolean(
            sources.find((s)=>s.quality === 'auto')
        )

        if(useAutoQuality && !isAutoQualitySourceProvided){
            const master = getMasterM3U8Blob(sources)
            this.src = URL.createObjectURL(master)
            this.manuallyBuildAdaptiveM3U8Blob = true
        }else{
            this.src = src!
        }

        this.hls.loadSource(this.src)
    }

    componentDidUpdate(prevProps: Readonly<VideoProps>): void {
        const {currentQuality, sources, paused, src} = this.props

        if(!this.hls){
            return
        }

        if(currentQuality!==prevProps.currentQuality || prevProps.src !== src){
            const source = sources.find((s)=>s.quality === currentQuality)
            if(source){
                if(this.manuallyBuildAdaptiveM3U8Blob){
                    const levels = this.hls.levels
                    const level = levels.findIndex((l)=>{
                        l.url.includes(source.source as any)
                    })
                    this.hls.nextLevel = level
                }else{
                    const currentTime = this.video!.currentTime
                    this.hls.destroy()
                    this.hls = new Hls({autoStartLoad: false})
                    this.hls.attachMedia(this.video!)
                    this.hls.loadSource(source.source)
                    this.video!.currentTime = currentTime
                    this.hls.startLoad()
                    if(!paused){
                        void this.video!.play()
                    }
                }
            }else {
                this.hls.nextLevel = -1
            }

        }
    }

    componentWillUnmount(): void {
        this.hls!.destroy()
        if(this.manuallyBuildAdaptiveM3U8Blob){
            URL.revokeObjectURL(this.src)
        }
    }
    
    render(){
        const {
            onRef,
            currentQuality,
            useAutoQuality,
            src,
            sources,
            paused,
            ...props
        } = this.props
        
        return (
            <video 
                ref={(el)=>{
                    if(onRef){
                        onRef(el)
                    }
                    this.video = el
                }}
                {...props}
            />
            
        )
    }

}