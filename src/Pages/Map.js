import React, { Component, useState, useEffect } from "react";
// import {GOOGLE_API_KEY} from '../Pages/config';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import { useHistory, useParams } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
  }

  reverseGeocodeCoordinates() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg&callback=initMap&language=th`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          userAddress: data.results[0].formatted_address,
        })
      )
      .catch((error) => alert(error));
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    this.reverseGeocodeCoordinates();
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  render(props) {
    return (
      <Container>
        <Row>
          <div
            id={this.props.id}
            style={{
              padding: "10px",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ display: "flex", justifyContent: "center" }}
              onClick={this.getLocation}
            >
              Get coordinate
            </Button>
            {/* <GoogleMap mapContainerStyle={containerStyle} center={this.state.latitude,this.state.longitude} zoom={14}></GoogleMap> */}
          </div> 
          <div style={{ display: "flex", justifyContent: "center" }}>
            {this.state.latitude && this.state.longitude ? (
              <Image
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=16&size=800x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg&callback=initMap&language=th`}
                alt=""
              />
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>Address: {this.state.userAddress}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" style={{ margin: "20px" }}>
              Check In
            </Button>{" "}
            <Button variant="primary" style={{ margin: "20px" }}>
              Check Out
            </Button>{" "}
          </div>
        </Row>
      </Container>
    );
  }
}
export default Map;
