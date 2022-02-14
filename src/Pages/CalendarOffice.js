import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import Button from "react-bootstrap/Button";
import FullCal from "../Components/FullCalendar";
import BigCalendar from "./Bigcaledar";

function CalendarOffice() {
  return (
    <>
      <Container>
        <h1 className="leave">ปฏิทินบริษัท</h1>
      </Container>

      <Container>
        <Row>
          <div
            style={{
              marginBottom: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Col
              className="col-md-10"
              style={{ alignItems: "center", height: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginBottom: "10px",
                }}
              >
                <Button variant="secondary">เพิ่มวันหยุด</Button>{" "}
              </div>
              <BigCalendar />
            </Col>
          </div>
        </Row>
        {/* <div style={{ marginBottom: "50px" }}>
            <FullCal />
          </div> */}
      </Container>
    </>
  );
}

export default CalendarOffice;
