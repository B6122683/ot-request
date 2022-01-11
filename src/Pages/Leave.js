import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../App.css";
import Button from "react-bootstrap/Button";
import FullCal from "../Components/FullCalendar";

function Leave() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Container>
        <Row>
          <h1 className="leave">แจ้งลา</h1>
        </Row>
        <Row>
          <Col sm>จำนวนวันลาพักร้อน</Col>
          <Col sm>จำนวนวันที่ลา</Col>
          <Col sm>ร้องขอการแจ้งลางาน</Col>
        </Row>
        <Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              แจ้งลา
            </Button>{" "}
            <MydModalWithGrid
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </Row>
        <Row>
          <div style={{ marginBottom: "50px" }}>
            <FullCal />
          </div>
        </Row>
      </Container>
    </>
  );
}

function MydModalWithGrid(props) {
  return (
    <Modal {...props} centered>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <h2 className="leaveform" style={{ textAlign: "center" }}>
              แบบฟอร์มแจ้งลางาน
            </h2>
          </Row>
          <Row>
            <Form>
              <Form.Group
                className="mb-3 col-12"
                controlId="formBasicTextInput"
              >
                <Form.Label>ชื่อ-สกุล</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อ-สกุล" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTextInput">
                <Form.Label>แผนก</Form.Label>
                <Form.Control type="text" placeholder="กรอกแผนก" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ประเภทการลา</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>ลากิจ</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTextInput">
                <Form.Label>เนื่องจาก</Form.Label>
                <Form.Control type="text" placeholder="กรอกเหตุผลที่ลา" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ขอลาตั้งแต่วันที่</Form.Label>
                <Form.Control type="date" placeholder="กรอกวันที่เริ่มลา" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ถึงวันที่</Form.Label>
                <Form.Control type="date" placeholder="กรอกวันที่สิ้นสุด" />
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="danger"
                  onClick={props.onHide}
                  style={{ margin: "10px" }}
                >
                  ยกเลิก
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: "10px" }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Leave;
