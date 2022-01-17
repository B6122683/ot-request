import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";

function DepartmentManagement() {
  return (
    <>
      <Container>
        <Row>
          <h1 className="attendance">เพิ่มข้อมูลตำแหน่ง</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>รหัสแผนก</Form.Label>
              <Form.Control type="text" placeholder="กรอกรหัสแผนก" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อแผนก</Form.Label>
              <Form.Control type="text" placeholder="กรอกชื่อแผนก" />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="danger" style={{ margin: "10px" }}>
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

export default DepartmentManagement;
