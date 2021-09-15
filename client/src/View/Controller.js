import React, { useEffect, useState } from "react";
import Search from "./Pages/Search";
import Playlists from "./Pages/Playlists";
import Queue from "./Pages/Queue";
import Albums from "./Pages/Albums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlayCircle,
  faForward,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";

export default function Controller({
  spotifyApi,
  setPlayingTrack,
  queue,
  currentUser,
}) {
  const chooseTrack = (track) => setPlayingTrack(track);

  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    setCurrentPage(
      <Search
        spotifyApi={spotifyApi}
        chooseTrack={chooseTrack}
        addToQueue={queue.add}
      />
    );
  }, []);

  const rerenderPage = (original) => {
    setCurrentPage(
      <div style={{ color: "#52ffa5", textAlign: "center" }}>Loading</div>
    );
    setCurrentPage(original);
  };

  const remove = (index) => {
    queue.remove(index);
    rerenderPage(<Queue queue={{ ...queue, remove: remove }} />);
  };

  const removeBase = (index) => {
    queue.removeBase(index);
    rerenderPage(<Queue queue={{ ...queue, remove: remove }} />);
  };

  return (
    <div
      style={{
        backgroundColor: "#2e2e2e",
        margin: "0",
        height: "100vh",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "2.5rem",
          color: "#52ffa5",
          height: "5%",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          className="navIcons"
          icon={faSearch}
          onClick={() =>
            setCurrentPage(
              <Search
                spotifyApi={spotifyApi}
                chooseTrack={chooseTrack}
                addToQueue={queue.add}
              />
            )
          }
        />
        <FontAwesomeIcon
          className="navIcons"
          icon={faCompactDisc}
          onClick={() =>
            setCurrentPage(
              <Albums
                spotifyApi={spotifyApi}
                selection={{
                  choose: chooseTrack,
                  queue: queue.add,
                  setBase: queue.setBase,
                }}
              />
            )
          }
        />
        <FontAwesomeIcon
          className="navIcons"
          icon={faPlayCircle}
          onClick={() =>
            setCurrentPage(
              <Playlists
                spotifyApi={spotifyApi}
                currentUser={currentUser}
                selection={{
                  choose: chooseTrack,
                  queue: queue.add,
                  setBase: queue.setBase,
                }}
              />
            )
          }
        />
        <FontAwesomeIcon
          className="navIcons"
          icon={faForward}
          onClick={() =>
            setCurrentPage(
              <Queue
                queue={{ ...queue, remove: remove, removeBase: removeBase }}
              />
            )
          }
        />
      </div>
      {currentPage}
    </div>
  );
}
