import HeroSection from "@/components/Layout/hero";
import React, { useEffect, useState } from "react";
import submissionService from "@/services/pengajuan";
import HomeGrafikLayout from "@/components/Layout/HomeGrafik";

const HomePage = () => {
  const [submission, setSubmission] = useState([]);
  
  useEffect(() => {
    const getSubmissions = async () => {
      if (Object.keys(submission).length === 0) {
        const { data } = await submissionService.getSubmission();
        setSubmission(data.data);
      }
    };
    getSubmissions();
  }, [submission]);

  return (
    <div>
      <HomeGrafikLayout submission={submission}/>
      <HeroSection />
    </div>
  );
};

export default HomePage;
