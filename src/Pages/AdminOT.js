import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as GrIcons from 'react-icons/gr';
import "../App.css";
import Image from 'react-bootstrap/Image';
import images1 from '../images/edit.png';
import images2 from '../images/visible.png';
import images3 from '../images/delete.png';



function AdminOT() {
  return (
    <Container>
      <h1 className="attendance">จัดการข้อมูล OT</h1>
      <ReactStyle />
    </Container>
      
  
  );
}

const ReactStyle = () => (
  <Container>
    <div style={{ display: "flex", justifyContent: "center" }}>
      </div>
    <Row>
    <div style={{ display: "flex", justifyContent: "right" }}>
    <Button variant="secondary" style={{margin: "0px"}}> เพิ่ม </Button>{" "}
    </div>
    <Table striped bordered hover>
  <thead>
    <tr className="trAdmin">
      <th>รหัสงาน</th>
      <th>ชื่องาน</th>
      <th>แผนก</th>
      <th>รายละเอียด</th>
      <th>วัน/เวลา เริ่ม</th>
      <th>วัน/เวลา สิ้นสุด</th>
      <th>รวมเวลา OT</th>
      <th>จำนวนที่รับ</th>
      <th>ค่าตอบแทน</th>
      <th>จัดการ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tbody">
      <td>OT001</td>
      <td>บำรุงรักษาสินค้า</td>
      <td>การผลิต</td>
      <td>ดูแลสินค้าเพื่อไม่ให้สินค้าเกิด</td>
      <td>26 พ.ย. 2565 8:30</td>
      <td>26 พ.ย. 2565  11:30</td>
      <td>3</td>
      <td>5</td>
      <td>300</td>
      <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images3} />
      </td>
    </tr>

  </tbody>
</Table>
    </Row>
  </Container>
);


export default AdminOT;