import React, { useState, useEffect } from "react";
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
  const [ot_name, setOt_name] = useState("");
  const [ot_rate, setOt_rate] = useState("");
  const [dep_id, setDep_id] = useState("");
  const [ot_desc, setOt_desc] = useState("");
  const [ot_starttime, setOt_starttime] = useState("");
  const [ot_finishtime, setOt_finishtime] = useState("");
  const [ot_apply, setOt_apply] = useState("");

  const [OTAssignmentList, setOTAssignmentList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const Addotmng = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (
      ot_name == "" ||
      ot_rate == "" ||
      dep_id == "" ||
      ot_desc == "" ||
      ot_starttime == "" ||
      ot_finishtime == "" ||
      ot_apply == ""
    ) {
      setValidated(true);
    } else {
      Axios.post("http://localhost:3333/otassignment", {
        ot_name: ot_name,
        ot_rate: ot_rate,
        dep_id: dep_id,
        ot_desc: ot_desc,
        ot_starttime: ot_starttime,
        ot_finishtime: ot_finishtime,
        ot_apply: ot_apply,
        ot_stump: ot_apply,
      }).then(() => {
        setOTAssignmentList({
          ...OTAssignmentList,

          ot_name: ot_name,
          ot_rate: ot_rate,
          dep_id: dep_id,
          ot_desc: ot_desc,
          ot_starttime: ot_starttime,
          ot_finishtime: ot_finishtime,
          ot_apply: ot_apply,
          ot_stump: ot_apply,
        });
        window.location = "/adminot";
      });
    }
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("http://localhost:3333/authen", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        if (response.data.decoded.user.role_id != 1) {
          localStorage.removeItem("token");
          window.location = "/login";
        } else {
          setDep_id(response.data.decoded.user.dep_id);
        }
      });
    } else {
      window.location = "/login";
    }
  };

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  useEffect(() => {
    getAuth();
    dataepartment();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="adot">เพิ่มข้อมูล OT</h1>
        </Row>
        <Row>
          <Form
            className="adminot"
            onSubmit={Addotmng}
            noValidate
            validated={validated}
          >
            <Row className="col-md-12" style={{ marginTop: "30px" }}>
              <Col className="col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ชื่องาน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่องาน"
                    name="ot_name"
                    required
                    onChange={(e) => {
                      setOt_name(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกชื่องาน
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ชื่อแผนก</Form.Label>
                  <Form.Select
                    value={dep_id}
                    onChange={(e) => {
                      setDep_id(e.target.value);
                    }}
                    required  
                    disabled
                  >
                    <option value="">กรุณาเลือก</option>
                    {departmentList.map((department) => (
                      <option value={department.dep_id}>
                        {department.dep_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกแผนก
                  </Form.Control.Feedback>
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
                    required
                    onChange={(e) => {
                      setOt_desc(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกรายละเอียด
                  </Form.Control.Feedback>
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
                    required
                    onChange={(e) => {
                      setOt_starttime(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกวัน/เวลาเริ่ม
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>วัน/เวลาสิ้นสุด</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="ot_finishtime"
                    onChange={(e) => {
                      setOt_finishtime(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกวัน/เวลาสิ้นสุด
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>จำนวนที่รับ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกจำนวนที่รับ"
                    name="ot_apply"
                    onChange={(e) => {
                      setOt_apply(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกจำนวนที่รับ
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ค่าตอบแทน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกค่าตอบแทน"
                    name="ot_rate"
                    onChange={(e) => {
                      setOt_rate(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกค่าตอบแทน
                  </Form.Control.Feedback>
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
                <Button
                  variant="danger"
                  style={{ margin: "10px" }}
                  onClick={() => (window.location = "/adminot")}
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
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default AdminOTManagement;
