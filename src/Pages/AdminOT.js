import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Image from "react-bootstrap/Image";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";
import moment from "moment/min/moment-with-locales";
import { Link } from "react-router-dom";

function AdminOT() {
  const [otassignList, setOtassignList] = useState([]);
  const [role_id, setRole] = useState("");

  const otassign = () => {
    Axios.get("http://localhost:3333/otassignview").then((response) => {
      setOtassignList(response.data);
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
      if (response.data.decoded.user.role_id != 1) {
        window.location = "/";
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
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button variant="secondary" style={{ margin: "0px" }} onClick={() => (window.location = "/adminotmanagement")}>
            {" "}
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <div style={{overflowX:"auto"}}>
        <Table striped bordered hover responsive="lg" >
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
              <th style={{width:'100px'}}>จัดการ</th>
            </tr>
          </thead>
          {otassignList.map((val,index) => {
            return (
              <tbody>
                <tr className="tbody">
                  <td>{index + 1}</td>
                  <td>{val.ot_name}</td>
                  <td>{val.dep_name}</td>
                  <td>{val.ot_desc}</td>
                  <td>{moment(val.ot_starttime).locale("th").format("LLL") + " น."}</td>
                  <td>{moment(val.ot_finishtime).locale("th").format("LLL") + " น."}</td>
                  <td>{val.ot_apply}</td>
                  <td>{val.ot_rate}</td>
                  <td >
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
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
        </div>
      </Row>
    </Container>
  );
}

export default AdminOT;
