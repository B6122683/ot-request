import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Axios from "axios";
import Swal from "sweetalert2";

function GGMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg",
  });

  const containerStyle = {
    justifyContent: "center",
    width: "800px",
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

  const [pos, setPos] = useState({
    lat: "",
    lng: "",
  });

  const [locallatitude, setLocalLatitude] = useState("");
  const [locallongitude, setLocalLongitude] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [emp_id, setEmpId] = useState("");
  // const onLoad = (infoWindow) => {
  //   console.log("infoWindow: ", infoWindow);
  // };

  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        setEmpId(response.data.decoded.user.emp_id);
      } else {
        window.location = "/login";
      }
    });
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
      setLocalLatitude(position.coords.latitude);
      setLocalLongitude(position.coords.longitude);

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false&key=AIzaSyB2S44xNnHEWFSd3yHhZ0TKdPv6pUwr8kg&callback=initMap&language=th`
      )
        .then((response) => response.json())
        .then((data) => setUserAddress(data.results[0].formatted_address))
        .catch((error) => alert(error));
    });
  };

  const checkInWork = () => {

    Axios.post("http://localhost:3333/attendance", {
      emp_id: emp_id,
      work_address: userAddress,
      work_status: "0",
      work_lat: locallatitude,
      work_lng: locallongitude,
    }).then(() => {
      setAttendanceList({
        ...attendanceList,
        emp_id: emp_id,
        work_address: userAddress,
        work_status: "0",
        work_lat: locallatitude,
        work_lng: locallongitude,
      });
      Swal.fire({
        title: "สำเร็จ",
        text: "ลงชื่อเข้างานเรียบร้อย",
        icon: "success",
        confirmButtonText: "ยืนยัน!",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "/attendance";
        }
      });
    });
  };
  const checkOutWork = () => {
    Axios.post("http://localhost:3333/attendance", {
      emp_id: emp_id,
      work_address: userAddress,
      work_status: "1",
      work_lat: locallatitude,
      work_lng: locallongitude,
    }).then(() => {
      setAttendanceList({
        ...attendanceList,
        emp_id: emp_id,
        work_address: userAddress,
        work_status: "1",
        work_lat: locallatitude,
        work_lng: locallongitude,
      });
      Swal.fire({
        title: "สำเร็จ",
        text: "ลงชื่อออกงานเรียบร้อย",
        icon: "success",
        confirmButtonText: "ยืนยัน!",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "/attendance";
        }
      });
    });
  };

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  useEffect(() => {
    getAuth();
    getLocation();
  }, []);

  return isLoaded ? (
    <>
      <Container>
        {" "}
        <Row className="col-md-12">
          <Col className="col-md-12 col-12">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={pos}
                zoom={18}
              >
                <Marker onLoad={onLoad} position={pos} />
              </GoogleMap>
            </div>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Button
            variant="primary"
            style={{ margin: "20px" }}
            onClick={checkInWork}
          >
            Check In
          </Button>{" "}
          <Button
            variant="primary"
            style={{ margin: "20px" }}
            onClick={checkOutWork}
          >
            Check Out
          </Button>{" "}
        </div>
      </Container>
    </>
  ) : (
    <></>
  );
}

export default GGMap;
