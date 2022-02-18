import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Image,
  Form,
  Modal,
} from "react-bootstrap";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/min/moment-with-locales";
import { Link, useParams } from "react-router-dom";


function Employee() {
  const [employeeList, setEmployeeList] = useState([]);
  const [empfname, setEmpFName] = useState("");
  const [employeeListbyId, setEmployeeListbyId] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [dep_id, setDepId] = useState("");


  const empList = () => {
    Axios.get("http://localhost:3333/employeesview").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const employeebyid = (emp_id) => {
    Axios.get(`http://localhost:3333/employees/${emp_id}`).then((response) => {
      setEmployeeListbyId(response.data);
      console.log(response.data[0]);
      if (!response.data) {
        setModalShow(false);
      } else {
        setModalShow(true);
      }
    });
  };

  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
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
          setDepId(response.data.decoded.user.dep_id);
        }
      });
    } else {
      window.location = "/login";
    }
  };

  const deleteEmployee = (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูล?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3333/employees/${id}`).then(
          (response) => {
            setEmployeeList(
              employeeList.filter((val) => {
                return val.emp_id != id;
              })
            );
          }
        );
        Swal.fire("ลบแล้ว!", "ลบไฟล์เรียบร้อย", "success");
      }
    });
  };

  useEffect(() => {
    empList();
    getAuth();
  }, []);

  return (
    <Container className="mb-5">
      <h1 className="attendance">ข้อมูลพนักงาน</h1>
      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12">
          <Col className="col-md-4"></Col>
          <Col className="col-md-4 col-12">
            <Form.Group className="mb-3">
              <Form.Label>ค้นหาจากชื่อ-สกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="ค้นหา..."
                name="emp_name"
                onChange={(e) => setEmpFName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4"></Col>
        </Row>
      </div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            variant="secondary"
            style={{ margin: "0px" }}
            onClick={() => (window.location = "/employeemanagement")}
          >
            {" "}
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="trAdmin">
              <th>รหัสพนักงาน</th>
              <th>รูปภาพ</th>
              <th>ชื่อ-สกุล</th>
              <th>แผนก</th>
              <th>ตำแหน่ง</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {employeeList
              .filter((val) => {
                if (empfname == "") {
                  return val;
                } else {
                  return (
                    val.emp_firstname
                      .toLowerCase()
                      .includes(empfname.toLowerCase()) ||
                    val.emp_surname
                      .toLowerCase()
                      .includes(empfname.toLowerCase())
                  );
                }
              })
              .map((val, index) => {
                return (
                  <tr className="tbody">
                    {val.dep_id == dep_id && (
                      <>
                        <td>{index + 1}</td>
                        <td>
                          <Image
                            style={{
                              height: "100px",
                              width: "60%",
                              objectFit: "cover",
                              margin: "5px",
                            }}
                            alt=""
                            src={val.emp_images}
                          />
                        </td>
                        <td>
                          {val.emp_firstname} {val.emp_surname}
                        </td>
                        <td>{val.dep_name}</td>
                        <td>{val.position_name}</td>
                        <td>
                          <Image
                            style={{
                              height: 30,
                              width: 30,
                              objectFit: "cover",
                              margin: "5px",
                            }}
                            alt=""
                            src={images2}
                            onClick={() => employeebyid(val.emp_id)}
                          />
                          <Link to={`/employeemanagement/${val.emp_id}`}>
                            <Image
                              style={{
                                height: 30,
                                width: 30,
                                objectFit: "cover",
                                margin: "5px",
                              }}
                              alt=""
                              src={images1}
                            />
                          </Link>
                          <Image
                            style={{
                              height: 30,
                              width: 30,
                              objectFit: "cover",
                              margin: "5px",
                            }}
                            alt=""
                            src={images3}
                            onClick={() => {
                              deleteEmployee(val.emp_id);
                            }}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Modal
          show={modalShow}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <h2 className="leaveform" style={{ textAlign: "center" }}>
                  ข้อมูลพนักงาน
                </h2>
              </Row>
              {employeeListbyId.map((val) => {
                return (
                  <Row>
                    <Form>
                      <Form.Group
                        className="mb-3 col-12"
                        controlId="formBasicTextInput"
                      >
                        <Form.Label>รูปภาพ</Form.Label>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Image
                            className="img-emp"
                            alt="file"
                            src={val.emp_images}
                          />
                        </div>
                      </Form.Group>
                      <Row className="col-md-12 ">
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>ชื่อ-นามสกุล</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่อ-นามสกุล"
                              value={val.emp_firstname + "  " + val.emp_surname}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>เลขบัตรประจำตัวประชาชน</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                              value={val.emp_card_id}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="col-md-12 ">
                        <Col className="col-md-6 col-12">
                          <Form.Group className="mb-3">
                            <Form.Label>วัน/เดือน/ปีเกิด</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกวัน/เดือน/ปีเกิด"
                              // value={val.act_time}
                              value={moment(val.emp_dob)
                                .locale("th")
                                .format("LL")}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>เพศ</Form.Label>
                            <Form.Select disabled>
                              <option value={val.emp_gender}>
                                {val.emp_gender == 0 && "กรุณาเลือก"}
                                {val.emp_gender == 1 && "ชาย"}
                                {val.emp_gender == 2 && "หญิง"}
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="col-md-12 ">
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>อีเมล</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกอีเมล"
                              value={val.emp_email}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>เบอร์โทร</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกเบอร์โทร"
                              value={val.emp_tel}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="col-md-12 ">
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>ที่อยู่</Form.Label>
                            <textarea
                              class="form-control"
                              type="text-area"
                              value={val.emp_address}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>ประเภทพนักงาน</Form.Label>
                            <Form.Select disabled>
                              <option value={val.role_id}>
                                {val.role_name}
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="col-md-12 ">
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>ตำแหน่ง</Form.Label>
                            <Form.Select disabled>
                              <option value={val.position_id}>
                                {val.position_name}
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>แผนก</Form.Label>
                            <Form.Select disabled>
                              <option value={val.dep_id}>{val.dep_name}</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="col-md-12 ">
                        <Col className="col-md-12 col-12">
                          <Form.Group className="mb-3">
                            <Form.Label>ชื่อผู้ใช้</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่อผู้ใช้"
                              value={val.emp_username}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="danger"
                          onClick={hideModal}
                          style={{ margin: "10px" }}
                        >
                          ปิด
                        </Button>
                      </div>
                    </Form>
                  </Row>
                );
              })}
            </Container>
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
}

export default Employee;
