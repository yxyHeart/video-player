import React, { useContext } from 'react'
import Player from '../components/Player'


function Home() {
  const duration = 182;

  const sources = {
    hd: {
      bitrate: 2005,
      size: 46723282,
      duration,
      format: "mp4",
      width: 1280,
      height: 720,
      play_url: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
    },
    sd: {
      bitrate: 900.49,
      size: 20633151,
      duration,
      format: "mp4",
      width: 320,
      height: 240,
      play_url: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4"
    }
  };
  
  const props = {
    id: "zhihu2018",
    title: "zhihu2018",
    cover: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg",
    duration,
    sources,
    src: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4"
  };
  return (
    <React.Fragment>

      <Player {...props} />
      
    </React.Fragment>
  )
}

export default Home
