import React from "react";
import { Image } from "react-bootstrap";

export default function PlaylistCard({ playlist, image, select }) {
  return (
    <div className="trackSearchResult" onClick={select}>
      <Image
        src={image}
        style={{ height: "64px", width: "64px", objectFit: "cover" }}
      />
      <div style={{ color: "white", marginLeft: "20px" }}>{playlist.name}</div>
    </div>
  );
}
