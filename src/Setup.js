import React from "react";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/database";

class Setup extends React.Component {
  state = {
    firstNameInput: "",
    secondNameInput: "",
    dateOfBirthInput: "",
    interestInput: "",
    interestDescriptionInput: "",
    colourChoice: "",
    favouriteColour: ""
    //picture
  };

  getNewColour = () => {
    axios
      .get("https://api.noopschallenge.com/hexbot")
      .then(hex => {
        let colour = hex.data.colors[0].value;
        this.setState({ colourChoice: colour });
        document.getElementById("setupColour").style.backgroundColor = colour;
      })
      .catch(err => {
        console.log(err);
      });
  };

  saveColour = () => {
    let favouriteColour = this.state.colourChoice;
    this.setState({ favouriteColour });
    document.getElementById(
      "setupBody"
    ).style.backgroundColor = favouriteColour;
    document.getElementById(
      "saveColour"
    ).style.backgroundColor = favouriteColour;
  };

  storeInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  submitProfile = () => {
    const db = firebase
      .database()
      .ref()
      .child(this.props.username);
    db.child("firstName").set(this.state.firstNameInput);
    db.child("secondName").set(this.state.secondNameInput);
    db.child("dateOfBirth").set(this.state.dateOfBirthInput);
    db.child("interest").set(this.state.interestInput);
    db.child("interestDescription").set(this.state.interestDescriptionInput);
    db.child("favouriteColour").set(this.state.favouriteColour);
    this.props.finishSetup(this.props.username);
  };

  render() {
    const { storeInput, getNewColour, saveColour, submitProfile } = this;
    return (
      <div id="setupBody">
        <h1>Fill out your profile {this.props.username}</h1>
        <form
          id="setupForm"
          onSubmit={e => {
            e.preventDefault();
            submitProfile();
          }}
        >
          <label>
            First Name
            <input
              required
              id="firstNameInput"
              placeholder="Input first name"
              onChange={storeInput}
            ></input>
          </label>
          <label>
            Second Name
            <input
              required
              id="secondNameInput"
              placeholder="Input second name"
              onChange={storeInput}
            ></input>
          </label>
          <label>
            Date of Birth
            <input
              required
              id="dateOfBirthInput"
              placeholder="Input date of birth"
              type="date"
              onChange={storeInput}
            ></input>
          </label>

          <div id="colourButtons">
            <div
              id="setupColour"
              onClick={() => {
                getNewColour();
              }}
            >
              Profile Colour
            </div>
            <div
              id="saveColour"
              onClick={() => {
                saveColour();
              }}
            >
              Save Colour
            </div>
          </div>

          <label>
            Favourite Interest
            <input
              required
              id="interestInput"
              placeholder="Input favourite interest"
              onChange={storeInput}
            ></input>
          </label>
          <label>
            Description
            <textarea
              required
              id="interestDescriptionInput"
              placeholder="What does it involve and why is it your favourite interest?"
              onChange={storeInput}
            ></textarea>
          </label>
          {/* <label>
            Profile Banner
            <input type="file"></input>
          </label> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Setup;
