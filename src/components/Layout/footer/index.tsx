"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex h-96 items-start justify-around bg-sky-600">
        <div className="mt-10 w-3/12 p-5">
          <Image
            src="/images/hi.png"
            width={500}
            height={500}
            alt="Human Initiative"
            className="h-10 w-24 cursor-pointer rounded-lg bg-white p-1"
          />
          <p className="mt-5 text-white">
            Human Initiative adalah Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quis, quam?
          </p>
        </div>
        <div className="mt-10 w-3/12 p-5 text-white">
          <p className="text-xl font-bold text-slate-900">Tautan</p>
          <ul className="mt-5 flex flex-col">
            <Link href="/">Home</Link>
            <Link href="/Tentang Kami">Tentang Kami</Link>
            <Link href="/Informasi Bencana">Informasi Bencana</Link>
          </ul>
        </div>
        <div className="mt-10 w-3/12 p-5 text-white">
          <p className="mb-5 text-xl font-bold text-slate-950">Kontak</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            voluptates.
          </p>
        </div>
      </div>
      <hr className="w-6/12 text-white" />
      <div className="flex flex-col items-center justify-center bg-sky-600 py-5">
        <p className="text-white">
          &copy; {new Date().getFullYear()} Info Bencana
        </p>
      </div>
    </>
  );
};

export default Footer;
