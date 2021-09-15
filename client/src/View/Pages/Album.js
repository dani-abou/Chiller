import React, { useEffect, useState } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrackSearchResult from "../Components/TrackSearchResult";

export default function Album({ spotifyApi, album, back, selection }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyApi
      .getAlbumTracks(album.id)
      .then((res) =>
        res.body.items.map((track) => {
          return {
            artist: track.artists[0].name,
            album: album.name,
            title: track.name,
            uri: track.uri,
            albumUrl: album.image,
            spotifyUrl: track.external_urls.spotify,
          };
        })
      )
      .then((res) => setTracks(res));
  }, [album]);

  function queueAfter(track) {
    const index = tracks.findIndex((element) => element.uri === track.uri);
    const newQueue = tracks.slice(index + 1);
    selection.setBase(newQueue);
    selection.choose(track);
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          fontSize: "1.4rem",
          color: "#389465",
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={back}
          style={{ cursor: "pointer" }}
        />
        <div style={{ textAlign: "center", flex: "1 0 80%" }}>{album.name}</div>
      </div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "78vh",
          marginTop: "10px",
        }}
      >
        {tracks.map((track) => (
          <TrackSearchResult
            track={track}
            chooseTrack={() => queueAfter(track)}
            addToQueue={selection.queue}
          />
        ))}
      </div>
    </div>
  );
}
