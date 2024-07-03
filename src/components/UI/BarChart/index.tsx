import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  BarElement,
  Title,
  CategoryScale,
  LinearScale,
);

type propsTypes = {
  data: any;
  options?: any;
};
const BarChart = (props: propsTypes) => {
  const { data, options } = props;

  return <Bar data={data} options={options} />;
};

export default BarChart;
