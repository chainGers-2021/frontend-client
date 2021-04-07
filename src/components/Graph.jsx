import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Home.css";

const Graph = ({ className, xAxis, yAxis }) => {
  return (
    <div className={className}>
      <Line
        data={{
          labels: xAxis,
          datasets: [
            {
              label: "Trend",
              data: yAxis,
              backgroundColor: "#79d1e549",
              borderColor: "#79d2e5",
              borderWidth: 1,
              lineTension: 0.3,
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Graph;
