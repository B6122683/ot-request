import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "../App.css";
import Navbar from "../Components/Navbar";
import NavbarAdmin from "../Components/NavbarAdmin";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="danger"
          style={{ margin: "0px" }}
          onClick={handleLogout}
        >
          {" "}
          ออกจากระบบ{" "}
        </Button>{" "}
      </div>
      {role_id === 1 && <ReactStyle />}
    </>
  );
}

const ReactStyle = () => (
  <Container>
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
  </Container>
);

export default Home;
