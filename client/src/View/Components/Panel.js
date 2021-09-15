import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faPause,
  faPlay,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Panel({
  playing,
  setPlay,
  nextTrack,
  lastTrack,
  fsHandle,
}) {
  return (
    <div
      style={{
        backgroundColor: "#2e2e2e",
        borderRadius: "30px",
        position: "relative",
        height: "100%",
      }}
    >
      {fsHandle.active ? (
        <FontAwesomeIcon
          onClick={fsHandle.exit}
          icon={faCompressArrowsAlt}
          className="fullscreenButton"
        />
      ) : (
        <FontAwesomeIcon
          onClick={fsHandle.enter}
          icon={faExpandArrowsAlt}
          className="fullscreenButton"
        />
      )}
      <div
        style={{
          display: "inline-flex",
          width: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-53%, -50%)",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faFastBackward}
          className="panelButton"
          onClick={lastTrack}
        />
        <FontAwesomeIcon
          icon={playing ? faPause : faPlay}
          className="panelButton"
          onClick={() => setPlay((prev) => !prev)}
        />
        <FontAwesomeIcon
          icon={faFastForward}
          className="panelButton"
          onClick={nextTrack}
        />
      </div>
    </div>
  );
}
