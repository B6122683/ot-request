import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "../App.css";
import Navbar from "../Components/Navbar";
import NavbarAdmin from "../Components/NavbarAdmin";
import PieChart from "../Components/PieCharts";
import ColumnChart from "../Components/ColumnChart";
import Image from "react-bootstrap/Image";

function Home() {
  const [loginStatus, setLoginStatus] = useState("");
  const [role_id, setRole] = useState("");
  const [emp_name, setEmpName] = useState("");

  //Axios.defaults.withCredentials = true;
  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        setRole(response.data.decoded.user.role_id);
        setEmpName(
          response.data.decoded.user.emp_firstname +
            " " +
            response.data.decoded.user.emp_surname
        );
      } else {
        window.location = "/login";
      }
    });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      {/* {role_id === 1 ? <NavbarAdmin /> : <Navbar />} */}
      <Container>
        <h1 className="home">สวัสดี คุณ {emp_name}</h1>
      </Container>
      {role_id === 1 && <ReactStyle />}
    </>
  );
}

const ReactStyle = () => (
  <Container className="mb-3">
    <Row>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-one">
          จำนวนพนักงานทั้งหมด
          <Col className="imgicon">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644870019958.svg?token=exp=1644870920~hmac=5540668af72f53211e30e209922b18da"
            />
          </Col>
        </Col>
      </Col>
      {/* <Col className="col-md-4 col-12 adminhome"><>ทำงานล่วงเวลาต่อเดือน</></Col> */}
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-two">
          จำนวนพนักงานทั้งหมด
          <Col className="imgicon">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644869239427.svg?token=exp=1644870140~hmac=1d2dd4bfd27510ee971a40588404ace8"
            />
          </Col>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-three">
          จำนวนพนักงานทั้งหมด
          <Col className="imgicon">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644867770404.svg?token=exp=1644868674~hmac=39d17f7223b422922b55d0f0bca49952"
            />
          </Col>
        </Col>
      </Col>
    </Row>
    {/* <Row>
      <Col sm className="graphatt">
        กราฟสถิติการเข้า-ออกงาน
      </Col>
    </Row> */}
    <Row>
      <Col className="col-md-6 col-12 my-2">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <ColumnChart />
      </Col>
    </Row>
  </Container>
);

export default Home;
