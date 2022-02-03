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

function LeaveManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [LeaveList, setLeaveList] = useState([]);

  const hideModal = () => {
    setModalShow(false);
  };

  const leaveList = () => {
    Axios.get("http://localhost:3333/leavework").then((response) => {
      setLeaveList(response.data);
    });
  };

  var colors = [
    {
      value: 0,
      label: "red",
    },
    {
      value: 1,
      label: "orange",
    },
    {
      value: 2,
      label: "green",
    },
  ];
  var [setbtncolor, btnvalue] = useState(colors.label);
  var btnhandle = (e) => {
    btnvalue(e.label);
  };

  useEffect(() => {
    leaveList();
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
              <th>วันที่ลา</th>
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
                    />
                  </td>
                  <td>{val.leave_id}</td>
                  <td>{val.leave_name}</td>
                  <td>{val.dep_id}</td>
                  <td>{val.type_leave}</td>
                  <td>{moment(val.start_leave).locale("th").format("LL")}</td>
                  <td>
                    <Button
                      variant="warning"
                      style={{ margin: "0px", backgroundColor: +setbtncolor }}
                      onClick={() => setModalShow(true)}
                    >
                      {" "}
                      รออนุมัติ{" "}
                    </Button>{" "}
                  </td>
                </tr>
              </tbody>
            );
          })}
          <Modal show={modalShow} centered>
            <Modal.Body className="show-grid">
              <Container>
                <Row>
                  <Form>
                    <Form.Group
                      className="mb-3 col-12"
                      controlId="formBasicTextInput"
                    >
                      <Form.Label
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h3>การอนุมัติคำขอลางาน</h3>
                      </Form.Label>
                    </Form.Group>
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
                            <Select options={colors}></Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "5px",
                      }}
                    >
                      <Button
                        variant="danger"
                        onClick={hideModal}
                        style={{ margin: "10px" }}
                      >
                        {setbtncolor}
                        ยกเลิก
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={btnhandle}
                        style={{ margin: "10px" }}
                      >
                        {setbtncolor}
                        ยืนยัน
                      </Button>
                    </div>
                  </Form>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </Table>
      </Row>
    </Container>
  );
}

export default LeaveManagement;
