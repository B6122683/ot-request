import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";

function PositionManagement() {
  return (
    <>
      <Container>
        <Row>
          <h1 className="attendance">เพิ่มข้อมูลตำแหน่ง</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>รหัสตำแหน่ง</Form.Label>
              <Form.Control type="text" placeholder="กรอกรหัสตำแหน่ง" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>ชื่อแผนก</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>ซ่อมบำรุง</option>
                </Form.Select>
              </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อตำแหน่ง</Form.Label>
              <Form.Control type="text" placeholder="กรอกชื่อตำแหน่ง" />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="danger" style={{ margin: "10px" }} onClick={() => (window.location = "/position")}>
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
    </>
  );
}

export default PositionManagement;
