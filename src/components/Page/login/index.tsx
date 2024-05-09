import AuthLayout from "@/components/Layout/auth";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { query, push } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!response?.error) {
        form.reset();
        setLoading(false);
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("Email or Password Incorrect");
      }
    } catch (error) {
      setLoading(false);
      setError("Email or Password Incorrect");
    }
  };

  return (
    <AuthLayout
      title="Masuk ke akun anda"
      linktext="Belum punya akun? Register "
      link="/auth/register"
    >
      <p className="text-red-500 text-center">{error}</p>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="email@gmail.com"
            required={true}
            className=" focus:border-sky-500"
          />
        </div>
        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••"
            required={true}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-white bg-sky-600 focus:ring-4 hover:bg-sky-700 focus:outline-none focus:ring-sky-300 font-medium text-center"
        >
          {loading?"Loading":"Login"}
        </Button>
      </form>
      <Button onClick={()=>signIn("google",{redirect:false})} type="button" className="w-full border"><i className='bx bxl-google'></i>Google</Button>
    </AuthLayout>
  );
};

export default LoginPage;
