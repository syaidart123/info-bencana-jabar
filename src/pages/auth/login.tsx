import LoginPage from "@/components/Page/login";
import Head from "next/head";
import React from "react";

const LoginPages = () => {
  return (
    <>
      <Head>
        <title>Login | Info Bencana Jabar</title>
      </Head>
      <LoginPage />
    </>
  );
};

export default LoginPages;
