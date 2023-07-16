import React,{useEffect, useState} from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
// import io from 'socket.io-client';
// const socket = io('http://localhost:3001');
const YoutubeVideo = ({ link , room, socket}) =>{ 
  const [playing, setPlaying] = useState(true);
  const pauseVideo = () => {
    console.log("pause");
    socket.emit("on_pause", link);
  }

  const pauseAll = () => {
    setPlaying(false);
  }
  const resumeVideo = () => {
    console.log("resume");
    socket.emit("on_resume", room);
    //console log current room

    console.log(socket);

  }

  const resumeAll = () => {
    setPlaying(true)
  }
  useEffect(() => {
    socket.on("on_pause", () => {
      alert("Hello");
    })
    // socket.on("pause", (data) => {
    //   console.log("Hello")
    // })
   
    // console.log("USE EFFECT FIRING")
    // socket.on("pause", (data) => {
    //   console.log("Pausing All")
    //   pauseAll();
    // })

    // socket.on("resume", (data) => {
    //   console.log("Resuming All")
    //   resumeAll();
    // })


  }, [])

  
  
  return(
  <div className="video-responsive">
    {/* <iframe
      width="853"
      height="480"
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    /> */}


    <ReactPlayer url={link}
    
    playing={playing}
    controls={true}
    width="853px"
    height="480px"
    onPause={()=>console.log("paused")}
    onPlay={()=>console.log("playing")}
    onEnded={()=> {"Hello World"}}
    />
    
    <button size="small">
      {playing? (
        <button onClick={pauseVideo}>Pause</button>
      ) : (
        <button onClick={resumeVideo}>Resume</button>
      )}
    </button>
  </div>
);
}

YoutubeVideo.propTypes = {
  link: PropTypes.string.isRequired
};

export default YoutubeVideo;