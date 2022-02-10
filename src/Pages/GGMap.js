import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Axios from "axios";

const containerStyle = {
  width: "400px",
  height: "400px",
};

// const pos = {
//   lat: 14.892719177879076,
//   lng: 102.0144345086861,
// };

//const center = { lat: 33.772, lng: -117.214 };

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

function GGMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg",
  });

  const [pos, setPos] = useState({
      lat: "",
      lng: "",
    },
  );
  const [locallatitude, setLocalLatitude] = useState("");
  const [locallongitude, setLocalLongitude] = useState("");
  const [userAddress, setUserAddress] = useState("");
  // const onLoad = (infoWindow) => {
  //   console.log("infoWindow: ", infoWindow);
  // };
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
      setLocalLatitude(position.coords.latitude);
      setLocalLongitude(position.coords.longitude);
      console.log(locallatitude,locallongitude);
    });
    
  };

  // const reverseGeocodeCoordinates = () => {
  //   Axios.fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${map}&sensor=false&key=AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg`)
  //   .then((response) => {
  //     setUserAddress(response.data.results[0].formatted_address);
  //   })
  //   .catch(error => alert(error))
  // }
  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  useEffect(() => {
    getLocation();
    //reverseGeocodeCoordinates();
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={pos} zoom={14}>
      {/* <InfoWindow onLoad={onLoad} position={map}>
        <div style={divStyle}>
          <h3>{userAddress}</h3>
        </div>
      </InfoWindow> */}
      <Marker onLoad={onLoad} position={pos} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GGMap;
