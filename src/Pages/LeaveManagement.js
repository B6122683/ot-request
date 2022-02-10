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
import Select from "react-select";
import moment from "moment/min/moment-with-locales";
import { useHistory, useParams } from "react-router-dom";

function LeaveManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [LeaveList, setLeaveList] = useState([]);
  const [role_id, setRole] = useState("");
  const [dep_id, setDepId] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [emp_name, setEmpName] = useState("");
  const [emp_depname, setEmpDepName] = useState("");
  const [emp_posname, setEmpPosName] = useState("");
  const [leaveworkListbyId, setLeaveworkListbyId] = useState([]);
  const [leaveaccept, setleaveaccept] = useState(0);

  const [modalShowview, setModalShowview] = useState(false);
  const [leaveListbyId, setLeaveListbyId] = useState([]);

  const leavebyid = (leave_id) => {
    Axios.get(`http://localhost:3333/leaveworkId/${leave_id}`).then(
      (response) => {
        setLeaveListbyId(response.data);
        // console.log(response.data[0]);
        if (!response.data) {
          setModalShowview(false);
        } else {
          setModalShowview(true);
        }
      }
    );
  };

  const showModalview = () => {
    setModalShowview(true);
  };

  const hideModalview = () => {
    setModalShowview(false);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const leaveList = () => {
    Axios.get("http://localhost:3333/leaveworkview").then((response) => {
      setLeaveList(response.data);
    });
  };

  const getLeavework = (id) => {
    Axios.get(`http://localhost:3333/leavework/${id}`).then((response) => {
      setLeaveworkListbyId(response.data);
      setModalShow(true);
    });
  };

  const approveleavework = (id) => {
    Axios.put("http://localhost:3333/approveleavework", {
      leave_accept: leaveaccept,
      leave_id: id,
    });
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        setRole(response.data.decoded.user.role_id);
        setEmpName(
          response.data.decoded.user.emp_firstname +
            " " +
            response.data.decoded.user.emp_surname
        );
        setEmpDepName(response.data.decoded.user.dep_name);
        setEmpPosName(response.data.decoded.user.position_name);
        setEmpId(response.data.decoded.user.emp_id);
        setDepId(response.data.decoded.user.dep_id);
      } else {
        window.location = "/login";
      }
    });
  };

  useEffect(() => {
    leaveList();
    getAuth();
    // dataepartment();
    // leavetype();
    // getLeavework();
    // approveleavework();
  }, []);

  return (
    <Container>
      <h1 className="leave">จัดการคำขอลางาน</h1>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th></th>
              <th>รหัสคำขอ</th>
              <th>ชื่อ-สกุล</th>
              <th>แผนก</th>
              <th>ประเภทการลา</th>
              <th>วันที่แจ้งขอลา</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          {LeaveList.map((val) => {
            return (
              <tbody>
                <tr className="tbody">
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
                      onClick={() => leavebyid(val.leave_id)}
                    />
                  </td>
                  <td>{val.leave_id}</td>
                  <td>
                    {val.emp_firstname} {val.emp_surname}
                  </td>
                  <td>{val.dep_name}</td>
                  <td>{val.ltype_name}</td>
                  <td>{moment(val.leave_date).locale("th").format("LL")}</td>
                  <td>
                    {val.leave_accept == 0 && (
                      <Button
                        variant="warning"
                        style={{ margin: "0px" }}
                        onClick={() => getLeavework(val.leave_id)}
                      >
                        {" "}
                        รออนุมัติ{" "}
                      </Button>
                    )}
                    {val.leave_accept == 1 && (
                      <Button variant="success" style={{ margin: "0px" }}>
                        {" "}
                        อนุมัติ{" "}
                      </Button>
                    )}
                    {val.leave_accept == 2 && (
                      <Button variant="danger" style={{ margin: "0px" }}>
                        {" "}
                        ไม่อนุมัติ{" "}
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>

        <Modal show={modalShow} centered>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <h2 className="leaveform" style={{ textAlign: "center" }}>
                  การอนุมัติคำขอลางาน
                </h2>
              </Row>
              {leaveworkListbyId.map((val) => {
                return (
                  <Row>
                    <Form>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Row className="col-md-12 " style={{ margin: "5px" }}>
                          <Col className="col-md-2 col-12">
                            <Form.Group controlId="formBasicTextInput">
                              <Form.Label style={{ display: "flex" }}>
                                เลือก
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col className="col-md-10 col-12">
                            <Form.Group controlId="formBasicTextInput">
                              <Form.Select
                                name="leave_accept"
                                onChange={(e) => {
                                  setleaveaccept(e.target.value);
                                }}
                              >
                                <option value="0">รออนุมัติ</option>
                                <option value="1">อนุมัติ</option>
                                <option value="2">ไม่อนุมัติ</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

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
                          ยกเลิก
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ margin: "10px" }}
                          onClick={approveleavework(val.leave_id)}
                        >
                          ยืนยัน
                        </Button>
                      </div>
                    </Form>
                  </Row>
                );
              })}
            </Container>
          </Modal.Body>
        </Modal>

        <Modal
          show={modalShowview}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <h2 className="leaveform" style={{ textAlign: "center" }}>
                  ข้อมูลคำขอลางาน
                </h2>
              </Row>

              {leaveListbyId.map((val) => {
                return (
                  <Row>
                    <Form>
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
                            <Form.Label>แผนก</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกแผนก"
                              value={val.dep_name}
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
                            <Form.Label>ประเภทการลา</Form.Label>
                            <Form.Select disabled>
                              <option value={val.ltype_id}>
                                {val.ltype_name}
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col className="col-md-6 col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>รายละเอียดการลา</Form.Label>
                            <Form.Control
                              type="text"
                              value={val.leave_desc}
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
                            <Form.Label>ขอลาตั้งแต่วันที่</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่องาน"
                              value={moment(val.start_leave)
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
                            <Form.Label>ถึงวันที่</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่องาน"
                              value={moment(val.end_leave)
                                .locale("th")
                                .format("LL")}
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
                            <Form.Label>วันที่แจ้งขอลา</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่องาน"
                              value={moment(val.leave_date)
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
                            <Form.Label>สถานะ</Form.Label>
                            <Form.Select disabled>
                              <option value={val.leave_accept}>
                                {val.leave_accept == 0 && "รออนุมัติ"}
                                {val.leave_accept == 1 && "อนุมัติ"}
                                {val.leave_accept == 2 && "ไม่อนุมัติ"}
                              </option>
                            </Form.Select>
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
                          onClick={hideModalview}
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

export default LeaveManagement;
