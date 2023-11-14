import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import {EVENTS} from 'heart-message'
import {logger,ua} from 'heart-utils'
import { PlaybackRate, Quality, PlaySource, ProgressValue } from '../types'
import VideoSourceContext from '../contexts/VideoSourceContext'
import VideoWithMessage, {VideoComponentType} from './VideoWithMessage'
import selectVideo from './selectVideo'
import styles from './Video.styles'


const {isMobile} = ua

const isAbortError = (error:MediaError)=>
    (error && (error as unknown as Error).name === 'AbortError') ||
    (error instanceof MediaError && error.code === MediaError.MEDIA_ERR_ABORTED)

const isNotAllowedError = (error:MediaError)=>{
    return error && (error as unknown as Error).name === 'NotAllowedError'
}

type NativeVideoProps = Omit<React.HTMLProps<HTMLVideoElement>, 'ref'>

type VideoProps = NativeVideoProps & {
    format:string
    paused?:boolean
    useMSE?:boolean
    volume:number
    currentQuality?:Quality
    sources?:PlaySource[]
    // 自定义事件（注意与原生不同，附加了自定义参数）
    onLoadingChange?:(isLoading:boolean)=>void
    onDurationUpdate:(duration:number)=>void
    onProgressUpdate:(value:ProgressValue[])=>void
    onCurrentTimeUpdate:(time:number, isRaf:boolean)=>void
    onError:(...args:any[])=>void
    onEvent:(name:EVENTS, data?: unknown)=>void
    currentPlaybackRate:PlaybackRate
    useAutoQuality?:boolean
}

class Video extends Component<VideoProps>{
    static defaultProps = {
        paused:true,
        volume:0.5,
    }

    _timeUpdateRafId?:number
    handleClick:any
    playPromise?:Promise<void>

    isMetadataLoaded = false
    pendingAction:{paused:boolean,currentTime:number} | null = null
    loading = false
    isSwitchDefinition = false
    //refs
    root:HTMLVideoElement | null = null

    componentDidMount(): void {
        this.root!.volume = this.props.volume ** 2
    }

    getSnapshotBeforeUpdate(){
        return {
            paused:this.root!.paused,
            currentTime:this.root!.currentTime,
        }
    }

    componentDidUpdate(prevProps: Readonly<VideoProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const {
            src,
            paused,
            volume,
            format,
            useMSE,
            currentPlaybackRate,
            currentQuality,
            onEvent
        } = this.props

        /**
         * 切换清晰度，如果是非 mse 视频（src 是 blob 类型）
         * data 变化的时候会 remount，所以 componentDidUpdate 中 src 变化一定是清晰度变了
         */
        if(prevProps.src && src!== prevProps.src){
            this.isSwitchDefinition = true
            onEvent(EVENTS.CHANGE_QUALITY_START, currentQuality)
            const {willHandleSrcChange} = selectVideo(format,useMSE)
            // TODO 这一块逻辑需要 Video 自己处理
            if(!willHandleSrcChange){
                this.safeExecute(()=>{
                    this.isMetadataLoaded = false
                    this.seek(snapshot.currentTime)
                    if(!snapshot.paused){
                        this.play()
                    }
                })
            }
        }
        if(
            paused !== prevProps.paused &&
            this.root && 
            paused !== this.root.paused
        ){
            if(paused){
                this.pause()
            }else{
                this.play()
            }
        }

        if (this.root && this.root.volume !== volume ** 2 && !isMobile) {
            this.root.volume = volume ** 2
        }

        if (prevProps.currentPlaybackRate.value !== currentPlaybackRate.value) {
            this.setRate(currentPlaybackRate)
        }
    }

    pending(action:any){
        this.pendingAction = {
            ...this.pendingAction,
            ...action
        }
    }

    applyPendingAction(){
        
        if(!this.pendingAction){
            return
        }

        const action = this.pendingAction
        this.pendingAction = null

        if(action.currentTime !== undefined){
            this.seek(action.currentTime)
        }

        if(
            action.paused !== undefined &&
            this.root &&
            action.paused !== this.root.paused
        ){
            if(action.paused){
                this.pause()
            }else{
                this.play()
            }
        }
    }

    safeExecute = (fn:()=>void) => {
        if(this.playPromise !== undefined){
            void this.playPromise.then(()=>{
                fn()
            })
        }else{
            fn()
        }
    }

    setRate(rate:any){
        if(!isMobile && !this.isMetadataLoaded){
            this.pending({paused:true})
            return 
        }
        this.safeExecute(()=>(this.root!.playbackRate = Number(rate.value)))
    }

    play(){
        if(!isMobile && !this.isMetadataLoaded){
            this.pending({paused:false})

            if(this.root?.load){
                this.safeExecute(()=>this.root!.load())
            }

            return
        }

        this.playPromise = Promise.resolve(this.root!.play())
            .catch((error)=>{
                const {onError} = this.props
                if(onError){
                    onError(error)
                }
            })

    }

    pause(){
        if(!isMobile && !this.isMetadataLoaded){
            this.pending({paused:true})
            return
        }
        this.safeExecute(()=>this.root!.pause())
    }

    seek(currentTime:number){
        if(!Number.isFinite(currentTime)) return 

        if(!this.isMetadataLoaded){
            this.pending({currentTime})
            return
        }

        if(this.root?.duration){
            this.root.currentTime = currentTime
        }
    }

