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
import images2 from '../images/view.png';
import images3 from '../images/delete.png';

function OTManagement() {
  return (
    <Container>
      <h1 className="attendance">จัดการคำขอ OT</h1>
      <ReactStyle />
    </Container>
      
  
  );
}

const ReactStyle = () => (
  <Container>
    <div style={{ display: "flex", justifyContent: "center" }}>
      </div>
    <Row>
    <Table striped bordered hover>
  <thead>
    <tr className="trAdmin">
      <th></th>
      <th>รหัสคำขอ</th>
      <th>ชื่อ-สกุล</th>
      <th>ชื่องาน</th>
      <th>วันที่ทำ OT</th>
      <th>สถานะ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tbody">
    <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images2} />
      </td>
      <td>OT100</td>
      <td>อาภรณ์ สอนใจ</td>
      <td>บำรุงรักษาสินค้า</td>
      <td>29 พ.ย. 2565</td>
      <td><Button variant="warning" style={{margin: "0px"}}> รออนุมัติ </Button>{" "}</td>
    </tr>
    <tr className="tbody">
    <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images2} />
      </td>
      <td>OT100</td>
      <td>อาทิตย์ ชิดแสง</td>
      <td>ซ่อมบำรุงเครื่องจักร</td>
      <td>25 พ.ย. 2565</td>
      <td ><Button variant="danger" style={{margin: "0px"}}> ไม่อนุมัติ </Button>{" "}</td>

    </tr>
  </tbody>
</Table>
    </Row>
  </Container>
);


export default OTManagement;