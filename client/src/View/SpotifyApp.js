import React, { useState } from "react";
import Controller from "./Controller.js";
import Player from "./Player.js";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function SpotifyApp({ currentUser, spotifyApi }) {
  const [playingTrack, setPlayingTrack] = useState();
  const [previous, setPrevious] = useState([]);
  const [queue, setQueue] = useState([]);
  const [baseQueue, setBaseQueue] = useState([]);

  const addToQueue = (track) => {
    let newArr = queue;
    newArr.push(track);
    setQueue(newArr);
  };

  const removeFromQueue = (index) => {
    let newQueue = queue;
    newQueue.splice(index, 1);
    setQueue(newQueue);
  };

  const removeFromBaseQueue = (index) => {
    let newQueue = baseQueue;
    newQueue.splice(index, 1);
    setBaseQueue(newQueue);
  };

  const nextTrack = () => {
    if (queue.length === 0 && baseQueue.length === 0) return;
    let newPrevs = previous;
    newPrevs.unshift(playingTrack);
    setPrevious(newPrevs);
    if (queue.length === 0 && baseQueue.length > 0) {
      setPlayingTrack(baseQueue[0]);
      let newQueue = baseQueue;
      newQueue.shift();
      setBaseQueue(newQueue);
    } else {
      setPlayingTrack(queue[0]);
      let newQueue = queue;
      queue.shift();
      setQueue(newQueue);
    }
  };

  const lastTrack = () => {
    if (previous.length === 0) return;
    let newQueue = queue;
    newQueue.unshift(playingTrack);
    setQueue(newQueue);
    setPlayingTrack(previous[0]);
    let newPrevs = previous;
    newPrevs.shift();
    setPrevious(newPrevs);
  };

  const fullScreenHandle = useFullScreenHandle();

  return (
    <FullScreen handle={fullScreenHandle}>
      <div
        style={{
          height: "100%",
          backgroundColor: "#666666",
          display: "flex",
          padding: "0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: "0 0 20%",
            margin: "0",
            padding: "0",
          }}
        >
          <Controller
            spotifyApi={spotifyApi}
            setPlayingTrack={setPlayingTrack}
            queue={{
              tracks: queue,
              add: addToQueue,
              remove: removeFromQueue,
              setBase: setBaseQueue,
              baseQueue: baseQueue,
              removeBase: removeFromBaseQueue,
            }}
            user={currentUser}
          />
        </div>
        <div
          style={{
            flex: "1 0 80%",
            margin: "0",
            padding: "0",
          }}
        >
          <Player
            playingTrack={playingTrack}
            nextTrack={nextTrack}
            lastTrack={lastTrack}
            fsHandle={fullScreenHandle}
          />
        </div>
      </div>
    </FullScreen>
  );
}
