import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Image from "react-bootstrap/Image";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import act1 from "../images/act1.jpg";
import act2 from "../images/act2.jpg";
import Axios from "axios";
import { Row, Card, Button, Modal, Form, Table, Col } from "react-bootstrap";
import moment from "moment/min/moment-with-locales";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const format = "hh:mm:ss";

function AdminActivity() {
  const [activityList, setActivityList] = useState([]);
  const [activityListbyId, setActivityListbyId] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  var active = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [val, setVal] = useState(active.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const getAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("http://localhost:3333/authen", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        if (response.data.decoded.user.role_id != 3 && response.data.decoded.user.role_id != 1) {
          localStorage.removeItem("token");
          window.location = "/login";
        } 
      });
    } else {
      window.location = "/login";
    }
  };

  const activity = () => {
    Axios.get("http://localhost:3333/activity").then((response) => {
      setActivityList(response.data);
    });
  };

  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };
  const deleteActivity = (id) => {
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
        Axios.delete(`http://localhost:3333/activity/${id}`).then(
          (response) => {
            setActivityList(
              activityList.filter((val) => {
                return val.act_id != id;
              })
            );
          }
        );
        Swal.fire("ลบแล้ว!", "ลบไฟล์เรียบร้อย", "success");
      }
    });
  };

  const activitybyid = (act_id) => {
    Axios.get(`http://localhost:3333/activity/${act_id}`).then((response) => {
      setActivityListbyId(response.data);
      console.log(response.data[0]);
      if (!response.data) {
        setModalShow(false);
      } else {
        setModalShow(true);
      }
    });
  };

  const pageCount = Math.ceil(val.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getAuth();
    activity();
  }, []);

  return (
    <Container className="mb-5">
      <h1 className="attendance">กิจกรรม</h1>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            variant="secondary"
            style={{ margin: "0px" }}
            onClick={() => (window.location = "/activitymanagement")}
          >
            {" "}
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="trAdmin">
              <th>ลำดับกิจกรรม</th>
              <th>รูปภาพ</th>
              <th>ชื่อกิจกรรม</th>
              <th>รายละเอียด</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          {activityList
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((val, index) => {
              return (
                <tbody>
                  <tr className="tbody">
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <Image
                          style={{
                            height: 80,
                            width: 80,
                            objectFit: "cover",
                            margin: "5px",
                          }}
                          alt="file"
                          src={val.act_image}
                        />
                      </div>
                    </td>
                    <td>{val.act_name}</td>
                    <td>{val.act_desc}</td>
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
                        onClick={() => activitybyid(val.act_id)}
                      />
                      <Link to={`/activitymanagement/${val.act_id}`}>
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
                        onClick={() => deleteActivity(val.act_id)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          <Modal show={modalShow} centered>
            <Modal.Body className="show-grid">
              <Container>
                <Row>
                  <h2 className="leaveform" style={{ textAlign: "center" }}>
                    รายละเอียดกิจกรรม
                  </h2>
                </Row>
                {activityListbyId.map((val) => {
                  return (
                    <Row>
                      <Form>
                        <Form.Group
                          className="mb-3 col-12"
                          controlId="formBasicTextInput"
                        >
                          <Form.Label>รูปภาพ</Form.Label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              style={{
                                height: 180,
                                width: "100%",
                                objectFit: "cover",
                                margin: "5px",
                              }}
                              alt="file"
                              src={val.act_image}
                            />
                          </div>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicTextInput"
                        >
                          <Form.Label>ชื่อกิจกรรม</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="กรอกตำแหน่ง"
                            value={val.act_name}
                            disabled
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicTextInput"
                        >
                          <Form.Label>สถานที่</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="กรอกแผนก"
                            value={val.act_place}
                            disabled
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicTextInput"
                        >
                          <Form.Label>วันที่</Form.Label>
                          <Form.Control
                            type="text"
                            value={moment(val.act_date)
                              .locale("th")
                              .format("LL")}
                            disabled
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เวลา</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="กรอกวัน/เวลา เริ่ม"
                            // value={val.act_time + " น."}
                            value={
                              moment(val.act_time).locale("th").format("LT") +
                              " น."
                            }
                            disabled
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>รายละเอียด</Form.Label>
                          <textarea
                            class="form-control"
                            type="text-area"
                            value={val.act_desc}
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
      </Row>
    </Container>
  );
}

function Activityview() {}

export default AdminActivity;
