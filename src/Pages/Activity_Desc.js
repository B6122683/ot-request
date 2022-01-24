import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'
import "../App.css";
import images1 from '../images/act1.jpg';
import images2 from '../images/act2.jpg';
import images3 from '../images/act3.jpg';
import Button from "react-bootstrap/Button";

function ActivityDesc() {
    return (
      <Container>
    <div style={{ display: "flex", justifyContent: "left" }}>
        <Button variant="secondary" style={{margin: "20px"}}  onClick={() => (window.location.href = "/activity")} >ย้อนกลับ</Button>{" "}
      </div>
        <h1 className='activity'>กิจกรรมทำบุญ บริษัท ประจำปี 2565</h1>
        <h4 style={{ display: "flex", justifyContent: "center" }}>ร่วมทำบุญบริษัท ประจำปี 2565 <br/> ในวันที่ 30 ธันวาคม พ.ศ.2565 <br/>เวลา 8:00 น. เป็นต้นไป </h4>
        <ReactStyle />
      </Container>
        
      
    );
  }

  const ReactStyle = () => (
    <Container>
      <Row>

        <Image style={{height: '100%', width: '100%', objectFit: 'cover', margin: '5px'}} alt= "" src={images1} />
       
        
        </Row>
        </Container>
);


export default ActivityDesc;
  