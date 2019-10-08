import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";

class Profile extends React.Component {
  state = {
    username: "",
    firstName: "",
    secondName: "",
    dateOfBirth: "",
    interest: "",
    interestDescription: "",
    favouriteColour: ""
  };

  componentDidMount() {
    const db = firebase
      .database()
      .ref()
      .child(this.props.username);
    this.setState({
      username: this.props.username
    });
    db.child("firstName").once("value", snapshot => {
      this.setState({ firstName: snapshot.val() });
    });
    db.child("secondName").once("value", snapshot => {
      this.setState({ secondName: snapshot.val() });
    });
    db.child("dateOfBirth").once("value", snapshot => {
      this.setState({ dateOfBirth: snapshot.val() });
    });
    db.child("interest").once("value", snapshot => {
      this.setState({ interest: snapshot.val() });
    });
    db.child("interestDescription").once("value", snapshot => {
      this.setState({ interestDescription: snapshot.val() });
    });
    db.child("favouriteColour").once("value", snapshot => {
      this.setState({ favouriteColour: snapshot.val() });
      document.getElementById(
        "profileBody"
      ).style.backgroundColor = snapshot.val();
    });
  }

  render() {
    const {
      username,
      firstName,
      secondName,
      dateOfBirth,
      interest,
      interestDescription
    } = this.state;
    return (
      <div id="profileBody">
        <h1>{username}</h1>
        <h4>{firstName + " " + secondName}</h4>
        <h5>{dateOfBirth}</h5>
        <h2>{interest}</h2>
        <p>{interestDescription}</p>
      </div>
    );
  }
}

export default Profile;
