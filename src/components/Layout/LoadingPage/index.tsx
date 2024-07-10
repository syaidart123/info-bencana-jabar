import { LoaderCircle } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="animate-spin" color="#457b9d" size={50} />
    </div>
  );
};

export default LoadingPage;
