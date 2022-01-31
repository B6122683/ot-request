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
  const [departmentList, setDepartmentList] = useState([]);
  const [dep_id, setDep_id] = useState("");
  const { ot_id } = useParams();
  const [role_id, setRole] = useState("");
  const [emp_name, setEmpName] = useState("");

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
      } else {
        window.location = "/login";
      }
    });
  };

  useEffect(() => {
    getAuth();
    otassign();
    dataepartment();
  }, []);

  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  return (
    <Container>
      <h1 className="otrequest">รายละเอียดการทำงาน​</h1>
      <Card className="bord">
        <Card.Body>
          <Card.Text>
            {otassignList.map((val) => {
              return (
                <Row className="col-md-12" style={{ marginTop: "30px" }}>
                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>ชื่องาน : </Form.Label>
                      {val.ot_name}
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>แผนก : </Form.Label>
                      {val.dep_name}
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>รายละเอียด : </Form.Label>
                      {val.ot_desc}
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>วัน/เวลา เริ่ม : </Form.Label>
                      {moment(val.ot_starttime).locale("th").format("LLLL")} น.
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>วัน/เวลา เสร็จสิ้น : </Form.Label>
                      {moment(val.ot_finishtime).locale("th").format("LLLL")} น.
                    </Form.Group>
                  </Col>

                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput">
                      <Form.Label>รวมเวลา OT : </Form.Label>
                      {val.summary}
                    </Form.Group>
                  </Col>

                  <Row className="col-md-12 ">
                    <Col className="col-md-4 col-12">
                      <Form.Group controlId="formBasicTextInput">
                        <Form.Label>จำนวนที่รับ :</Form.Label>
                        {val.ot_apply} คน
                      </Form.Group>
                    </Col>

                    <Col className="col-md-4 col-12">
                      <Form.Group controlId="formBasicTextInput">
                        <Form.Label>ยื่นคำขอ :</Form.Label>
                        {val.ot_request} คน
                      </Form.Group>
                    </Col>

                    <Col className="col-md-4 col-12">
                      <Form.Group controlId="formBasicTextInput">
                        <Form.Label>เหลือ :</Form.Label>
                        {val.ot_stump} คน
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
              ย้อนกลับ
            </Button>
            <Button
              variant="primary"
              onClick={() => setModalShow(true)}
              style={{ margin: "10px" }}
            >
              ยื่นคำขอ
            </Button>

            <Modal show={modalShow} centered>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <h2 className="leaveform" style={{ textAlign: "center" }}>
                      แบบฟอร์มคำขอทำงานล่วงเวลา
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
                            <Form.Label>ชื่อ-สกุล</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกชื่อ-สกุล"
                              value={emp_name}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>ตำแหน่ง</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกตำแหน่ง"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicTextInput"
                          >
                            <Form.Label>แผนก</Form.Label>
                            <Form.Control type="text" placeholder="กรอกแผนก" />
                          </Form.Group>

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
                          <Form.Group className="mb-3">
                            <Form.Label>วัน/เวลา เริ่ม</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกวัน/เวลา เริ่ม"
                              value={moment(val.ot_starttime).locale("th").format("LLLL") + " น."}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>วัน/เวลา เสร็จสิ้น</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="กรอกวัน/เวลา เสร็จสิ้น"
                              value={moment(val.ot_finishtime).locale("th").format("LLLL") + " น."}
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
//               แบบฟอร์มคำขอทำงานล่วงเวลา
//             </h2>
//           </Row>
//           <Row>
//             <Form>
//               <Form.Group
//                 className="mb-3 col-12"
//                 controlId="formBasicTextInput"
//               >
//                 <Form.Label>ชื่อ-สกุล</Form.Label>
//                 <Form.Control type="text" placeholder="กรอกชื่อ-สกุล" />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTextInput">
//                 <Form.Label>ตำแหน่ง</Form.Label>
//                 <Form.Control type="text" placeholder="กรอกตำแหน่ง" />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTextInput">
//                 <Form.Label>แผนก</Form.Label>
//                 <Form.Control type="text" placeholder="กรอกแผนก" />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTextInput">
//                 <Form.Label>ชื่องาน</Form.Label>
//                 <Form.Control type="text" placeholder="กรอกชื่องาน" />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>วันที่ทำ OT</Form.Label>
//                 <Form.Control type="date" placeholder="กรอกวันที่ทำ OT" />
//               </Form.Group>
//               <Row>
//                 <Col>
//                   <Form.Group className="mb-3 col-12">
//                     <Form.Label>เริ่มเวลา</Form.Label>
//                     <Form.Control type="time" placeholder="กรอกเวลาที่เริ่ม" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group className="mb-3 col-12">
//                     <Form.Label>ถึงเวลา</Form.Label>
//                     <Form.Control
//                       type="time"
//                       placeholder="กรอกเวลาที่สิ้นสุด"
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
//                   ยกเลิก
//                 </Button>
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   style={{ margin: "10px" }}
//                 >
//                   ยืนยัน
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
