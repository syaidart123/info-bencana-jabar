"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full h-96 bg-sky-600 flex justify-around items-start px-5">
        <div className="mt-10 w-3/12 p-5 ">
          <Image
            src="/images/hi.png"
            width={500}
            height={500}
            alt="Human Initiative"
            className="w-24 h-10 cursor-pointer bg-white rounded-lg p-1"
          />
          <p className="mt-5 text-white">
            Human Initiative adalah Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quis, quam?
          </p>
        </div>
        <div className="mt-10 w-3/12 text-white p-5">
          <p className="font-bold text-slate-900 text-xl">Tautan</p>
          <ul className="flex flex-col mt-5">
            <Link href="/">Home</Link>
            <Link href="/Tentang Kami">Tentang Kami</Link>
            <Link href="/Informasi Bencana">Informasi Bencana</Link>
          </ul>
        </div>
        <div className="mt-10 w-3/12 text-white p-5">
          <p className="mb-5 font-bold text-slate-950 text-xl">Kontak</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            voluptates.
          </p>
        </div>
      </div>
      <hr className="text-white w-6/12" />
      <div className=" bg-sky-600 py-5 flex justify-center items-center flex-col">
        <p className="text-white">
           &copy; {new Date().getFullYear()} Info Bencana
        </p>
      </div>
    </>
  );
};

export default Footer;
