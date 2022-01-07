import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import Button from "react-bootstrap/Button";
import FullCal from "../Components/FullCalendar";

function Leave() {
  return (
    <>
      <Container>
        <h1 className="leave">แจ้งลา</h1>
      </Container>
      <ReactStyle />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary">แจ้งลา</Button>{" "}
      </div>
      <Container>
        <div style={{ marginBottom: "50px" }}>
          <FullCal />
        </div>
      </Container>
    </>
  );
}

const ReactStyle = () => (
  <Container>
    <Row>
      <Col sm>จำนวนวันลาพักร้อน</Col>
      <Col sm>จำนวนวันที่ลา</Col>
      <Col sm>ร้องขอการแจ้งลางาน</Col>
    </Row>
  </Container>
);

export default Leave;
