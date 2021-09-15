import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ArtistSearchResult from "../Components/ArtistSearchResult";
import PlaylistCard from "../Components/PlaylistCard";
import Album from "./Album";

const ARTIST_IMAGE =
  "https://products.shureweb.eu/cdn-cgi/image/height=700,format=auto/shure_product_db/product_main_images/files/cf1/51c/44-/header_transparent/dc53d07c046536d8b078318e129876f2.png";

const ALBUM_IMAGE = "";

export default function Albums({ spotifyApi, selection }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setArtist] = useState();
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setAlbum] = useState();
  useEffect(() => {
    if (!search) return setSearchResults([]);

    let cancel = false;
    spotifyApi
      .searchArtists(search)
      .then((res) => {
        if (cancel) return [];
        return res.body.artists.items.map((artist) => {
          let image;
          if (artist.images.length === 0) image = ARTIST_IMAGE;
          else image = artist.images[0].url;
          return {
            name: artist.name,
            id: artist.id,
            image: image,
          };
        });
      })
      .then((arr) => setSearchResults(arr));

    return () => (cancel = true);
  }, [search, spotifyApi]);

  useEffect(() => {
    if (!selectedArtist) return setAlbums([]);
    spotifyApi
      .getArtistAlbums(selectedArtist.id)
      .then((res) => {
        return res.body.items.map((album) => {
          let image;
          if (album.images.length === 0) image = ARTIST_IMAGE;
          else image = album.images[0].url;
          return { name: album.name, image: image, id: album.id };
        });
      })
      .then((arr) => setAlbums(arr));
  }, [selectedArtist]);

  return (
    <div
      style={{
        backgroundColor: "#2e2e2e",
        flex: "1",
        margin: "0",
        height: "90vh",
      }}
    >
      <Form.Control
        type="search"
        placeholder="Search Artist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="lg"
        style={{ marginTop: "5%" }}
      />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "85vh",
          marginTop: "5%",
        }}
      >
        {selectedAlbum ? (
          <Album
            spotifyApi={spotifyApi}
            album={selectedAlbum}
            back={() => setAlbum()}
            selection={selection}
          />
        ) : selectedArtist ? (
          albums.map((album) => (
            <PlaylistCard
              playlist={album}
              image={album.image}
              select={() => setAlbum(album)}
            />
          ))
        ) : (
          searchResults.map((artist) => (
            <ArtistSearchResult
              artist={artist}
              chooseArtist={() => setArtist(artist)}
            />
          ))
        )}
      </div>
    </div>
  );
}
