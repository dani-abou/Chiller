import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import TrackSearchResult from "../Components/TrackSearchResult";

export default function Search({ spotifyApi, chooseTrack, addToQueue }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);

    let cancel = false;
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        if (cancel) return [];
        return res.body.tracks.items.map((track) => {
          const largestAlbumImage = track.album.images.reduce(
            (largest, image) => {
              if (image.height > largest.height) return image;
              return largest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            album: track.album.name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestAlbumImage.url,
            spotifyUrl: track.external_urls.spotify,
          };
        });
      })
      .then((arr) => setSearchResults(arr));

    return () => (cancel = true);
  }, [search, spotifyApi]);

  return (
    <div
      style={{
        margin: "0",
      }}
    >
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="lg"
        style={{ marginTop: "5%" }}
      />
      <div style={{ overflowY: "scroll", height: "85vh", marginTop: "5%" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            chooseTrack={chooseTrack}
            addToQueue={addToQueue}
          />
        ))}
      </div>
    </div>
  );
}
