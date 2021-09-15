import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Authenticator from "./Authenticator.js";

const code = new URLSearchParams(window.location.search).get("code");

document.body.style.backgroundColor = "black";

function App() {
  return <Authenticator code={code} />;
}

export default App;
