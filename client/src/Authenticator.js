import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth.js";
import Login from "./Login";
import SpotifyApp from "./View/SpotifyApp.js";
import { Container } from "react-bootstrap";

const spotifyApi = new SpotifyWebApi({
  clientId: "ce708fa114894d368ae73921e1563938",
});

export default function Authenticator({ code }) {
  const accessToken = useAuth(code);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((me) => {
      setCurrentUser(me.body.id);
    });
  }, [accessToken]);

  return code ? (
    <SpotifyApp currentUser={currentUser} spotifyApi={spotifyApi} />
  ) : (
    <Login />
  );
}
