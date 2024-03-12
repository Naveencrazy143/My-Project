import { Button } from "@Components";
import { useState, useEffect } from "react";

import YouTube, { YouTubePlayer } from "react-youtube";
import { VideoPlayerYoutubeProps } from "./interface";
import { settingYoutubeVideoTitle } from "@Redux";
import { useDispatch } from "react-redux";

// import "./styles.css";

let videoElement: YouTubePlayer = null;

const VideoPlayerYoutube = ({ videoId, videoStyle, videoListener }: VideoPlayerYoutubeProps) => {

  const dispatch = useDispatch();
  const [isPaused, setIsPaused] = useState(false);


  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 0
    }
  };

  useEffect(() => {
    if (videoElement) {
      // get current time
      const elapsed_seconds = videoElement.target.getCurrentTime();

      // calculations
      const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
      const ms = elapsed_milliseconds % 1000;
      const min = Math.floor(elapsed_milliseconds / 60000);
      const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

      const formattedCurrentTime =
        min.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0") +
        ":" +
        ms.toString().padStart(3, "0");

      console.log(formattedCurrentTime);

      // Pause and Play video
      if (isPaused) {
        videoElement.target.pauseVideo();
      } else {
        // Commented For Now -------------------------------------
        // videoElement.target.playVideo(); 
      }
    }
  }, [isPaused, videoElement]);

  //get current time and video status in real time
  useEffect(() => {

    const interval = setInterval(async () => {
      if (videoElement && videoElement.target.getCurrentTime() > 0) {
        const elapsed_seconds = videoElement.target.getCurrentTime();

        // calculations
        const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
        const ms = elapsed_milliseconds % 1000;
        const min = Math.floor(elapsed_milliseconds / 60000);
        const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

        const formattedCurrentTime =
          min.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0") +
          ":" +
          ms.toString().padStart(3, "0");

        // console.log('23232323', formattedCurrentTime);

        if (videoListener) {
          videoListener(formattedCurrentTime, videoElement.target.playerInfo.playerState === 1 ? true : false)
        }
        // verify video status
        if (videoElement.target.playerInfo.playerState === 1) {
        } else if (videoElement.target.playerInfo.playerState === 2) {
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onReady = (event: YouTubePlayer) => {
    videoElement = event;
    const durationInSeconds = videoElement.target.getDuration();
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    dispatch(settingYoutubeVideoTitle(event.target.getVideoData().title));
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={videoStyle ? videoStyle : opts} onReady={onReady} />
      {/* <Button onClick={togglePause} text={'Pause'}/> */}
    </div>
  );
}

export { VideoPlayerYoutube }