    handleMetadataLoaded = ()=>{
        
        this.isMetadataLoaded = true
        this.applyPendingAction()
        if(this.isSwitchDefinition){
            this.isSwitchDefinition = false
            this.setRate(this.props.currentPlaybackRate)
            this.props.onEvent(
                EVENTS.CHANGE_QUALITY_SUCCESS,
                this.props.currentQuality
            )
        }
    }

    handleDurationChange = () =>{
        const {onDurationUpdate} = this.props
        if(onDurationUpdate){
            onDurationUpdate(this.root!.duration)
        }
    }

    prevLoadingEvent?:'waiting' | 'canplay' | 'playing' | 'error' = undefined
    handleNativeEvent = (e:React.SyntheticEvent<HTMLVideoElement,Event>) => {
        const type = e.type
        if(
            type === 'waiting' ||
            type === 'canplay' ||
            type === 'playing' ||
            type === 'error'
        ){
            if(type === 'waiting'){
                this.loading = true
                this.props.onLoadingChange?.(this.loading)
            }else if(
                (type === 'canplay' && this.prevLoadingEvent === 'waiting') ||
                type === 'playing' ||
                type === 'error'
            ){
                this.loading = false
                this.props.onLoadingChange?.(this.loading)
            }
            this.prevLoadingEvent = type
        }
    }

    handleTimeUpdate = ()=>{
        this.notifyTimeUpdate(false)
    }

    // NOTE: 原生 `timeupdate` 事件更新频率不固定（4Hz~66Hz，由系统决定），这里以 rAF 提高了 UI 更新频率
    // TODO: 考虑使用回调直接操作 DOM，减少 React rendering
    notifyTimeUpdate = (isRaf:boolean)=>{
        const {onCurrentTimeUpdate, paused} = this.props

        if(this._timeUpdateRafId !== undefined){
            window.cancelAnimationFrame(this._timeUpdateRafId)
        }
        if(paused || this.loading){
            return
        }
        const currentTime = this.root?.currentTime
        if(onCurrentTimeUpdate && currentTime){
            onCurrentTimeUpdate(currentTime, isRaf)
            if(!isMobile){
                // 移动端使用原生进度条，不需要频繁更新，减少性能压力
                this._timeUpdateRafId = window.requestAnimationFrame(()=>
                    this.notifyTimeUpdate(true)    
                )
            }
        }
    }

    handleProgress = ()=>{
        const {onProgressUpdate} = this.props
        const buffered = this.root!.buffered
        const result:ProgressValue[] = []
        for(let i=0;i<buffered.length;i++){
            result.push({
                start:buffered.start(i),
                end:buffered.end(i)
            })
        }
        if(onProgressUpdate){
            onProgressUpdate(result)
        }
    }

    handleError = ()=>{
        const {error, currentTime} = this.root || {}
        if(!error){
            return
        }
        
        const {code, message} = error
        
        logger.debug('Error:%o',{code,message,name:(error as any).name})

        const dontReportPlayFailed = isNotAllowedError(error) || isAbortError(error)
        
        if(!dontReportPlayFailed){
            this.props.onEvent(EVENTS.PLAY_FAILED, {currentTime})
        }

        if(this.isSwitchDefinition){
            this.isSwitchDefinition = false
            this.setState(this.props.currentPlaybackRate)
            this.props.onEvent(EVENTS.CHANGE_QUALITY_FAIL, this.props.currentQuality)
        }
        this.props.onError(error)

    }

    render(){
        const {
            src,
            controls,
            loop,
            paused,
            volume,
            onPlay,
            onPause,
            onEnded,
            onLoadedData,
            onSeeking,
            onSeeked,
            format,
            useMSE,
            sources,
            currentQuality
        } = this.props

        const {VideoComponent} = selectVideo(format,useMSE)

        return (
            <VideoWithMessage 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onRef: (node: any) => void; className: str... Remove this comment to see the full error message
                onRef ={(node:any)=>{
                    this.root = node
                }}
                className={css(styles.root)}
                preload="metadata"
                playsInline
                webkit-playinline=""
                x-webkit-airplay="deny"
                muted={!volume}
                controls={controls}
                loop={loop}
                src={src}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={onEnded}
                onLoadedData={onLoadedData}
                onSeeking={onSeeking}
                onSeeked={onSeeked}
                onClick={this.handleClick}
                onLoadedMetadata={this.handleMetadataLoaded}
                onError={this.handleError}
                onDurationChange={this.handleDurationChange}
                onTimeUpdate={this.handleTimeUpdate}
                onProgress={this.handleProgress}
                onNativeEvent={this.handleNativeEvent}
                paused={paused}
                sources={sources}
                currentQuality={currentQuality}
                Video={VideoComponent as VideoComponentType}
            />

        )
    }
}

type InjectedProps = 
    'src'|
    'format'|
    'sources'|
    'currentQuality'|
    'currentPlaybackRate'

export default React.forwardRef<any, Omit<VideoProps, InjectedProps>>((props, ref)=>{
    return (
       <VideoSourceContext.Consumer>
            {
                ({currentSrc,sources,currentQuality,format,currentPlaybackRate}) =>{
                    return(
                        <Video 
                            ref={ref}
                            {...props}
                            src={currentSrc}
                            format={format}
                            sources={sources}
                            currentQuality={currentQuality}
                            currentPlaybackRate={currentPlaybackRate}
                        />
                    )
                }
            }
        </VideoSourceContext.Consumer>
    )
})