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
      <div className="flex h-screen flex-col items-center justify-center px-6 py-6">
        <div className="w-full rounded-lg border bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-3">
            <Button type="button" className="border" onClick={() => push("/")}>
              <Home color="gray" />
            </Button>
            <p className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {title}
            </p>
            {children}
            <p className="text-sm font-light text-gray-500">
              {linktext}
              <Link
                href={link}
                className="text-primary-600 font-medium hover:underline"
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
