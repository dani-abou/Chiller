import React from "react";
import QueueTrack from "../Components/QueueTrack";

export default function Queue({ queue }) {
  if (queue.tracks.length === 0 && queue.baseQueue.length === 0) {
    return (
      <div style={{ color: "#389465", fontSize: "2rem", textAlign: "center" }}>
        No songs queued
      </div>
    );
  }
  return (
    <div style={{ height: "90vh", overflowY: "scroll" }}>
      {queue.tracks.map((track, index) => (
        <QueueTrack track={track} remove={() => queue.remove(index)} />
      ))}
      <div style={{ width: "100%", height: "5px", backgroundColor: "white" }}>
        {" "}
      </div>
      {queue.baseQueue.map((track, index) => (
        <QueueTrack track={track} remove={() => queue.removeBase(index)} />
      ))}
    </div>
  );
}
