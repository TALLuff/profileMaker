import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

class Login extends React.Component {
  state = {
    usernameInput: "",
    emailInput: "",
    passInput: "",
    errorMessage: ""
  };

  componentDidMount() {
    firebase.auth().signOut();
  }

  createUser = (email, password) => {
    firebase.auth().signOut();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({ errorMessage: err.message });
      })
      .then(() => {
        if (firebase.auth().currentUser) {
          firebase
            .database()
            .ref()
            .child(this.state.usernameInput)
            .set(this.state.emailInput);
          this.props.createAccount(
            this.state.usernameInput,
            this.state.emailInput
          );
        }
      });
  };

  loginUser = (email, password) => {
    firebase.auth().signOut();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({ errorMessage: err.message });
      })
      .then(() => {
        if (firebase.auth().currentUser) {
          this.props.loginAccount(
            this.state.usernameInput,
            this.state.emailInput
          );
        }
      });
  };

  storeInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { storeInput, createUser, loginUser } = this;
    const { emailInput, passInput, errorMessage } = this.state;
    return (
      <div id="loginBody">
        <h1>Profile Builder</h1>
        <form>
          <div id="loginInput">
            <label>
              Username
              <input
                required
                id="usernameInput"
                placeholder="Username"
                onChange={storeInput}
              />
            </label>
            <label>
              Email
              <input
                required
                id="emailInput"
                placeholder="Email"
                onChange={storeInput}
              />
            </label>
            <label>
              Password
              <input
                required
                id="passInput"
                placeholder="Password"
                type="password"
                onChange={storeInput}
              />
            </label>
          </div>
          <button
            onClick={e => {
              e.preventDefault();
              createUser(emailInput, passInput);
            }}
          >
            Create Account
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              loginUser(emailInput, passInput);
            }}
          >
            Login Account
          </button>
          <div>{errorMessage}</div>
        </form>
      </div>
    );
  }
}

export default Login;
