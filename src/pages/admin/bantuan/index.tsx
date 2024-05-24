import AidAdminView from "@/components/Page/Admin/AidAdminView";
import aidService from "@/services/aid";
import React, { useEffect, useState } from "react";

const AidAdminPage = () => {
  const [dataAid, setDataAid] = useState([]);
  
  const getAllAids = async () => {
    const { data } = await aidService.getAid();
    setDataAid(data.data);
  };
  useEffect(() => {
    getAllAids();
  },[])
  return <AidAdminView dataAid={dataAid} />;
};

export default AidAdminPage;
