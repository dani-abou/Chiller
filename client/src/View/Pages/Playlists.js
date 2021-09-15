import React, { useEffect, useState } from "react";
import PlaylistCard from "../Components/PlaylistCard";
import Playlist from "./Playlist";

export default function Playlists({ currentUser, spotifyApi, selection }) {
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState();
  useEffect(() => {
    spotifyApi
      .getUserPlaylists(currentUser, { limit: 30, offset: 0 })
      .then((res) => setPlaylists(res.body.items));
  }, []);

  return (
    <div style={{ height: "90vh", marginTop: "5%" }}>
      {selected ? (
        <Playlist
          back={() => setSelected()}
          playlist={selected}
          spotifyApi={spotifyApi}
          selection={selection}
        />
      ) : (
        <div style={{ overflowY: "scroll", height: "100%" }}>
          {playlists.map((playlist) => (
            <PlaylistCard
              playlist={playlist}
              image={playlist.images[0].url}
              select={() => setSelected(playlist)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
