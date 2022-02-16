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

const WebcamComponent = () => <Webcam />;

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [emp_id, setEmpId] = useState("");

  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        setEmpId(response.data.decoded.user.emp_id);
      } else {
        window.location = "/login";
      }
    });
  };

  const attList = () => {
    Axios.get("http://localhost:3333/attendance").then((response) => {
      setAttendanceList(response.data);
    });
  };

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    getAuth();
    attList();
  }, []);

  return (
    <Container>
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
            {attendanceList.map((val, index) => {
              return (
                <tr className="tbody" style={{marginBottom: "50px"}}>
                  {val.emp_id == emp_id ? (
                    <>
                      <td>{moment(val.work_date).locale("th").format("L")}</td>
                      <td>{moment(val.work_date).locale("th").format("LT")}</td>
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
      </Row>
    </Container>
  );
}

export default Attendance;
