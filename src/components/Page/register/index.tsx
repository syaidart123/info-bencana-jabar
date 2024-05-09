"use client";
import AuthLayout from "@/components/Layout/auth";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const {push} = useRouter();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const result = await authService.registerAccount(data);
      if(result.status === 200){
        form.reset()
        setLoading(false);
        push("/auth/login");
      }else{
        setLoading(false);
        setError("Email Already Exist");
      }
    } catch (error) {
      setLoading(false);
      setError("Email Already Exist");
      console.log(error);
      
    }
  };

  return (
    <AuthLayout
      title="Buat akun anda"
      linktext="Sudah punya akun? Login "
      link="/auth/login"
    >
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <p className="text-red-500 text-center">{error}</p>
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="fullname"
          required={true}
          className=" focus:border-sky-500"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@gmail.com"
          required={true}
          className=" focus:border-sky-500"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••"
          required={true}
        />
        

        <Button
          type="submit"
          className="w-full text-white bg-sky-600 focus:ring-4 hover:bg-sky-700 focus:outline-none focus:ring-sky-300 font-medium text-center"
        >
          {loading ? "Loading...":"Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
