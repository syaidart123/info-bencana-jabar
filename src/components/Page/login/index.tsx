import AuthLayout from "@/components/Layout/auth";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { ToasterContext } from "@/context/ToasterContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { query, push } = router;
  const { setToaster } = useContext(ToasterContext);
  const callbackUrl: string = (query.callbackUrl as string) || "/";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.status === 200) {
        if (callbackUrl === `${process.env.NEXT_PUBLIC_API_URL}/lapor`) {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set("redirect", callbackUrl);
          window.location.href = currentUrl.toString();
        } else if (callbackUrl === `/`) {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set("redirect", callbackUrl);
          window.location.href = currentUrl.toString();
        } else {
          push(callbackUrl);
        }
        setToaster({ variant: "success", message: "Login Berhasil" });
      } else {
        setToaster({ variant: "danger", message: "Password atau Email salah" });
      }
    } catch (error) {
      setToaster({ variant: "danger", message: "Login Gagal" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Masuk ke akun anda"
      linktext="Belum punya akun? Register "
      link="/auth/register"
    >
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="email@gmail.com"
            required={true}
            className="focus:border-sky-500"
            autoFocus
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
          className={`w-full hover:bg-dark ${loading && "cursor-not-allowed"} bg-primary text-center font-medium text-white focus:ring-sky-300`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
      <Button
        onClick={() => signIn("google", { callbackUrl, redirect: false })}
        type="button"
        className="w-full border"
      >
        <div className="flex items-center justify-center gap-2 rounded-md border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <p> Login with Google</p>
        </div>
      </Button>
    </AuthLayout>
  );
};

export default LoginPage;
