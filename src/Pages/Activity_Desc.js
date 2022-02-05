import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Card, Button, Modal, Form, Table, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "./Activity.css";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment/min/moment-with-locales";

function ActivityDesc() {
  const [activityList, setActivityList] = useState([]);
  const { act_id } = useParams();

  const activity = () => {
    Axios.get(`http://localhost:3333/activity/${act_id}`).then((response) => {
      setActivityList(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    activity();
  }, []);

  return (
    <Container>
      {activityList.map((val) => {
        return (
          <div className="actpadding">
            <h1 className="desctitle">{val.act_name}</h1>
            <Card className="bord">
                  <Row className="col-md-12" >
                  <Col className="col-12">
                    <Form.Group controlId="formBasicTextInput" >
                    <Form.Group controlId="formBasicTextInput" style={{display: "flex", justifyContent: "center"}}>
                      <Form.Label>สถานที่ : </Form.Label>
                      <p style={{marginTop: "10px",display: "flex", justifyContent: "center"}}>{val.act_place}</p>
                      <Form.Label>ในวันที่ : </Form.Label>
                      <p style={{marginTop: "10px",display: "flex", justifyContent: "center"}}>
                      {moment(val.act_date).locale("th").format("LL")}
                      </p>
                    </Form.Group>
                    <Form.Group controlId="formBasicTextInput" style={{display: "flex", justifyContent: "center"}}>
                      <Form.Label>เวลา : </Form.Label>
                      <p style={{marginTop: "10px",display: "flex", justifyContent: "center"}}>
                        {moment(val.act_time).locale("th").format("LT") + " น."}
                        </p>
                    </Form.Group>
                    <Form.Group controlId="formBasicTextInput" style={{display: "flex", justifyContent: "center"}}>
                      <p style={{marginTop: "10px",display: "flex", justifyContent: "center"}}>{val.act_desc}</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicTextInput" style={{ marginTop: "30px", display: "flex", justifyContent: "center" }} >
                    <Image 
                          style={{width: "50%", height: "100%"}}
                          class="desc_image"
                          src={`http://localhost:3333/${val.act_image}`}
                        />
                        </Form.Group>
                  </Form.Group>
                

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="danger"
                        onClick={() => (window.location.href = "/activity")}
                        style={{ margin: "10px" }}
                      >
                        ย้อนกลับ
                      </Button>
                    </div>
                    
                    </Col>
                  </Row>
            </Card>
          </div>
        );
      })}
    </Container>
  );
}

export default ActivityDesc;
