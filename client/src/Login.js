import React from "react";
import { Container, Button } from "react-bootstrap";

const AUTH_URL = `https://accounts.spotify.com/authorize?
client_id=ce708fa114894d368ae73921e1563938&
response_type=code&
redirect_uri=http://localhost:3000&
scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
  return (
    <Container style={{ height: "100vh" }}>
      <Button
        variant="success"
        size="lg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        href={AUTH_URL}
      >
        Login With Spotify
      </Button>
    </Container>
  );
}
