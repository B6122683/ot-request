import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Card, Button, Modal, Form, Table, Col } from "react-bootstrap";
import "./OTRequest.css";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment/min/moment-with-locales";

function OTRequestDesc() {
  const [modalShow, setModalShow] = useState(false);
  const [otassignList, setOtassignList] = useState([]);
  const [otrequestList, setOtRequestList] = useState([]);
  const { ot_id } = useParams();
  const [role_id, setRole] = useState("");
  const [dep_id, setDepId] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [emp_name, setEmpName] = useState("");
  const [emp_depname, setEmpDepName] = useState("");
  const [emp_posname, setEmpPosName] = useState("");

  const otassign = () => {
    Axios.get(`http://localhost:3333/otassignment/${ot_id}`).then(
      (response) => {
        setOtassignList(response.data);
        console.log(response.data);
      }
    );
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

  const sendOTRequest = () => {
    Axios.post("http://localhost:3333/otrequest", {
      emp_id: emp_id,
      dep_id: dep_id,
      ot_id: ot_id,
    }).then(() => {
      setOtRequestList({
        ...otrequestList,
        emp_id: emp_id,
        dep_id: dep_id,
        ot_id: ot_id,
      });
      window.location = "/otrequest";
    });
  };

  useEffect(() => {
    getAuth();
    otassign();
  }, []);

  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  return (
    <Container>
      <h1 className="otrequest">???????????????????????????????????????????????????????????????????????????????????????</h1>
      <Card className="bord">
        <Card.Body>
          <Card.Text>
            {otassignList.map((val) => {
              return (
                <Row className="col-md-12" style={{ marginTop: "30px" }}>
                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>????????????????????? : </Form.Label>
                      {val.ot_name}
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>???????????? : </Form.Label>
                      {val.dep_name}
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>?????????????????????????????? : </Form.Label>
                      {val.ot_desc}
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>?????????/???????????? ??????????????? : </Form.Label>
                      {moment(val.ot_starttime).locale("th").format("LLLL")} ???.
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>?????????/???????????? ??????????????????????????? : </Form.Label>
                      {moment(val.ot_finishtime).locale("th").format("LLLL")} ???.
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>????????????????????? OT : </Form.Label>
                      {val.summary}
                    </Form.Group>
                  </Col>

                  <Row className="col-md-12 ">
                    <Col className="col-md-4 col-12">
                      <Form.Group controlId="formBasicTextInput">
                        <Form.Label>????????????????????????????????? :</Form.Label>
                        {val.ot_apply} ??????
                      </Form.Group>
                    </Col>

                    <Col className="col-md-4 col-12">
                      <Form.Group controlId="formBasicTextInput">
                        <Form.Label>???????????????????????? :</Form.Label>
                        {val.ot_request} ??????
                      </Form.Group>
                    </Col>

                    <Col className="col-md-4 col-12">
                      <Form.Group controlId="formBasicTextInput">
                        <Form.Label>??????????????? :</Form.Label>
                        {val.ot_stump} ??????
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
              );
            })}
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="danger"
              onClick={() => (window.location.href = "/otrequest")}
              style={{ margin: "10px" }}
            >
              ????????????????????????
            </Button>
            <Button
              variant="primary"
              onClick={() => setModalShow(true)}
              style={{ margin: "10px" }}
            >
              ????????????????????????
            </Button>

            <Modal show={modalShow} centered>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <h2 className="leaveform" style={{ textAlign: "center" }}>
                      ???????????????????????????????????????????????????????????????????????????
                    </h2>
                  </Row>
                  {otassignList.map((val) => {
                    return (
                      <Row>
                        <Form>
                          <Form.Group
                            className="mb-3 col-12"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>????????????-????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="????????????????????????-????????????"
                              value={emp_name}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>?????????????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="?????????????????????????????????"
                              value={emp_posname}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="????????????????????????"
                              value={emp_depname}
                              disabled
                            />
                          </Form.Group>

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
                          <Form.Group className="mb-3">
                            <Form.Label>?????????/???????????? ???????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="?????????????????????/???????????? ???????????????"
                              value={
                                moment(val.ot_starttime)
                                  .locale("th")
                                  .format("LLLL") + " ???."
                              }
                              disabled
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>?????????/???????????? ???????????????????????????</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="?????????????????????/???????????? ???????????????????????????"
                              value={
                                moment(val.ot_finishtime)
                                  .locale("th")
                                  .format("LLLL") + " ???."
                              }
                              disabled
                            />
                          </Form.Group>

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
                              onClick={sendOTRequest}
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
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

// function MydModalWithGrid(props) {
//   return (
//     <Modal {...props} centered>
//       <Modal.Body className="show-grid">
//         <Container>
//           <Row>
//             <h2 className="leaveform" style={{ textAlign: "center" }}>
//               ???????????????????????????????????????????????????????????????????????????
//             </h2>
//           </Row>
//           <Row>
//             <Form>
//               <Form.Group
//                 className="mb-3 col-12"
//                 controlId="formBasicTextInput"
//               >
//                 <Form.Label>????????????-????????????</Form.Label>
//                 <Form.Control type="text" placeholder="????????????????????????-????????????" />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTextInput">
//                 <Form.Label>?????????????????????</Form.Label>
//                 <Form.Control type="text" placeholder="?????????????????????????????????" />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTextInput">
//                 <Form.Label>????????????</Form.Label>
//                 <Form.Control type="text" placeholder="????????????????????????" />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTextInput">
//                 <Form.Label>?????????????????????</Form.Label>
//                 <Form.Control type="text" placeholder="?????????????????????????????????" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>???????????????????????? OT</Form.Label>
//                 <Form.Control type="date" placeholder="???????????????????????????????????? OT" />
//               </Form.Group>
//               <Row>
//                 <Col>
//                   <Form.Group className="mb-3 col-12">
//                     <Form.Label>???????????????????????????</Form.Label>
//                     <Form.Control type="time" placeholder="????????????????????????????????????????????????" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group className="mb-3 col-12">
//                     <Form.Label>?????????????????????</Form.Label>
//                     <Form.Control
//                       type="time"
//                       placeholder="??????????????????????????????????????????????????????"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <div style={{ display: "flex", justifyContent: "center" }}>
//                 <Button
//                   variant="danger"
//                   onClick={props.onHide}
//                   style={{ margin: "10px" }}
//                 >
//                   ??????????????????
//                 </Button>
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   style={{ margin: "10px" }}
//                 >
//                   ??????????????????
//                 </Button>
//               </div>
//             </Form>
//           </Row>
//         </Container>
//       </Modal.Body>
//     </Modal>
//   );
// }

export default OTRequestDesc;
