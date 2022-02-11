import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import Axios from "axios";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement);

function PieChart2() {
  const [employeeList, setEmployeeList] = useState([]);
  const empList = () => {
    Axios.get("http://localhost:3333/employeesview").then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    empList();
  }, []);

  
  var data = {
    labels: employeeList?.map((x) => x.dep_name),
    datasets: [
      {
        label: `${employeeList?.dep_id?.length} Coins Available`,
        data: employeeList?.map((x) => x.dep_name),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Bar data={data} height={400} options={options} />
    </div>
  );
}

export default PieChart2;
