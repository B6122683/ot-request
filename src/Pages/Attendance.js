import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Webcam from "react-webcam";
import GGMap from "./GGMap";
import Axios from "axios";
import moment from "moment/min/moment-with-locales";
import ReactPaginate from "react-paginate";

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [emp_id, setEmpId] = useState("");

  var active = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [val, setVal] = useState(active.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(val.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("http://localhost:3333/authen", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        if (response.data.decoded.user.role_id != 2) {
          localStorage.removeItem("token");
          window.location = "/login";
        } else {
          setEmpId(response.data.decoded.user.emp_id);
        }
      });
    } else {
      window.location = "/login";
    }
  };

  const attList = () => {
    Axios.get("http://localhost:3333/attendance").then((response) => {
      setAttendanceList(response.data);
    });
  };

  useEffect(() => {
    getAuth();
    attList();
  }, []);

  return (
    <Container className="mb-5">
      <h1 className="attendance">บันทึกเวลาเข้า-ออกงาน</h1>
      {/* <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      {imgSrc && <img src={imgSrc} />} */}
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GGMap />
        </div>
      </Row>

      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="trAdmin">
              <th>วันที่</th>
              <th>เวลา</th>
              <th>สถานะ</th>
              <th>ที่อยู่</th>
              <th>พิกัด</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((val, index) => {
                return (
                  <tr className="tbody" style={{ marginBottom: "50px" }}>
                    {val.emp_id == emp_id ? (
                      <>
                        <td>
                          {moment(val.work_date).locale("th").format("L")}
                        </td>
                        <td>
                          {moment(val.work_date).locale("th").format("LT")}
                        </td>
                        <td>
                          {val.work_status == 0 ? (
                            <p style={{ color: "#1FB640" }}>Check In</p>
                          ) : (
                            <p style={{ color: "#FB3131" }}>Check Out</p>
                          )}
                        </td>
                        <td>{val.work_address}</td>
                        <td>{val.work_lat + ", " + val.work_lng}</td>
                      </>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
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

export default Attendance;
