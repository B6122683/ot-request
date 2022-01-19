import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./AdminOT.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import account from "../images/account.png";
import Axios from "axios";

function AdminOTManagement() {

    const [asm_id, setAsm_id] = useState("");
    const [ot_name, setOt_name] = useState("");
    const [ot_rate, setOt_rate] = useState("");
    const [dep_id, setDep_id] = useState("");
    const [ot_desc, setOt_desc] = useState("");
    const [ot_starttime, setOt_starttime] = useState("");
    const [ot_finishtime, setOt_finishtime] = useState("");
    const [summary, setSummary] = useState("");
    const [ot_apply, setOt_apply] = useState("");
    const [ot_request, setOt_request] = useState("");
    const [ot_stump, setOt_stump] = useState("");
    const [ot_status, setOt_status] = useState("");
    const [create_at, setCreate_at] = useState("");
    const [update_at, setUpdate_at] = useState("");
    const [record_status, setRecord_status] = useState("");

    const [OTAssignmentList, setOTAssignmentList] = useState([]);

  const Addotmng = () => {
    Axios.post("http://localhost:3333/ot_assignment", {
        asm_id: asm_id,
        ot_name: ot_name,
        ot_rate: ot_rate,
        dep_id: dep_id,
        ot_desc: ot_desc,
        ot_starttime: ot_starttime,
        ot_finishtime: ot_finishtime,
        summary: summary,
        ot_apply: ot_apply,
        ot_request: ot_request,
        ot_stump: ot_stump,
        ot_status: ot_status,
        create_at: create_at,
        update_at: update_at,
        record_status: record_status,

    }).then(() => {
        setOTAssignmentList({
            ...OTAssignmentList,
            
            asm_id: asm_id,
            ot_name: ot_name,
            ot_rate: ot_rate,
            dep_id: dep_id,
            ot_desc: ot_desc,
            ot_starttime: ot_starttime,
            ot_finishtime: ot_finishtime,
            summary: summary,
            ot_apply: ot_apply,
            ot_request: ot_request,
            ot_stump: ot_stump,
            ot_status: ot_status,
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
          <h1 className="adot">เพิ่มข้อมูล OT</h1>
        </Row>
        <Row>
          <Form className="adminot">
            <Row className="col-md-12" style={{ marginTop: '30px' }}>
              <Col className="col-12" >
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>รหัสงาน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกรหัสงาน"
                    name="asm_id"
                     onChange={(e) => {
                         setAsm_id(e.target.value)
                        }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12">
                <Col className="col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ชื่องาน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่องาน"
                    name="ot_name"
                    onChange={(e) => {
                        setOt_name(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>
            </Row>



            <Row className="col-md-12 ">
              <Col className="col-md-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ชื่อแผนก</Form.Label>
                  <Form.Select id="disabledSelect">
                    <option>เจ้าหน้าที่</option>
                    </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกรายละเอียด"
                    name="ot_desc"
                    onChange={(e) => {
                        setOt_desc(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>วัน/เวลาเริ่ม</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="ot_starttime"
                    onChange={(e) => {
                        setOt_starttime(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>วัน/เวลาสิ้นสุด</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="ot_finishtime"
                    onChange={(e) => {
                        setOt_finishtime(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                  <Form.Label>รวมเวลา</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกรวมเวลา"
                    name="summary"
                    onChange={(e) => {
                        setSummary(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>

              <Col className="col-md-6 col-12">
              <Form.Group controlId="formBasicTextInput">
                  <Form.Label>จำนวนที่รับ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกจำนวนที่รับ"
                    name="ot_apply"
                    onChange={(e) => {
                        setOt_apply(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ค่าตอบแทน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกค่าตอบแทน"
                    name="ot_rate"
                    onChange={(e) => {
                        setOt_rate(e.target.value)
                       }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
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
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default AdminOTManagement;
