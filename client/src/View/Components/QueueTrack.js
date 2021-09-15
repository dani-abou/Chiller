import React from "react";

export default function QueueTrack({ track, remove, isBase }) {
  return (
    <div className="queueTrack">
      <img
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
        alt={track.album}
      />
      <div className="ml-10" style={{ marginLeft: "5%" }}>
        <div style={{ color: "white" }}>{track.title}</div>
        <div style={{ color: "grey" }}>
          {track.artist}
          <div className="queueButton" onClick={() => remove(isBase)}>
            <i className="fas fa-times" />
          </div>
        </div>
      </div>
    </div>
  );
}
