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
import ReactPaginate from "react-paginate";

function LeaveManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [LeaveList, setLeaveList] = useState([]);
  const [dep_id, setDepId] = useState("");
  const [leaveworkListbyId, setLeaveworkListbyId] = useState([]);
  const [leaveaccept, setleaveaccept] = useState(0);
  const [statusleave, setStatusLeave] = useState("");

  const [modalShowview, setModalShowview] = useState(false);
  const [leaveListbyId, setLeaveListbyId] = useState([]);

  var active = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [val, setVal] = useState(active.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(val.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12">
          <Col className="col-md-4"></Col>
          <Col className="col-md-4 col-12">
            <Form.Group className="mb-3">
              <Form.Label>เลือกสถานะคำขอ</Form.Label>
              <Form.Select
                required
                value={statusleave}
                onChange={(e) => {
                  setStatusLeave(e.target.value);
                }}
              >
                <option value="">ทั้งหมด</option>
                <option value="0">รออนุมัติ</option>
                <option value="1">อนุมัติ</option>
                <option value="2">ไม่อนุมัติ</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="col-md-4"></Col>
        </Row>
      </div>
      <Row>
        <Table striped bordered hover responsive>
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
          {LeaveList.filter((val) => {
            if (statusleave == "") {
              return val;
            } else {
              return val.leave_accept == statusleave;
            }
          })
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((val, index) => {
              return (
                <tbody>
                  {val.dep_id == dep_id && (
                    <>
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
                        <td>{index + 1}</td>
                        <td>
                          {val.emp_firstname} {val.emp_surname}
                        </td>
                        <td>{val.dep_name}</td>
                        <td>{val.ltype_name}</td>
                        <td>
                          {moment(val.leave_date).locale("th").format("LL")}
                        </td>
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
                    </>
                  )}
                </tbody>
              );
            })}
        </Table>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>

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
