import { Button } from '@Components';
import React, { useState, useEffect, useRef } from 'react';
// import RecordRTC from 'recordrtc';
// import NoiseSuppression from 'noisereduction';

function ScreenRecorder() {
  const [recordRTC, setRecordRTC] = useState<any>(null);
  const [videoRTC, setVideoRTC] = useState<any>(null)
  const [videoURL, setVideoURL] = useState<any>('');
  const videoRef = useRef<any>(null);


  const startRecording = async () => {}

  //   const resolution = {
  //     width: 1920,
  //     height: 1080,
  //     frameRate: 60,
  //   };

  //   const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
  //   if (videoRef.current) {
  //     videoRef.current.srcObject = videoStream;
  //   }

  //   const audioStream = await navigator.mediaDevices.getUserMedia({
  //     audio: {
  //       mandatory: {
  //         echoCancellation: false,
  //         googAutoGainControl: false,
  //         googNoiseSuppression: false,
  //         googHighpassFilter: false
  //       },
  //       optional: [{
  //         googAudioMirroring: false
  //       }]
  //     } as any
  //   });

  //   const stream = await navigator.mediaDevices.getDisplayMedia({
  //     video: {
  //       cursor: 'always',
  //       displaySurface: 'monitor',
  //       logicalSurface: true,
  //       chromeMediaSource: 'desktop',
  //       chromeMediaSourceId: 'screen:0:0'
  //     } as any,
  //     // audio: true
  //   });


    // const videoRecord = new RecordRTC(videoStream, {
    //   type: 'video'
    // })

    // const recorder = new RecordRTC([stream, audioStream] as any, {
    //   type: 'video',
    //   video: resolution,
    //   mimeType: 'video/web  ',
    //   bitsPerSecond: 128000,
    //   frameRate: 60,
    //   quality: 10,
    //   audioBitsPerSecond: 128000
    // } as any);



  //   recorder.startRecording();
  //   setRecordRTC(recorder);
  //   setVideoRTC(videoRecord)
  // };

  console.log("recordRTC", recordRTC)



  const stopRecording = () => {
    recordRTC.stopRecording(() => {
      const blob = recordRTC.getBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded-video.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });


    // const mainStream = recordRTC.getBlob().audioVideo; // Get the main stream from the recorded blob
    // mainStream.getTracks().forEach(track => {
    //   track.stop();
    // });

    // const screenStream = recordRTC.getInternalRecorder().getDesktopStream();
    // screenStream.getTracks().forEach(track => {
    //   track.stop();
    // });
    // // Stop sharing the audio stream
    // const audioStream = recordRTC.getInternalRecorder().getAudioStream();
    // audioStream.getTracks().forEach(track => {
    //   track.stop();
    // });

    // const videoStream = recordRTC.getInternalRecorder().getVideoStream();
    // videoStream.getTracks().forEach(track => {
    //   track.stop();
    // });
    // videoRef.current.srcObject = null;
    // setRecordRTC(null)


  };







  return (
    <div className='container-fluid'>
      {/* <div className='pt-2'>
        <Button onClick={startRecording} text={"Start Video"} />
        <Button onClick={stopRecording} text={"Stop Video"} />
      </div> */}
      {/* {videoURL && <video src={videoURL} controls />} */}
      <div className='' style={{ position: "fixed", bottom: '0px', right: '2px' }}>
        <video ref={videoRef} autoPlay playsInline style={{ height: "200px", borderRadius: '100%' }} />
      </div>

    </div>
  );
}

export { ScreenRecorder }