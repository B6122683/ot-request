import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";

function LeaveManagement() {
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
              <td>L001</td>
              <td>อาภรณ์ สอนใจ</td>
              <td>ไอที</td>
              <td>ลาป่วย</td>
              <td>29 พ.ย. 2565</td>
              <td>
                <Button variant="warning" style={{ margin: "0px" }}>
                  {" "}
                  รออนุมัติ{" "}
                </Button>{" "}
              </td>
            </tr>
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
              <td>L002</td>
              <td>อาทิตย์ ชิดแสง</td>
              <td>วิศวกรรม</td>
              <td>ลากิจ</td>
              <td>25 พ.ย. 2565</td>
              <td>
                <Button variant="danger" style={{ margin: "0px" }}>
                  {" "}
                  ไม่อนุมัติ{" "}
                </Button>{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default LeaveManagement;
