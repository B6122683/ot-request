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
      <h1 className="attendance">จัดการสิทธิ์การใช้งาน</h1>
      <ReactStyle />
    </Container>
      
  
  );
}

const ReactStyle = () => (
  <Container>
    <div style={{ display: "flex", justifyContent: "center" }}>
    <form>
    <label style={{ margin: "10px" }} for="permission">เลือกบทบาท</label>
        <select style={{ borderRadius: '5px', width: '150px'}} id="permission" name="rolse" form="carform">
        <option value="admin">ผู้ดูแลระบบ</option>
        <option value="user">ผู้ใช้งาน</option>
        </select>
       
    </form>
      </div>
    <Row>
    <div style={{ display: "flex", justifyContent: "right" }}>
    <Button variant="secondary" style={{margin: "0px"}}> เพิ่มเมนู </Button>{" "}
    </div>
    <Table striped bordered hover>
  <thead>
    <tr className="trAdmin">
      <th>รหัสเมนู</th>
      <th>ชื่อเมนู</th>
      <th>ดู</th>
      <th>เพิ่ม</th>
      <th>ลบ</th>
      <th>แก้ไข</th>
      <th>จัดการ</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tbody">
      <td>001</td>
      <td>ข้อมูลพนักงาน</td>
      <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
        <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
        <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
        <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
      <td> 
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
      <Image style={{height: 30, width: 30, objectFit: 'cover', margin: '5px'}} alt= "" src={images3} />
      </td>
    </tr>
    <tr className="tbody">
      <td>002</td>
      <td>ข้อมูลแผนก</td>
      <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
        <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
        <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
        <td><form>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </form>
        </td>
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


export default Employee;