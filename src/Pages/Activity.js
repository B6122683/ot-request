import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./Activity.css";
import images1 from "../images/act1.jpg";
import images2 from "../images/act2.jpg";
import images3 from "../images/act3.jpg";
import ActivityDesc from "./Activity_Desc";
import Axios from "axios";
import { Link } from "react-router-dom";
import CardReactFormContainer from "card-react";
import { Card } from "react-bootstrap";

function ReadMore({ children, maxCharacterCount = 100 }) {
  const text = children;

  const [isTruncated, setIsTruncated] = useState(true);

  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  return (
    <p className="has-text-left">
      {resultString}
      <span onClick={toggleIsTruncated} className="tag is-info is-small">
        {isTruncated ? (
          <Image
            style={{ width: "30px", objectFit: "cover", marginBlock: "13px" }}
            src="https://cdn-user-icons.flaticon.com/62088/62088061/1643356149787.svg?token=exp=1643357051~hmac=29b4cf97137927c71c1a649b802844f1"
          />
        ) : (
          <Image
            style={{
              width: "30px",
              objectFit: "cover",
              marginBlock: "30px",
              margin: "10px",
            }}
            src="https://cdn-user-icons.flaticon.com/62088/62088061/1643356100870.svg?token=exp=1643357002~hmac=ffe71ce06b3e681868cfc320438cf5a4"
          />
        )}
      </span>
    </p>
  );
}

function Activity(props) {
  const [activityList, setActivityList] = useState([]);

  const activity = () => {
    Axios.get("http://localhost:3333/activity").then((response) => {
      setActivityList(response.data);
    });
  };

  useEffect(() => {
    activity();
  }, []);

  return (
    <Container className="mb-5">
      <div className="header">
        <span className="header-title">กิจกรรม</span>
        <br />
        <span className="header-text">ส่งเสริมพนักงานให้มีความสุขในการทำงาน...</span>
      </div>

      <div className="section bg-grey">
        <div className="small-div">
          <i className="section"></i>
        </div>

        <div className="big-div">
          <span className="div-title">
            <a>About the Company</a>
          </span>
          <br />
          <span>
            <ReadMore maxCharacterCount={200}>
              บริษัทของเราไม่เพียงแค่มุ่งเน้นในการสร้างธุรกิจที่แข็งแกร่ง
              แต่ยังมีกิจกรรมที่ให้พนักงานได้มีส่วนร่วมรับผิดชอบต่อสังคมไทยในการเพิ่มคุณภาพชีวิต
              โดยการให้ความช่วยเหลือผู้ด้อยโอกาสทางการศึกษา
              ด้วยการมอบทุนการศึกษาและอุปกรณ์การเรียนให้แก่นักเรียนที่กำลังศึกษาอยู่ในระดับชั้นอบุบาลและชั้นประถมศึกษา
              ตลอดจนการให้ความช่วยเหลือด้านการศึกษาแก่เด็กยากจนในชนบทและพื้นที่ห่างไกล
              และการจัดกิจกรรมวันปีใหม่เพื่อให้พนักงานได้ผ่อนคลายจากการทำงาน
              ได้แลกของขวัญและสังสรรค์กัน
              อีกทั้งยังมีกิจกรรมกีฬาสีเพื่อให้พนักงานได้ออกกำลังกาย
              เพื่อประสิทธิภาพในการทำงานที่ยาวนาน ยั่งยืน และมีความสุข
              อีกทั้งยังทำให้พนักงานได้กระชับความสัมพันธ์ซึ่งกันและกันได้รู้จักการให้อภัย
              มีน้ำใจต่อเพื่อนร่วมงานส่งเสริมศักยภาพให้มีชีวิตที่ยั่งยืน
            </ReadMore>
          </span>
        </div>
      </div>


      <Row className="col-mb-12 col-md-12 act-content">
        {activityList.map((val) => {
          return (
            <div className="card-container mb-5">
              <Link
                to={`/activitydesc/${val.act_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="image-container">
                  <Image src={val.act_image} />
                </div>
                <div className="card-content">
                  <div className="card-title">
                    <h3>{val.act_name}</h3>
                  </div>
                  <div className="card-body">
                    <p>{val.act_desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Row>

      <div style={{ margin: "20px" }}></div>
    </Container>
  );
}

function next() {
  return alert("A");
}

export default Activity;
