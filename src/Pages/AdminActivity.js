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
import act1 from "../images/act1.jpg";
import act2 from "../images/act2.jpg";
import Axios from "axios";

function AdminActivity() {
  const [activityList, setActivityList] = useState([]);

  const activity = () => {
    Axios.get("http://localhost:3333/activity").then((response) => {
      setActivityList(response.data);
    });
  };

  useEffect(() => {
    activity();
  }, []);

  return (
    <Container>
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
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th>รหัสกิจกรรม</th>
              <th>รูปภาพ</th>
              <th>ชื่อกิจกรรม</th>
              <th>รายละเอียด</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          {activityList.map((val) => {
            return (
              <tbody>
                <tr className="tbody">
                  <td>{val.act_id}</td>
                  <td>
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        display: "block",
                      }}
                     alt=""
                      scr={`localhost:3333/${val.act_image}`}
                    />
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
                    />
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
      </Row>
    </Container>
  );
}

export default AdminActivity;
