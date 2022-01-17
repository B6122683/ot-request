import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Employee.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import account from "../images/account.png";

function EmployeeManagement() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Container>
        <Row>
          <h1 className="addemp">เพิ่มข้อมูลพนักงาน</h1>
        </Row>
        <Row>
            <EmployeeWithGrid />
        </Row>
      </Container>
    </>
  );
}

function EmployeeWithGrid(props) {
  return (
    <Container>
      <Row>
        <Form className="employee">

        <div style={{ display: "flex", justifyContent: "center" , padding: "20px"}}>
              <Image
                style={{
                  height: 100,
                  objectFit: "cover",
                  marginBlock: "13px",
                  
                }}
                alt=""
                src={account}
              />
            </div>


          <Row className="col-md-12 ">
            <Col className="col-md-6 col-12" >
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อ" />
              </Form.Group>
            </Col>

            <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control type="text" placeholder="กรอกนามสกุล" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="col-md-12 ">
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>เลขบัตรประจำตัวประชาชน</Form.Label>
                <Form.Control type="text" placeholder="กรอกเลขบัตรประจำตัวประชาชน" />
              </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>วัน/เดือน/ปีเกิด</Form.Label>
                <Form.Control type="date" placeholder="เลือกวัน/เดือน/ปีเกิด" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="col-md-12 ">
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>อีเมล</Form.Label>
                <Form.Control type="text" placeholder="กรอกอีเมล" />
              </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>เบอร์โทร</Form.Label>
                <Form.Control type="text" placeholder="กรอกเบอร์โทร" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="col-md-12 ">
            <Col className="col-md-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control type="textarea" placeholder="กรอกที่อยู่" />
              </Form.Group>
              </Col>

          </Row>

          
          <Row className="col-md-12 ">
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>ประเภทพนักงาน</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>เจ้าหน้าที่</option>
                </Form.Select>
              </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>ตำแหน่ง</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>หัวหน้า</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="col-md-12 ">
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>แผนก</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>วิศวกรรม</option>
                </Form.Select>
              </Form.Group>
              </Col>
          </Row>

          <Row className="col-md-12 ">
            <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>ชื่อผู้ใช้</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อผู้ใช้" />
              </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control type="text" placeholder="กรอกรหัสผ่าน" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="col-md-12 ">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="danger"
              onClick={props.onHide}
              style={{ margin: "10px" }}
            >
              ยกเลิก
            </Button>
            <Button variant="primary" type="submit" style={{ margin: "10px" }}>
              ยืนยัน
            </Button>
          </div>
          </Row>
        </Form>
      </Row>
    </Container>
  );
}

export default EmployeeManagement;
