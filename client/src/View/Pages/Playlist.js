import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { faChevronLeft, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrackSearchResult from "../Components/TrackSearchResult";
import shuffle from "../../Functions/Shuffle";

const neutralNote =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fvideo%2Fclip-31987657-musical-note-icon-out-animation-loop-black&psig=AOvVaw1byqmiLOKw4lXxO2agZO3H&ust=1631209802489000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICixZv47_ICFQAAAAAdAAAAABAP";

export default function Playlist({ back, playlist, spotifyApi, selection }) {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const callsNecessary = Math.ceil(playlist.tracks.total / 100);
    for (let i = 0; i < callsNecessary; i++) {
      spotifyApi
        .getPlaylistTracks(playlist.id, {
          fields: "items",
          limit: 100,
          offset: 100 * i,
        })
        .then((data) => data.body.items)
        .then((data) =>
          data.map((track) => {
            const thisTrack = track.track;
            let largestAlbumImage;
            if (thisTrack.album.images.length === 0) {
              largestAlbumImage = neutralNote;
            } else {
              largestAlbumImage = thisTrack.album.images.reduce(
                (largest, image) => {
                  if (image.height > largest.height) return image;
                  return largest;
                }
              );
            }
            return {
              artist: thisTrack.artists[0].name,
              album: thisTrack.album.name,
              title: thisTrack.name,
              uri: thisTrack.uri,
              albumUrl: largestAlbumImage.url,
              spotifyUrl: thisTrack.external_urls.spotify,
            };
          })
        )
        .then((accumulated) =>
          setTracks((old) => {
            let unsorted = old.concat(accumulated);
            return unsorted.sort((firstElement, secondElement) => {
              if (
                firstElement.artist.toLowerCase() >
                secondElement.artist.toLowerCase()
              ) {
                return 1;
              } else if (
                firstElement.artist.toLowerCase() ===
                secondElement.artist.toLowerCase()
              ) {
                return 0;
              } else return -1;
            });
          })
        );
    }
  }, []);

  function chooseAndShuffle(track) {
    playShuffle(track);
  }

  function playShuffle(first) {
    let shuffled = shuffle(tracks, first);
    if (first) selection.choose(first);
    else {
      selection.choose(shuffled[0]);
      shuffled.shift();
    }
    selection.setBase(shuffled);
  }

  function searchFilter() {
    if (search === "") return tracks;
    return tracks.filter((track) =>
      track.title.toLowerCase().includes(search.toLowerCase())
    );
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
          justifyContent: "space-between",
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={back}
          style={{ cursor: "pointer" }}
        />
        <div>{playlist.name}</div>
        <div className="shuffleButton" onClick={() => playShuffle()}>
          <FontAwesomeIcon
            icon={faRandom}
            style={{
              marginLeft: "35%",
              marginTop: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
      <Form.Control
        type="search"
        placeholder="Search in Playlist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="sm"
        style={{ marginTop: "5%" }}
      />
      <div style={{ overflowY: "scroll", height: "79vh", marginTop: "10px" }}>
        {searchFilter().map((track) => (
          <TrackSearchResult
            track={track}
            chooseTrack={chooseAndShuffle}
            addToQueue={selection.queue}
            height="50px"
          />
        ))}
      </div>
    </div>
  );
}
