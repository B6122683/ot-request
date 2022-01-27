import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "../App.css";

function Home() {
  const [loginStatus, setLoginStatus] = useState("");
  const [role_id, setRole] = useState("");

  //Axios.defaults.withCredentials = true;
  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3333/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        setRole(response.data.decoded.user.role_id);
      } else {
        window.location = "/login";
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  // Axios.get("http://localhost:3333/login").then((response) => {
  //     console.log(response);
  //     if (response.data.loggedIn === true) {
  //       setRole(response.data.user[0].role_id);
  //     }
  //   });

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <Container>
        <h1 className="home">สวัสดี</h1>
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
