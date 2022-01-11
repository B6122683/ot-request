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

function Department() {
  return (
    <Container>
      <h1 className="attendance">ข้อมูลแผนก</h1>
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
      <th>รหัสแผนก</th>
      <th>ชื่อแผนก</th>
      <th>จัดการ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tbody">
      <td>DEP011</td>
      <td>การผลิต</td>
      <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images3} />
      </td>
    </tr>
    <tr className="tbody">
      <td>DEP010</td>
      <td>ซ่อมบำรุง</td>
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


export default Department;