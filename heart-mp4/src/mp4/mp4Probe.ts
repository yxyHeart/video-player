import { Mp4BoxTree, Interval, TimeOffsetInterval } from "./types";
import {
    findBox,
    getBufferStart,
    getFragmentPosition,
    getVideoTrackInfo,
    getAudioTrackInfo,
    getVideoSamples,
    getAudioSamples,
    getAudioSamplesInterval,
    getVideoSamplesInterval,
    getNextVideoSamplesInterval,
} from './utils'

export default class MP4Probe{
    audioInterval?:TimeOffsetInterval
    videoInterval?:TimeOffsetInterval
    bufferStart:any
    mp4BoxTree:Mp4BoxTree
    mp4Data:any
    timeRange!:Interval
    constructor(mp4BoxTree:Mp4BoxTree){
        this.mp4BoxTree = mp4BoxTree
        this.mp4Data = {}
        this.init()
    }

    updateInterval = (time:number) => {
        const {videoTimescale, audioTimescale} = this.mp4Data

        if(typeof time === 'number'){
            this.videoInterval = getVideoSamplesInterval(
                this.mp4BoxTree,
                time * videoTimescale
            )
        } else {
            this.videoInterval = getNextVideoSamplesInterval(
                this.mp4BoxTree,
                this.videoInterval!.offsetInterVal[1]
            )
        }
    }

    init(){
        this.getMP4Data()
    }

    getMP4Data(){
        const {duration, timescale} = findBox(this.mp4BoxTree, 'mvhd')
        const {channelCount, sampleRate} = findBox(this.mp4BoxTree, 'mp4a')
        const {timescale:audioTimescale, duration:audioDuration} = findBox(
            this.mp4BoxTree,
            'audioMdhd'
        )
        const { ESDescrTag:{DecSpecificDescrTag:{audioConfig}}} = findBox(this.mp4BoxTree, 'esds')

        this.mp4Data = {
            duration,
            timescale,
            channelCount,
            sampleRate,
            audioConfig,
            audioDuration,
            audioTimescale,
        }
        const hasVideoStream = findBox(this.mp4BoxTree, 'videoTrak')
        if(hasVideoStream){
            const {width, height} = findBox(this.mp4BoxTree, 'videoTkhd')
            const {samples} = findBox(this.mp4BoxTree, 'videoStsz')
            const {SPS,PPS} = findBox(this.mp4BoxTree, 'avcC')
            const {timescale:videoTimescale, duration:videoDuration} = findBox(
                this.mp4BoxTree,
                'videoMdhd'
            )
            this.mp4Data = {
                ...this.mp4Data,
                width,
                height,
                SPS,
                PPS,
                videoDuration,
                videoTimescale,
                videoSamplesLength:samples.length
            }

        }

    }
}