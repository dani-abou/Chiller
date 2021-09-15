import React from "react";

export default function TrackSearchResult({
  track,
  chooseTrack,
  addToQueue,
  height,
}) {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div
      className="trackSearchResult"
      onClick={handlePlay}
      key={track.name + " " + track.artist}
    >
      <img
        src={track.albumUrl}
        style={
          height
            ? { height: height, width: height }
            : { height: "64px", width: "64px" }
        }
        alt={track.album}
      />
      <div className="ml-10" style={{ marginLeft: "5%" }}>
        <div style={{ color: "white" }}>{track.title}</div>
        <div style={{ color: "grey" }}>
          {track.artist}
          <div
            className="queueButton"
            onClick={(e) => {
              e.stopPropagation();
              addToQueue(track);
            }}
          >
            <i className="fas fa-chevron-circle-right" />
          </div>
        </div>
      </div>
    </div>
  );
}
