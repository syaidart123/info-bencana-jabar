import DashboardLayout from "@/components/Layout/DashboardLayout";
import BarChart from "@/components/UI/BarChart";
import PieChart from "@/components/UI/PieChart";
import React from "react";


const DashboardAdminView = () => {
  const dataPie={
    labels:["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"],
    datasets:[{
      label:"hari",
      data:[1,2,3,4,5,6,7],
      backgroundColor:['red','green','blue','yellow','orange','purple','black'],
      hoverOffset:4
    }]
  }
  const data = {
    labels:["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"],
    datasets:[
        {
            label:"Hari",
            data:[1,2,3,4,5,6,7],
            backgroundColor:['red','green','blue','yellow','orange','purple','black'],
            borderColor:['red','green','blue','yellow','orange','purple','black'],
            borderWidth:1
        }
    ]
}
const option = {
    
}
  return (
    <DashboardLayout type="Admin">
      <p>Admin</p>
      <div className="absolute bg-red-200  flex items-center justify-center">
        <PieChart data={dataPie}/>
      </div>
      <BarChart data={data}/>
    </DashboardLayout>
  );
};

export default DashboardAdminView;
