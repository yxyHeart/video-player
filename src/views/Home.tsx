import React, { useContext } from 'react'
// import Player from 'griffith'
import Player from '@/components/Player'



function Home() {
  const sources = {
      hd: {
        bitrate: 2005,
        size: 46723282,
        duration:182,
        format: "mp4",
        width: 1280,
        height: 720,
        play_url: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
      },
      // sd: {
      //   bitrate: 900.49,
      //   size: 20633151,
      //   duration:182,
      //   format: "mp4",
      //   width: 320,
      //   height: 240,
      //   play_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      // }
    };
    
    const props = {
      id: "zhihu2018",
      title: "zhihu2018",
      cover: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg",
      duration:182,
      sources,
      src: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4"
      // src:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    };
  return (
    <React.Fragment>
      <div>aaa</div>
      <Player {...props} />
    </React.Fragment>
  )
}

export default Home
