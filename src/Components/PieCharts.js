import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Chart } from "react-google-charts";

function PieChart() {
  const [employeeList, setEmployeeList] = useState([]);

  const empList = () => {
    Axios.get("http://localhost:3333/employeescount").then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });
  };

  const options = {
    title: "จำนวนพนักงาน",
  };

  useEffect(() => {
    empList();
  }, []);

  return (
    <Chart
      chartType="PieChart"
      data={[
        ['ชื่อแผนก', 'จำนวนพนักงาน'],
        ...employeeList.map(d => [ d.department_name, d.no_emp ])
      ]}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default PieChart;
