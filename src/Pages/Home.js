import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "../App.css";
import PieChart from "../Components/PieCharts";
import ColumnChart from "../Components/ColumnChart";
import LineChart from "../Components/LineChart";
import Image from "react-bootstrap/Image";
import dash1 from "../images/001-user.png";
import dash2 from "../images/002-time-is-money.png";
import dash3 from "../images/003-calendar.png";

function Home() {
  const [role_id, setRole] = useState("");
  const [emp_name, setEmpName] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [allemp, setAllEmp] = useState("");
  const [allot, setAllOt] = useState("");
  const [allleave, setAllLeave] = useState("");
  const [otrequestcountList, setOtrequestcountList] = useState([]);
  const [leaveworkcountList, setLeaveWorkcountList] = useState([]);
  const [attencountList, setAttcountList] = useState([]);

  //Axios.defaults.withCredentials = true;
  const getAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("/authen", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        console.log(response);
        if (response.data.status == "ok") {
          setEmpId(response.data.decoded.user.emp_id);
          setRole(response.data.decoded.user.role_id);
          setEmpName(
            response.data.decoded.user.emp_firstname +
              " " +
              response.data.decoded.user.emp_surname
          );
        } else {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      });
    } else {
      window.location = "/login";
    }
  };

  const allempListCount = () => {
    Axios.get("http://localhost:3333/allemployeescount").then((response) => {
      setAllEmp(response.data[0].no_emp);
    });
  };

  const allOtCount = () => {
    Axios.get("http://localhost:3333/otrequestcountperweek").then(
      (response) => {
        setAllOt(response.data[0].no_otrequest);
      }
    );
  };

  const allLeaveCount = () => {
    Axios.get("http://localhost:3333/leaveworkcountperweek").then(
      (response) => {
        setAllLeave(response.data[0].no_leavework);
      }
    );
  };

  const otrequestcount = () => {
    Axios.post("http://localhost:3333/otrequestcount").then((response) => {
      setOtrequestcountList(response.data);
      console.log(response.data);
    });
  };

  const leaveworkcount = (e) => {
    Axios.post("http://localhost:3333/leaveworkcount").then((response) => {
      setLeaveWorkcountList(response.data);
    });
  };

  const attendancecountperweek = (e) => {
    Axios.post("http://localhost:3333/attendancecount2").then((response) => {
      setAttcountList(response.data);
    });
  };

  useEffect(() => {
    getAuth();
    allempListCount();
    allOtCount();
    allLeaveCount();
    otrequestcount();
    leaveworkcount();
    attendancecountperweek();
  }, []);

  return (
    <>
      {/* {role_id == 1 ? <NavbarAdmin /> : <Navbar />} */}
      <Container className="mb-5">
        <h1 className="home">สวัสดี คุณ {emp_name}</h1>
        {role_id == 1 && (
          <DashboardAdmin allemp={allemp} allot={allot} allleave={allleave} />
        )}
        {role_id == 2 && (
          <DashboardUser
            empid={emp_id}
            otcount={otrequestcountList}
            leavecount={leaveworkcountList}
            attcount={attencountList}
          />
        )}
        {role_id == 3 && (
          <DashboardSPAdmin allemp={allemp} allot={allot} allleave={allleave} />
        )}
      </Container>
    </>
  );
}

const DashboardSPAdmin = (props) => (
  <Container className="mb-3">
    <Row>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-one">
          จำนวนพนักงานทั้งหมด
          <Row className="col-md-12 col-12">
            <Col className="col-md-6 col-6">
              <h2>{props.allemp}</h2>
            </Col>
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash3}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      {/* <Col className="col-md-4 col-12 adminhome"><>ทำงานล่วงเวลาต่อเดือน</></Col> */}
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-two">
          คำขออนุมัติการขอโอที
          <Row className="col-md-12 col-12">
            <Col className="col-md-6 col-6">
              <h2>{props.allot}</h2>
            </Col>
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash2}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-three">
          คำขออนุมัติการลางาน
          <Row className="col-md-12 col-12">
            <Col className="col-md-6 col-6">
              <h2>{props.allleave}</h2>
            </Col>
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash1}
              />
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col className="col-md-6 col-12 my-2">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <ColumnChart />
      </Col>
      <Col className="col-md-12 col-12 my-2">
        <LineChart />
      </Col>
    </Row>
  </Container>
);

const DashboardAdmin = (props) => (
  <Container className="mb-3">
    <Row>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-one">
          จำนวนพนักงานทั้งหมด
          <Row className="col-md-12 col-12">
            <Col className="col-md-6 col-6">
              <h2>{props.allemp}</h2>
            </Col>
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash3}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      {/* <Col className="col-md-4 col-12 adminhome"><>ทำงานล่วงเวลาต่อเดือน</></Col> */}
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-two">
          คำขออนุมัติการขอโอที
          <Row className="col-md-12 col-12">
            <Col className="col-md-6 col-6">
              <h2>{props.allot}</h2>
            </Col>
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash2}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-three">
          คำขออนุมัติการลางาน
          <Row className="col-md-12 col-12">
            <Col className="col-md-6 col-6">
              <h2>{props.allleave}</h2>
            </Col>
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash1}
              />
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col className="col-md-12 col-12 my-2">
        <LineChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <ColumnChart />
      </Col>
    </Row>
  </Container>
);

const DashboardUser = (props) => (
  <Container className="mb-3">
    <Row>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-one">
          คำขอโอที
          <Row className="col-md-12 col-12">
            {props.otcount.map((val) => {
              return (
                <>
                  {val.emp_id == props.empid && (
                    <Col className="col-md-6 col-6">
                      <h2>{val.waiting}</h2>
                    </Col>
                  )}
                </>
              );
            })}
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash3}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-two">
          คำขอการลา
          <Row className="col-md-12 col-12">
            {props.leavecount.map((v) => {
              return (
                <>
                  {v.emp_id == props.empid && (
                    <Col className="col-md-6 col-6">
                      <h2>{v.waiting}</h2>
                    </Col>
                  )}
                </>
              );
            })}
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash2}
              />
            </Col>
          </Row>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-three">
          จำนวนวันเข้างาน
          <Row className="col-md-12 col-12">
            {props.attcount.map((v) => {
              return (
                <>
                  {v.emp_id == props.empid && (
                    <Col className="col-md-6 col-6">
                      <h2>{v.checkin}</h2>
                    </Col>
                  )}
                </>
              );
            })}
            <Col className="imgicon col-md-6 col-6">
              <Image
                style={{
                  width: "50px",
                  display: "flex",
                  justifyContent: "right",
                }}
                src={dash1}
              />
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
    {/* <Row>
      <Col className="col-md-6 col-12 my-2">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <ChartUser />
      </Col>
      <Col className="col-md-12 col-12 my-2">
        <LineChart />
      </Col>
    </Row> */}
  </Container>
);

export default Home;
