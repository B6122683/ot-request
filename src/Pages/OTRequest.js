import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import images1 from "../images/view.png";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Axios from "axios";
import { style } from "@mui/system";

function OTRequest() {
  const [otassignList, setOtassignList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [dep_id, setDep_id] = useState("");

  const otassign = () => {
    Axios.get("http://localhost:3333/otassignment").then((response) => {
      setOtassignList(response.data);
    });
  };

  useEffect(() => {
    otassign();
    dataepartment();
  }, []);

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };



  return (
    <Container>
      <h1 className="otrequest">แจ้งคำขอทำงานล่วงเวลา​</h1>
      <Row>
      <Col sm>
        รออนุมัติ
        <h1 className="request">
          1 <h3 className="list"> รายการ</h3>
        </h1>
      </Col>
      <Col sm>
        เสร็จสิ้น
        <h1 className="request">
          1 <h3 className="list"> รายการ</h3>
        </h1>
      </Col>
    </Row>
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
                </td>
                <td>{val.ot_name}</td>
                <td  value={dep_id}
                  onChange={(e) => {
                    setDep_id(e.target.value); }}>{val.dep_name}</td>
                <td>{val.ot_starttime}</td>
                <td>{val.ot_finishtime}</td>
                <td>{val.ot_apply}</td>
                <td>
                  {val.ot_status == 1 ? <p style={{color: "#1FB640" }}>เปิดรับ</p> : <p style={{color: "#FB3131" }}>ปิด</p>}
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
