import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Image from "react-bootstrap/Image";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";
import moment from "moment/min/moment-with-locales";
import { Link, useParams } from "react-router-dom";

function OTManagement() {
  const [otrequestList, setOtrequestList] = useState([]);
  const [otrequestListbyId, setOtrequestListbyId] = useState([]);
  const [otstatus, setotStatus] = useState(0);
  const [statusot, setStatusOt] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [modalShowview, setModalShowview] = useState(false);
  const [otListbyId, setOtListbyId] = useState([]);
  // const { otr_id } = useParams();

  const otbyid = (otr_id) => {
    Axios.get(`http://localhost:3333/otrequestId/${otr_id}`).then(
      (response) => {
        setOtListbyId(response.data);
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

  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const otrequestview = () => {
    Axios.get("http://localhost:3333/otrequestview").then((response) => {
      setOtrequestList(response.data);
      console.log(response.data);
    });
  };

  const getOTrequest = (otr_id) => {
    Axios.get(`http://localhost:3333/otrequest/${otr_id}`).then((response) => {
      setOtrequestListbyId(response.data);
      setModalShow(true);
    });
  };

  const approveotRequest = (id) => {
    Axios.put("http://localhost:3333/approveotrequest", {
      otr_status: otstatus,
      otr_id: id,
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
        return;
      } else {
        window.location = "/login";
      }
    });
  };

  useEffect(() => {
    getAuth();
    otrequestview();
  }, []);

  return (
    <Container>
      <h1 className="attendance">จัดการคำขอ OT</h1>
      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12" aria-colspan={2}>
          <Col className="col-md-6 col-12">
            <Form.Group className="mb-3">
              <Form.Label>เลือกสถานะคำขอ</Form.Label>
              <Form.Select
                required
                value={statusot}
                onChange={(e) => {
                  setStatusOt(e.target.value);
                }}
              >
                <option value="">ทั้งหมด</option>
                <option value="0">รออนุมัติ</option>
                <option value="1">อนุมัติ</option>
                <option value="2">ไม่อนุมัติ</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th></th>
              <th>ลำดับ</th>
              <th>ชื่อ-สกุล</th>
              <th>ชื่องาน</th>
              <th>วันที่แจ้งขอทำ OT</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          {otrequestList
            .filter((val) => {
              if (statusot === "") {
                return val;
              } else {
                return val.otr_status == statusot;
              }
            })
            .map((val, index) => {
              return (
                <tbody>
                  <tr className="tbody">
                    <td>
                      {/* <Link to={`/otrequestdesc/${val.ot_id}`}> */}
                      <Image
                        style={{
                          height: "30px",
                          width: "30px",
                          objectFit: "cover",
                          justifyContent: "center",
                        }}
                        alt=""
                        src={images2}
                        onClick={() => otbyid(val.otr_id)}
                      />
                      {/* </Link> */}
                    </td>
                    <td>{index + 1}</td>
                    <td>{val.emp_firstname + " " + val.emp_surname}</td>
                    <td>{val.ot_name}</td>
                    <td>{moment(val.otr_date).locale("th").format("ll")} น.</td>
                    <td>
                      {val.otr_status == 0 && (
                        <Button
                          variant="warning"
                          style={{ margin: "0px" }}
                          onClick={() => getOTrequest(val.otr_id)}
                        >
                          {" "}
                          รออนุมัติ{" "}
                        </Button>
                      )}
                      {val.otr_status == 1 && (
                        <Button variant="success" style={{ margin: "0px" }}>
                          {" "}
                          อนุมัติ{" "}
                        </Button>
                      )}
                      {val.otr_status == 2 && (
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
                  การอนุมัติคำขอ OT
                </h2>
              </Row>
              {otrequestListbyId.map((val) => {
                return (
                  <Row>
                    <Form>
                      <Row className="col-md-12 ">
                        <Col className="col-md-12 col-12">
                          <Form.Group controlId="formBasicTextInput">
                            <Form.Label>เลือก</Form.Label>
                            <Form.Select
                              name="otr_status"
                              onChange={(e) => {
                                setotStatus(e.target.value);
                              }}
                            >
                              <option value="0">รออนุมัติ</option>
                              <option value="1">อนุมัติ</option>
                              <option value="2">ไม่อนุมัติ</option>
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
                          onClick={hideModal}
                          style={{ margin: "10px" }}
                        >
                          ยกเลิก
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ margin: "10px" }}
                          onClick={approveotRequest(val.otr_id)}
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
                  ข้อมูลคำขอ OT
                </h2>
              </Row>

              {otListbyId.map((val) => {
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
                            <Form.Select disabled>
                              <option value={val.dep_id}>{val.dep_name}</option>
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
                            <Form.Label>ชื่องาน</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่องาน"
                              value={val.ot_name}
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
                              <option value={val.otr_status}>
                                {val.otr_status == 0 && "รออนุมัติ"}
                                {val.otr_status == 1 && "อนุมัติ"}
                                {val.otr_status == 2 && "ไม่อนุมัติ"}
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
                            <Form.Label>วันที่ขอ OT</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่องาน"
                              value={moment(val.otr_date)
                                .locale("th")
                                .format("LL")}
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

export default OTManagement;
