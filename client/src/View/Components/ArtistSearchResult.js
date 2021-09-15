import React from "react";

export default function ArtistSearchResult({ artist, chooseArtist }) {
  return (
    <div className="trackSearchResult" onClick={chooseArtist} key={artist.id}>
      <img
        src={artist.image}
        style={{ height: "64px", width: "64px" }}
        alt={artist.name}
      />
      <div className="ml-10" style={{ marginLeft: "5%" }}>
        <div style={{ color: "white" }}>{artist.name}</div>
      </div>
    </div>
  );
}
