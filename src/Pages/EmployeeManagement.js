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
import Axios from "axios";

function EmployeeManagement() {

  const [images, setImages] = React.useState([]);
  const [emp_firstname, setEmp_firstname] = useState("");
  const [emp_surname, setEmp_surname] = useState("");
  const [emp_address, setEmp_address] = useState("");
  const [emp_tel, setEmp_tel] = useState("");
  const [emp_email, setEmp_email] = useState("");
  const [emp_username, setEmp_username] = useState("");
  const [emp_password, setEmp_password] = useState("");
  const [dep_id, setDep_id] = useState("");
  const [role_id, setRole_id] = useState("");
  const [emp_dob, setEmp_dob] = useState("");
  const [emp_images, setEmp_images] = useState("");
  const [emp_card_id, setEmp_card_id] = useState("");
  const [position_id, setPosition_id] = useState("");
  const [emp_ot, setEmp_ot] = useState("");
  const [create_at, setCreate_at] = useState("");
  const [update_at, setUpdate_at] = useState("");
  const [record_status, setRecord_status] = useState("");

  const [EmployeesList, setEmployeesList] = useState([]);

  const Addemployees = () => {
    Axios.post("http://localhost:3333/employees", {
      emp_firstname: emp_firstname,
      emp_surname: emp_surname,
      emp_address: emp_address,
      emp_tel: emp_tel,
      emp_email: emp_email,
      emp_username: emp_username,
      emp_password: emp_password,
      dep_id: dep_id,
      role_id: role_id,
      emp_card_id: emp_card_id,
      emp_dob: emp_dob,
      emp_images: emp_images,
      position_id: position_id,
      emp_ot: emp_ot , 
      create_at: create_at,
      update_at: update_at,
      record_status: record_status, 

    }).then(() => {
        setEmployeesList({
            ...EmployeesList,
            
            emp_firstname: emp_firstname,
            emp_surname: emp_surname,
            emp_address: emp_address,
            emp_tel: emp_tel,
            emp_email: emp_email,
            emp_username: emp_username,
            emp_password: emp_password,
            dep_id: dep_id,
            role_id: role_id,
            emp_card_id: emp_card_id,
            emp_dob: emp_dob,
            emp_images: emp_images,
            position_id: position_id,
            emp_ot: emp_ot ,
            create_at: create_at,
            update_at: update_at,
            record_status: record_status, 
        });
    });
  };


  return (
    <>
      <Container>
        <Row>
          <h1 className="addemp">เพิ่มข้อมูลพนักงาน</h1>
        </Row>
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
        <Form.Control type="text" 
        placeholder="กรอกชื่อ" 
        name = "emp_firstname"
        onChange={(e) => {
            setEmp_firstname(e.target.value);
          }} />
      </Form.Group>
    </Col>

    <Col className="col-md-6 col-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>นามสกุล</Form.Label>
        <Form.Control type="text" 
        placeholder="กรอกนามสกุล" 
        name = "emp_surname"
        onChange={(e) => {
            setEmp_surname(e.target.value);
          }} />
      </Form.Group>
    </Col>
  </Row>

  <Row className="col-md-12 ">
    <Col className="col-md-6 col-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>เลขบัตรประจำตัวประชาชน</Form.Label>
        <Form.Control type="text" 
        placeholder="กรอกเลขบัตรประจำตัวประชาชน"
        name = "emp_card_id"
        onChange={(e) => {
            setEmp_card_id(e.target.value);
          }} />
      </Form.Group>
      </Col>
      <Col className="col-md-6 col-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>วัน/เดือน/ปีเกิด</Form.Label>
        <Form.Control type="date" 
        placeholder="เลือกวัน/เดือน/ปีเกิด"
        name = "emp_dob"
        onChange={(e) => {
            setEmp_dob(e.target.value);
          }} />
      </Form.Group>
    </Col>
  </Row>

  <Row className="col-md-12 ">
    <Col className="col-md-6 col-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>อีเมล</Form.Label>
        <Form.Control type="text" 
        placeholder="กรอกอีเมล"
        name = "emp_email"
        onChange={(e) => {
            setEmp_email(e.target.value);
          }} />
      </Form.Group>
      </Col>
      <Col className="col-md-6 col-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>เบอร์โทร</Form.Label>
        <Form.Control type="text" 
        placeholder="กรอกเบอร์โทร"
        name = "emp_tel"
        onChange={(e) => {
            setEmp_tel(e.target.value);
          }} />
      </Form.Group>
    </Col>
  </Row>

  <Row className="col-md-12 ">
    <Col className="col-md-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>ที่อยู่</Form.Label>
        <Form.Control type="textarea" 
        placeholder="กรอกที่อยู่"
        name = "emp_address"
        onChange={(e) => {
            setEmp_address(e.target.value);
          }} />
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
        <Form.Control type="text" 
        placeholder="กรอกชื่อผู้ใช้"
        name = "emp_username"
        onChange={(e) => {
            setEmp_username(e.target.value);
          }} />
      </Form.Group>
      </Col>
      <Col className="col-md-6 col-12">
      <Form.Group controlId="formBasicTextInput">
        <Form.Label>รหัสผ่าน</Form.Label>
        <Form.Control type="text" 
        placeholder="กรอกรหัสผ่าน"
        name = "emp_password	"
        onChange={(e) => {
            setEmp_password(e.target.value);
          }} />
      </Form.Group>
    </Col>
  </Row>

  <Row className="col-md-12 ">
  <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
    <Button
      variant="danger"
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
    </>
  );
}


export default EmployeeManagement;
