import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";
import moment from "moment/min/moment-with-locales";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

function AdminOT() {
  const [otassignList, setOtassignList] = useState([]);
  const [role_id, setRole] = useState("");
  const [dep_id, setDepId] = useState("");
  const [otname, setOTName] = useState("");

  var active = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [val, setVal] = useState(active.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(val.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const otassign = () => {
    Axios.get("http://localhost:3333/otassignview").then((response) => {
      setOtassignList(response.data);
      console.log(response.data);
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
        if (
          response.data.decoded.user.role_id != 1
        ) {
          localStorage.removeItem("token");
          window.location = "/login";
        } else {
          setRole(response.data.decoded.user.role_id);
          setDepId(response.data.decoded.user.dep_id);
        }
      });
    } else {
      window.location = "/login";
    }
  };

  const deleteAdminOT = (id) => {
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
        Axios.delete(`http://localhost:3333/otassignment/${id}`).then(
          (response) => {
            setOtassignList(
              otassignList.filter((val) => {
                return val.ot_id != id;
              })
            );
          }
        );
        Swal.fire("ลบแล้ว!", "ลบไฟล์เรียบร้อย", "success");
      }
    });
  };

  useEffect(() => {
    otassign();
    getAuth();
  }, []);

  return (
    <Container>
      <h1 className="attendance">จัดการข้อมูล OT</h1>

      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12">
          <Col className="col-md-4"></Col>
          <Col className="col-md-4 col-12">
            <Form.Group className="mb-3">
              <Form.Label>ค้นหาจากชื่องาน</Form.Label>
              <Form.Control
                type="text"
                placeholder="ค้นหา..."
                name="ot_name"
                onChange={(e) => setOTName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4"></Col>
        </Row>
      </div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          {role_id == 1 && (
            <Button
              variant="secondary"
              style={{ margin: "0px" }}
              onClick={() => (window.location = "/adminotmanagement")}
            >
              {" "}
              เพิ่ม{" "}
            </Button>
          )}
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover responsive="lg">
            <thead>
              <tr className="trAdmin">
                <th>รหัสงาน</th>
                <th>ชื่องาน</th>
                <th>แผนก</th>
                <th>รายละเอียด</th>
                <th>วัน/เวลา เริ่ม</th>
                <th>วัน/เวลา สิ้นสุด</th>
                <th>จำนวนที่รับ</th>
                <th>ค่าตอบแทน</th>
                {role_id == 1 && <th style={{ width: "100px" }}>จัดการ</th>}
              </tr>
            </thead>
            {otassignList
              .filter((val) => {
                if (otname == "") {
                  return val;
                } else {
                  return val.ot_name
                    .toLowerCase()
                    .includes(otname.toLowerCase());
                }
              })
              .slice(pagesVisited, pagesVisited + usersPerPage).map((val, index) => {
                return (
                  <tbody>
                    {val.dep_id == dep_id && (
                      <>
                        <tr className="tbody">
                          <td>{index + 1}</td>
                          <td>{val.ot_name}</td>
                          <td>{val.dep_name}</td>
                          <td>{val.ot_desc}</td>
                          <td>
                            {moment(val.ot_starttime)
                              .locale("th")
                              .format("LLL") + " น."}
                          </td>
                          <td>
                            {moment(val.ot_finishtime)
                              .locale("th")
                              .format("LLL") + " น."}
                          </td>
                          <td>{val.ot_apply}</td>
                          <td>{val.ot_rate}</td>
                          {role_id == 1 && (
                            <td>
                              <Link to={`/adminotmanagement/${val.ot_id}`}>
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
                                  deleteAdminOT(val.ot_id);
                                }}
                              />
                            </td>
                          )}
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
        </div>
      </Row>
    </Container>
  );
}

export default AdminOT;
