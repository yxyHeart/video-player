import Player from 'heart-video'
import VideoSwitch from '@/components/VideoSwitch';
import { useEffect, useState } from 'react';

export default function Recommend() {
    useEffect(()=>{
        const handleScroll = (event:WheelEvent) => {
            event.preventDefault()
            if (event.deltaY > 0) {

              setCurSourceIndex(curSourceIndex-1)
              console.log('向下滚动');

            } else {
              console.log('向下滚动');
              setCurSourceIndex(curSourceIndex+1)
            }
        };
        window.addEventListener('wheel', handleScroll, {passive:false});

        return ()=>{
            window.removeEventListener('wheel', handleScroll,)
        }
    },[])

    const [curSourceIndex, setCurSourceIndex] = useState<number>(0)
    const source0 = {
      hd: {
       
        play_url:"https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
      },
    };
    const source1 = {
      hd: {
       
        play_url:"http://vjs.zencdn.net/v/oceans.mp4"
      },
    };
    const source2 = {
      hd: {
        
        play_url:"http://vjs.zencdn.net/v/oceans.mp4"
      },
    };
    const sources = [source0,source1,source2]

    return (

        <div className='flex justify-around items-center h-[100%] w-[100%]'>
            <Player sources={sources[curSourceIndex]} id={'1'} initialObjectFit='fill' />
            
            <VideoSwitch curSourceIndex={curSourceIndex} setCurSourceIndex={setCurSourceIndex}/>
        </div>
         
        
    )
  }