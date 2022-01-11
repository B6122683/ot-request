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
import act1 from '../images/act1.jpg';
import act2 from '../images/act2.jpg';


function AdminActivity() {
  return (
    <Container>
      <h1 className="attendance">กิจกรรม</h1>
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
      <th>รหัสกิจกรรม</th>
      <th>รูปภาพ</th>
      <th>ชื่อกิจกรรม</th>
      <th>รายละเอียด</th>
      <th>จัดการ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tbody">
      <td>ACT060</td>
      <td><Image style={{height: 100, width: '100%', objectFit: 'cover', margin: '5px'}} alt= "" src={act1} /></td>
      <td>กิจกรรมทำบุญ บริษัท ประจำปี 2565</td>
      <td>ร่วมทำบุญบริษัท ประจำปี 2565 ในวันที่ 30 ธันวาคม พ.ศ.2565 เวลา 8:00 น. เป็นต้นไป</td>
      <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images2} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images3} />
      </td>
    </tr>
    <tr className="tbody">
      <td>ACT059</td>
      <td><Image style={{height: 100, width:'100%', objectFit: 'cover', margin: '5px'}} alt= "" src={act2} /></td>
      <td>กิจกรรมมอบทุนการศึกษา</td>
      <td>ร่วมกันทำกิจกรรมเพื่อน้อง มอบทุนการศึกษา ณ โรงเรียนโคกยาว จังหวัดสุรินทร์</td>
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


export default AdminActivity;