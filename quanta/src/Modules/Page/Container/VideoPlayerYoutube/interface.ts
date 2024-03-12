export interface VideoPlayerYoutubeProps {
    videoId?:string;
    videoStyle?:any;
    videoListener?:(time:any, isPaused:boolean)=>void;
}