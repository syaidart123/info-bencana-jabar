import HeroSection from "@/components/Layout/hero";
import React, { useEffect, useState } from "react";
import submissionService from "@/services/submission";
import HomeGrafikLayout from "@/components/Layout/HomeGrafik";

const HomePage = ({submission}:any) => {
  // const [submission, setSubmission] = useState([]);

  // const getSubmissions = async () => {
  //   const { data } = await submissionService.getSubmission();
  //   setSubmission(data.data);
  // };

  // useEffect(() => {
  //   getSubmissions();
  // }, []);

  return (
    <div>
      <HomeGrafikLayout submission={submission} />
      <HeroSection />
    </div>
  );
};

export default HomePage;
