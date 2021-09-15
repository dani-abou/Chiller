import React, { useEffect, useState } from "react";
import axios from "axios";
import TrackInfo from "./Components/TrackInfo";
import ReactPlayer from "react-player";

function useVideoSearch(playingTrack) {
  const [videoId, setVideoId] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(true);
  async function videoSearch() {
    if (!playingTrack) return;
    const keyword = playingTrack.title + " " + playingTrack.artist;
    axios
      .post("http://localhost:3001/youtube", { keyword })
      .then((res) => setVideoId(res.data.videoId));
  }
  useEffect(() => {
    videoSearch().then(() => setLoadingVideo(false));
  }, [playingTrack]);
  return [videoId, loadingVideo];
}

export default function Player({
  playingTrack,
  nextTrack,
  lastTrack,
  fsHandle,
}) {
  const [videoId, loadingVideo] = useVideoSearch(playingTrack);
  const [playing, setPlay] = useState(true);

  const playerRef = React.createRef();

  const checkTime = () => {
    if (playerRef.current.getCurrentTime() >= 5) {
      playerRef.current.seekTo(0);
    } else lastTrack();
  };

  useEffect(() => setPlay(true), [playingTrack]);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        margin: "0",
        padding: "0",
        height: "100vh",
      }}
    >
      {loadingVideo || !playingTrack ? (
        <h1 style={{ textAlign: "center", color: "#91ffad", margin: "0" }}>
          Please select song
        </h1>
      ) : (
        <div style={{ height: "100%", padding: "0", margin: "0" }}>
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=" + videoId}
            playing={playing}
            controls={true}
            width="100%"
            height="70%"
            ref={playerRef}
            onEnded={nextTrack}
            onReady={() => setPlay(true)}
          />
          <TrackInfo
            track={playingTrack}
            playing={playing}
            setPlay={setPlay}
            nextTrack={nextTrack}
            lastTrack={checkTime}
            fsHandle={fsHandle}
          />
        </div>
      )}
    </div>
  );
}
