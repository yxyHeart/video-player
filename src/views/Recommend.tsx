import Player from 'griffith'
import VideoSwitch from '@/components/VideoSwitch';
import { useEffect, useState } from 'react';

export default function Recommend() {
    useEffect(()=>{
        const handleScroll = (event) => {
            // 阻止默认滚动行为
            event.preventDefault();
      
            if (event.deltaY > 0) {

                setCurSourceIndex(2)
              console.log('向下滚动');

            } else {

                setCurSourceIndex(0)
            }
        };
        window.addEventListener('wheel', handleScroll);

        return ()=>{
            window.removeEventListener('wheel', handleScroll)
        }
    },[])

    const [curSourceIndex, setCurSourceIndex] = useState<number>(0)
    const source0 = {
      hd: {
        width: 1280,
        height: 720,
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

        <div className='flex justify-between items-center'>
            <Player sources={sources[curSourceIndex]} />
            
            <VideoSwitch />
        </div>
         
        
    )
  }