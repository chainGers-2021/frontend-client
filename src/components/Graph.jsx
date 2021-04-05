import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Home.css";

const Graph = ({ className }) => {
  return (
    <div className={className}>
      <Line
        data={{
          labels: [
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
          ],
          datasets: [
            {
              label: "Trend",
              data: [
                200,
                230,
                540,
                310,
                400,
                300,
                210,
                300,
                220,
                110,
                310,
                450,
                200,
                230,
                540,
                310,
                400,
                300,
                210,
                300,
                220,
                110,
                310,
                450,
                200,
                230,
                540,
                310,
                400,
                300,
                210,
                300,
                220,
                110,
                310,
                450,
              ],
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
