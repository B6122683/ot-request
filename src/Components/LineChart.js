import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Chart } from "react-google-charts";

function LineChart() {
  const [leaveList, setLeaveList] = useState([]);

  const empList = () => {
    Axios.get("http://localhost:3333/leavecountbyname").then((response) => {
      setLeaveList(response.data);
    });
  };

  const options = {
    title: "จำนวนการลางานต่อประเภทการลา",
    curveType: "function",
    legend: { position: "bottom" },
  };

  useEffect(() => {
    empList();
  }, []);

  return (
    <Chart
      chartType="LineChart"
      data={[
        ["ประเภทการลา", "จำนวนการลา", { role: "style" }],
        ...leaveList.map((d) => [
          d.leavetype_name,
          d.no_emp,
          "color: #000000",
        ]),
      ]}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default LineChart;
