import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import "../App.css";
import images1 from '../images/act1.jpg';
import images2 from '../images/act2.jpg';
import images3 from '../images/act3.jpg';
import ActivityDesc from './Activity_Desc';



function Activity() {
  return (
    <Container>
      <h1 className='activity'>กิจกรรม</h1>
      <h4>นอกเหนือจากการดำเนินธุรกิจที่แข็งแกร่งแล้ว บริษัทฯได้มีส่วนร่วมรับผิดชอบต่อสังคมไทยในการเพิ่มคุณภาพชีวิต โดยการให้ความช่วยเหลือผู้ด้อยโอกาสทางการศึกษา </h4>
      <ReactStyle />
    </Container>
      
    
  );
}

function next(){
  return(
    alert("A")
  );
}

const ReactStyle = () => (
  <Container>
    <Row>
      <Col className='colact' sm>
      <Image style={{height: 200, width: '100%', objectFit: 'cover', marginBlock: '13px'}} alt= "" src={images1} />
      <h5 ><a href="./activityDesc">กิจกรรมทำบุญ บริษัท ประจำปี 2565</a></h5> 
      </Col>
      <Col className='colact' sm>
      <Image style={{height: 200, width: '100%', objectFit: 'cover', marginBlock: '13px'}} alt= "" src={images2} />
        <h5>กิจกรรมมอบทุนการศึกษา</h5>
      </Col>
      <Col className='colact' sm>
      <Image style={{height: 200, width: '100%', objectFit: 'cover', marginBlock: '13px'}} alt= "" src={images3} />
       <h5>จัดกีฬาสีประจำปีและงานสังสรรค์ประจำปี</h5> 
        </Col>
    </Row>
    <Row>
      <Col className='colact' sm >
      <Image style={{height: 200, width: '100%', objectFit: 'cover', marginBlock: '13px'}} alt= "" src={images2} />
        <h5>กิจกรรมฉลองปีใหม่</h5>
        </Col>
      <Col className='colact' sm >
      <Image style={{height: 200, width: '100%', objectFit: 'cover', marginBlock: '13px'}} alt= "" src={images3} />
        <h5>กิจกรรมตรวจสุขภาพประจำปี</h5>
        </Col>
      <Col className='colact' sm >
      <Image style={{height: 200, width: '100%', objectFit: 'cover', marginBlock: '13px'}} alt= "" src={images1} />
        <h5>กิจกรรมทาสีโรงเรียนในฝัน</h5>
        </Col>
    </Row>
  </Container>
);


export default Activity;