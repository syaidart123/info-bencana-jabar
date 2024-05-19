"use client";
import Button from "@/components/UI/Button";
import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type propsTypes = {
  children: React.ReactNode;
  title: string;
  linktext: string;
  link: string;
};

const AuthLayout = (props: propsTypes) => {
  const { children, title, linktext, link } = props;
  const { push } = useRouter();

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-6 h-screen">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className=" p-6 space-y-4 md:space-y-3 sm:p-8">
            <Button type="button" className="border" onClick={() => push("/")}>
              <Home color="gray" />
            </Button>
            <p className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {title}
            </p>
            {children}
            <p className="text-sm font-light text-gray-500 ">
              {linktext}
              <Link
                href={link}
                className="font-medium text-primary-600 hover:underline"
              >
                Disini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
