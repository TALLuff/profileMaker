import React from "react";
import { Router, navigate } from "@reach/router";
import Login from "./Login.js";
import Setup from "./Setup.js";
import Profile from "./Profle.js";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class App extends React.Component {
  createAccount = (username, email) => {
    firebase
      .database()
      .ref()
      .child(username)
      .child("email")
      .set(email);
    navigate(`/setup/${username}`);
  };

  finishSetup = username => {
    navigate(`/user/${username}`);
  };

  loginAccount = (username, email) => {
    let db = firebase.database().ref();
    db.child(username)
      .child("email")
      .once("value", snapshot => {
        if (snapshot.val() === email) {
          db.child("firstName").once("value", snapshot => {
            if (snapshot.val() === null) {
              navigate("/setup");
            } else {
              navigate(`/user/${username}`);
            }
          });
        } else {
          alert("Invalid username");
        }
      });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Login
            path="/"
            createAccount={this.createAccount}
            loginAccount={this.loginAccount}
          />
          <Setup path="/setup/:username" finishSetup={this.finishSetup} />
          <Profile path="/user/:username" />
        </Router>
      </div>
    );
  }
}

export default App;
