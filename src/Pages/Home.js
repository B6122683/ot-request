import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "../App.css";
import Navbar from "../Components/Navbar";
import NavbarAdmin from "../Components/NavbarAdmin";
import PieChart from "../Components/PieCharts";
import ColumnChart from "../Components/ColumnChart";

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
      <Col sm>ทำงานล่วงเวลาต่อเดือน</Col>
      <Col sm>จำนวนวันทำงานต่อเดือน</Col>
      <Col sm>จำนวนวันที่สามารถลางานได้</Col>
    </Row>
    <Row>
      <Col sm className="graphatt">
        กราฟสถิติการเข้า-ออกงาน
      </Col>
    </Row>
    <Row>
      <Col className="col-md-6 col-12">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12">
        <ColumnChart />
      </Col>
    </Row>
  </Container>
);

export default Home;
