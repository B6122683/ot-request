import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import * as GrIcons from 'react-icons/gr';
import "../App.css";

function OTRequest() {
  return (
    <Container>
      <h1 className="otrequest">แจ้งคำขอทำงานล่วงเวลา​</h1>
      <ReactStyle />
    </Container>
      
  
  );
}

const ReactStyle = () => (
  <Container>
    <Row>
      <Col sm>รออนุมัติ 
      <h1 className="request">1 <h3 className="list"> รายการ</h3></h1>
     
      </Col>
      <Col sm>เสร็จสิ้น
      <h1 className="request">1 <h3 className="list"> รายการ</h3></h1>
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
  <tbody>
    <tr>
      <td>1</td>
      <td>บำรุงรักษาสินค้า</td>
      <td>การผลิต</td>
      <td>อา. 26 พ.ย. 2565 (8:30)</td>
      <td>อา. 26 พ.ย. 2565 (11:30)</td>
      <td>5</td>
      <td>เปิดรับ</td>
    </tr>
    <tr>
      <td>2</td>
      <td>ซ่อมบำรุงเครื่องจักร</td>
      <td>ซ่อมบำรุง</td>
      <td>จ. 27 พ.ย. 2565 (20:30)</td>
      <td>จ. 27 พ.ย. 2565 (00:00)</td>
      <td>7</td>
      <td>ปิด</td>
    </tr>
    <tr>
      <td>3</td>
      <td>ปรับปรุงระบบชลประทาน</td>
      <td>วิศวกรรม</td>
      <td>พ. 29 พ.ย. 2565 (8:30)</td>
      <td>พ. 29 พ.ย. 2565 (11:30)</td>
      <td>2</td>
      <td>เปิดรับ</td>
    </tr>
  </tbody>
</Table>
    </Row>
  </Container>
);

export default OTRequest;