import AuthLayout from "@/components/Layout/auth";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { ToasterContext } from "@/context/ToasterContext";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const result = await authService.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setLoading(false);
        push("/auth/login");
        setToaster({ variant: "success", message: "Registrasi Berhasil" });
      } else {
        setLoading(false);
        setToaster({ variant: "danger", message: "Registrasi Gagal" });
      }
    } catch (error) {
      setLoading(false);
      setToaster({ variant: "danger", message: "Email Already Exist" });
    }
  };

  return (
    <AuthLayout
      title="Buat akun anda"
      linktext="Sudah punya akun? Login "
      link="/auth/login"
    >
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="fullname"
          maxLength={30}
          minLength={3}
          required
          className="focus:border-sky-500"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          maxLength={40}
          placeholder="email@gmail.com"
          required
          className="focus:border-sky-500"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          maxLength={40}
          placeholder="••••••"
          minLength={6}
          required
        />

        <Button
          type="submit"
          className={`w-full hover:bg-dark ${loading && "cursor-not-allowed"} bg-primary text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-sky-300`}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
