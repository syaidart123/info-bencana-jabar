import React from 'react'
import {  Pie } from "react-chartjs-2";
import {Chart as ChartJS,Tooltip,Legend,ArcElement} from "chart.js"
ChartJS.register(Tooltip,Legend,ArcElement)

type propsTypes = {
  data:any;
  option?:any
}
const PieChart = (props:propsTypes) => {
  const {data,option}=props;
  return (
         <Pie data={data} options={option} />
  )

}

export default PieChart