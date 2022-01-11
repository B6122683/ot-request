import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Card, Button, Modal, Form, Table, Col } from "react-bootstrap";
import "../App.css";

function OTRequestDesc() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Container>
      <h1 className="otrequest">รายละเอียดการทำงาน​</h1>
      <Card>
        <Card.Body>
          <Card.Text>
            ไม่แน่ใจว่าจะใช้ Row / Col หรือ Table ดี
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="danger"
              onClick={() => (window.location.href = "/otrequest")}
              style={{ margin: "10px" }}
            >
              ย้อนกลับ
            </Button>
            <Button
              variant="primary"
              onClick={() => setModalShow(true)}
              style={{ margin: "10px" }}
            >
              ยื่นคำขอ
            </Button>
            <MydModalWithGrid
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

function MydModalWithGrid(props) {
  return (
    <Modal {...props} centered>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <h2 className="leaveform" style={{ textAlign: "center" }}>
              แบบฟอร์มคำขอทำงานล่วงเวลา
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
                <Form.Label>ตำแหน่ง</Form.Label>
                <Form.Control type="text" placeholder="กรอกตำแหน่ง" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTextInput">
                <Form.Label>แผนก</Form.Label>
                <Form.Control type="text" placeholder="กรอกแผนก" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTextInput">
                <Form.Label>ชื่องาน</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่องาน" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>วันที่ทำ OT</Form.Label>
                <Form.Control type="date" placeholder="กรอกวันที่ทำ OT" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3 col-12">
                    <Form.Label>เริ่มเวลา</Form.Label>
                    <Form.Control type="time" placeholder="กรอกเวลาที่เริ่ม" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 col-12">
                    <Form.Label>ถึงเวลา</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="กรอกเวลาที่สิ้นสุด"
                    />
                  </Form.Group>
                </Col>
              </Row>
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

export default OTRequestDesc;
