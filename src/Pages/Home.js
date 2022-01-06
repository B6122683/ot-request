import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";

function Home() {
  return (
    <>
      <Container>
          <h1 className="home">สวัสดี</h1>
      </Container>
      <ReactStyle />
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
      <Col sm className="graphatt">กราฟสถิติการเข้า-ออกงาน</Col>
    </Row>
  </Container>
);

export default Home;
