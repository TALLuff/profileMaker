import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyBOcXfu1Y6TTSFlMMuJf66Wa2CgLJVajVA",
  authDomain: "myprofilemaker.firebaseapp.com",
  databaseURL: "https://myprofilemaker.firebaseio.com",
  projectId: "myprofilemaker",
  storageBucket: "",
  messagingSenderId: "508332448658",
  appId: "1:508332448658:web:b040d04bcb434b536aff4b",
  measurementId: "G-Z4LWZY0P9V"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
