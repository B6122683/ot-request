import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Activity.css";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import addimage from "../images/addimage.png";


function ActivityManagement() {
  const [images, setImages] = React.useState([]);
  const [act_name, setAct_name] = useState("");
  const [act_place, setAct_place] = useState("");
  const [act_time, setAct_time] = useState("");
  const [act_image, setAct_image] = useState("");
  const [act_date, setAct_date] = useState("");
  const [act_desc, setAct_desc] = useState("");

  const [activity, setActivity] = useState("");
  const [ActivityList, setActivityList] = useState([]);

  const Addactivity = () => {
    Axios.post("http://localhost:3333/activity", {
        act_name: act_name,
        act_place: act_place,
        act_date: act_date,
        act_time: act_time,
        act_image: act_image,
        act_desc: act_desc,
    }).then(() => {
        setActivityList({
            ...ActivityList,
            
                act_name: act_name,
                act_place: act_place,
                act_date: act_date,
                act_time: act_time,
                act_image: act_image,
                act_desc: act_desc,
        });
    });
  };


  return (
    <>
      <Container>
        <Row>
          <h1 className="addact">เพิ่มกิจกรรม</h1>
        </Row>
        <Container>
          <Row className="activity">
            <Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Image
                  style={{
                    height: 150,
                    objectFit: "cover",
                    marginBlock: "13px",
                  }}
                  alt=""
                  src={addimage}
                />
              </div>

              <Form.Group className="col-mb-12" controlId="formBasicTextInput">
                <Form.Label>ชื่อกิจกรรม</Form.Label>
                <Form.Control type="text" 
                placeholder="กรอกชื่อกิจกรรม"
                name = "act_name"
                onChange={(e) => {
                    setAct_name(e.target.value);
                  }} />
              </Form.Group>

            <Row className="col-mb-12 ">
                  <Form.Group className="col-md-6 col-12">
                <Form.Label>วันที่</Form.Label>
                <Form.Control type="date" 
                placeholder="เลือกวันที่" 
                name = "act_date"
                onChange={(e) => {
                    setAct_date(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="col-md-6 col-12">
                <Form.Label>เวลา</Form.Label>
                <Form.Control type="time" 
                placeholder="เลือกเวลา" 
                name = "act_time"
                onChange={(e) => {
                    setAct_time(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="col-mb-12" controlId="formBasicTextInput">
                <Form.Label>สถานที่</Form.Label>
                <Form.Control type="text" 
                placeholder="กรอกสถานที่" 
                name = "act_place"
                onChange={(e) => {
                    setAct_place(e.target.value);
                  }}/>
              </Form.Group>
            

              <Form.Group className="col-mb-12" controlId="formBasicTextInput">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control type="text" 
                placeholder="กรอกรายละเอียด" 
                name = "act_desc"
                onChange={(e) => {
                    setAct_desc(e.target.value);
                  }}/>
              </Form.Group>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Button variant="danger" style={{ margin: "10px" }}
                 onClick={() => (window.location.href = "/adminactivity")} >
                  ยกเลิก
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={Addactivity}
                  style={{ margin: "10px" }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      </Container>
    </>
  );
}


export default ActivityManagement;
