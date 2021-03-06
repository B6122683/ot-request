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
      <h1 className="attendance">?????????????????????????????? OT</h1>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th></th>
              <th>???????????????</th>
              <th>????????????-????????????</th>
              <th>?????????????????????</th>
              <th>?????????????????????????????????????????? OT</th>
              <th>???????????????</th>
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
                  <td>{moment(val.otr_date).locale("th").format("ll")} ???.</td>
                  <td>
                    {val.otr_status == 0 && (
                      <Button
                        variant="warning"
                        style={{ margin: "0px" }}
                        onClick={() => getOTrequest(val.otr_id)}
                      >
                        {" "}
                        ???????????????????????????{" "}
                      </Button>
                    )}
                    {val.otr_status == 1 && (
                      <Button variant="success" style={{ margin: "0px" }}>
                        {" "}
                        ?????????????????????{" "}
                      </Button>
                    )}
                    {val.otr_status == 2 && (
                      <Button variant="danger" style={{ margin: "0px" }}>
                        {" "}
                        ??????????????????????????????{" "}
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
                  ?????????????????????????????????????????? OT
                </h2>
              </Row>
              {otrequestListbyId.map((val) => {
                return (
                  <Row>
                    <Form>
                      <Row className="col-md-12 ">
                        <Col className="col-md-12 col-12">
                          <Form.Group controlId="formBasicTextInput">
                            <Form.Label>???????????????</Form.Label>
                            <Form.Select
                              name="otr_status"
                              onChange={(e) => {
                                setotStatus(e.target.value);
                              }}
                            >
                              <option value="0">???????????????????????????</option>
                              <option value="1">?????????????????????</option>
                              <option value="2">??????????????????????????????</option>
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
                          ??????????????????
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ margin: "10px" }}
                          onClick={approveotRequest(val.otr_id)}
                        >
                          ??????????????????
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
                  ?????????????????????????????? OT
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
                            <Form.Label>????????????-?????????????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="????????????????????????-?????????????????????"
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
                            <Form.Label>????????????</Form.Label>
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
                            <Form.Label>?????????????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="?????????????????????????????????"
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
                            <Form.Label>???????????????</Form.Label>
                            <Form.Select disabled>
                              <option value={val.otr_status}>
                                {val.otr_status == 0 && "???????????????????????????"}
                                {val.otr_status == 1 && "?????????????????????"}
                                {val.otr_status == 2 && "??????????????????????????????"}
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
                            <Form.Label>???????????????????????? OT</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="?????????????????????????????????"
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
                          ?????????
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
