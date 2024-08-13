import React from "react";
import HomeGrafikLayout from "@/components/Layout/HomeGrafik";
import AboutSection from "@/components/Layout/about";

const HomePage = ({ submission }: any) => {
  return (
    <main>
      <HomeGrafikLayout submission={submission} />
      <div id="about">
        <AboutSection />
      </div>
    </main>
  );
};

export default HomePage;
