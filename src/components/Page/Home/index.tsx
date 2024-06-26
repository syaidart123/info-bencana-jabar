import React, { useEffect, useState } from "react";
import HomeGrafikLayout from "@/components/Layout/HomeGrafik";

const HomePage = ({ submission }: any) => {
  return (
    <div>
      <HomeGrafikLayout submission={submission} />
    </div>
  );
};

export default HomePage;
