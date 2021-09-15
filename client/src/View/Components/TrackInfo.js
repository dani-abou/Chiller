import React from "react";
import { Image, Button } from "react-bootstrap";
import Panel from "./Panel.js";

export default function TrackInfo({
  track,
  playing,
  setPlay,
  nextTrack,
  lastTrack,
  fsHandle,
}) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "2%",
        height: "25%",
        marginLeft: "20px",
      }}
    >
      <div style={{ flex: "0 0 10%" }}>
        <Image
          src={track.albumUrl}
          style={{ height: "100%" }}
          alt={track.album}
        />
      </div>
      <div
        style={{
          color: "#91ffad",
          flex: "1 0 20%",
          overflow: "hidden",
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <i
            className="fas fa-music"
            style={{ fontSize: "150%", flex: "0 0 6%" }}
          />
          <h1 style={{ fontSize: "2rem", marginTop: "10px" }}>{track.title}</h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <i
            className="far fa-user"
            style={{ fontSize: "150%", flex: "0 0 6%" }}
          />
          <h1 style={{ fontSize: "2rem", marginTop: "10px" }}>
            {track.artist}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <i
            className="fas fa-compact-disc"
            style={{ fontSize: "150%", flex: "0 0 6%" }}
          />
          <h1 style={{ fontSize: "2rem", marginTop: "10px" }}>{track.album}</h1>
        </div>
        <br />
        <Button
          style={{
            marginLeft: "25%",
          }}
          target="_blank"
          href={track.spotifyUrl}
          variant="success"
        >
          Spotify
        </Button>
      </div>
      <div style={{ flex: "0 1 40%", marginRight: "20px" }}>
        <Panel
          playing={playing}
          setPlay={setPlay}
          nextTrack={nextTrack}
          lastTrack={lastTrack}
          fsHandle={fsHandle}
        />
      </div>
    </div>
  );
}
