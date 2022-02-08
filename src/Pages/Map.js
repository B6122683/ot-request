import React, { Component } from 'react';
// import {GOOGLE_API_KEY} from '../Pages/config';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";


class Map extends React.Component {

    
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
  }

   reverseGeocodeCoordinates () {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg`)
    .then(response => response.json())
    .then(data => this.setState({
    //   userAddress: data.results[0].formatted_address
    }))
    .catch(error => alert(error))
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

 getCoordinates(position){
  
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude 
    })
    this.reverseGeocodeCoordinates();
  }

  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }
  render() {
    return (
        <div id={this.props.id} style={{width:'100%',height:'100%'}}>
          <Button onClick={this.getLocation} >Get coordinate</Button>
          <p>Latitude: {this.state.latitude}</p>
          <p>Lngitude: {this.state.longitude}</p>
          <p>Address: {this.state.userAddress}</p>
      {
        this.state.latitude && this.state.longitude ?
         <Image src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg`} alt=''/>
        :
        null
      }
        
        </div>
    );
  }

}
export default Map;