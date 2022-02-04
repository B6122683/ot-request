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
import images2 from "../images/view.png";
import images3 from "../images/delete.png";
import Axios from "axios";
import moment from "moment/min/moment-with-locales";

function OTManagement() {
  const [otrequestList, setOtrequestList] = useState([]);
  const [otrequestListbyId, setOtrequestListbyId] = useState([]);
  const [otstatus, setotStatus] = useState(0);
  const [modalShow, setModalShow] = useState(false);

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

  const getOTrequest = (id) => {
    Axios.get(`http://localhost:3333/otrequest/${id}`).then((response) => {
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
      <div style={{ display: "flex", justifyContent: "center" }}></div>
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
          {otrequestList.map((val, index) => {
            return (
              <tbody>
                <tr className="tbody">
                  <td>
                    {/* <Link to={`/otrequestdesc/${val.ot_id}`}> */}
                    <Image
                      style={{
                        height: "20px",
                        width: "20px",
                        objectFit: "cover",
                        justifyContent: "center",
                      }}
                      alt=""
                      src={images2}
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
      </Row>
    </Container>
  );
}

export default OTManagement;
