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

function Employee() {
  return (
    <Container>
      <h1 className="attendance">ข้อมูลพนักงาน</h1>
      <ReactStyle />
    </Container>
      
  
  );
}

const ReactStyle = () => (
  <Container>
    <div style={{ display: "flex", justifyContent: "center" }}>
    <form>
        <label style={{ margin: "10px" }}>
            ค้นหาจาก แผนก
            <input style={{ margin: "10px" , borderRadius: '5px'}} type="text" name="department" />
        </label>
        <label style={{ margin: "10px" }}>
            ตำแหน่ง
            <input style={{ margin: "10px", borderRadius: '5px' }} type="text" name="position" />
        </label>
        
    </form>
      </div>
    <Row>
    <div style={{ display: "flex", justifyContent: "right" }}>
    <Button variant="secondary" style={{margin: "0px"}}> เพิ่ม </Button>{" "}
    </div>
    <Table striped bordered hover>
  <thead>
    <tr className="trAdmin">
      <th>รหัสพนักงาน</th>
      <th>รูปภาพ</th>
      <th>ชื่อ-สกุล</th>
      <th>แผนก</th>
      <th>ตำแหน่ง</th>
      <th>จัดการ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tbody">
      <td>1001</td>
      <td></td>
      <td>อาภรณ์ สอนใจ</td>
      <td>การผลิต</td>
      <td>หัวหน้า</td>
      <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images2} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images3} />
      </td>
    </tr>
    <tr className="tbody">
      <td>1000</td>
      <td></td>
      <td>อาทิตย์ ชิดแสง</td>
      <td>ซ่อมบำรุง</td>
      <td>ช่างซ่อม</td>
      <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images2} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images3} />
      </td>
    </tr>
  </tbody>
</Table>
    </Row>
  </Container>
);


export default Employee;