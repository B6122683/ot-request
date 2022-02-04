import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import images1 from "../images/view.png";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import { useHistory, useParams } from "react-router-dom";

function OTRequest() {
  const [otassignList, setOtassignList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [otrequestcountList, setOtrequestcountList] = useState([]);
  const [emp_name, setEmpName] = useState("");
  const [dep_id, setDepId] = useState("");
  const { ot_id } = useParams();
  const [role_id, setRole] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [emp_depname, setEmpDepName] = useState("");
  const [emp_posname, setEmpPosName] = useState("");

  const otassign = () => {
    Axios.get("http://localhost:3333/otassignview").then((response) => {
      setOtassignList(response.data);
    });
  };

  const otrequestcount = () => {
    Axios.get(`http://localhost:3333/otrequestcount/${emp_id}`).then(
      (response) => {
        setOtrequestcountList(response.data);
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

  useEffect(() => {
    otassign();
    getAuth();
    otrequestcount();
  }, []);

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  return (
    <Container>
      <h1 className="otrequest">แจ้งคำขอทำงานล่วงเวลา​</h1>
      {otrequestcountList.map((val) => {
        return (
          <Row>
            <Col className="request">
              <Col>
                <p style={{ display: "flex", fontSize: "1.5rem" }}>รออนุมัติ</p>
                <Col
                  className="col"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <h1>{val.otr_count + " รายการ"}</h1>
                </Col>
              </Col>
            </Col>
            <Col sm className="request">
              <Col>
                <p style={{ display: "flex", fontSize: "1.5rem" }}>
                  อนุมัติแล้ว
                </p>
                <Col
                  className="col"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <h1>{val.otr_count + " รายการ"}</h1>
                </Col>
              </Col>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr className="tr">
              <th></th>
              <th>ชื่องาน</th>
              <th>แผนก</th>
              <th>วัน/เวลา เริ่ม</th>
              <th>วัน/เวลา สิ้นสุด</th>
              <th>จำนวน</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          {otassignList.map((val) => {
            return (
              <tbody>
                <tr className="tbody">
                  <td>
                    <Link to={`/otrequestdesc/${val.ot_id}`}>
                      <Image
                        style={{
                          height: "20px",
                          width: "20px",
                          objectFit: "cover",
                          justifyContent: "center",
                        }}
                        alt=""
                        src={images1}
                      />
                    </Link>
                  </td>
                  <td>{val.ot_name}</td>
                  <td>{val.dep_name}</td>
                  <td>
                    {moment(val.ot_starttime).locale("th").format("LLLL")} น.
                  </td>
                  <td>
                    {moment(val.ot_finishtime).locale("th").format("LLLL")} น.
                  </td>
                  <td>{val.ot_apply}</td>
                  <td>
                    {val.ot_status == 1 ? (
                      <p style={{ color: "#1FB640" }}>เปิดรับ</p>
                    ) : (
                      <p style={{ color: "#FB3131" }}>ปิด</p>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Row>
    </Container>
  );
}

export default OTRequest;
