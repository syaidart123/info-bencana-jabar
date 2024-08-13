import { listNavbar } from "@/utils/listNavbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="min-h-96 items-start bg-primary md:flex-row">
        <div className="container flex flex-col md:flex-row md:justify-evenly">
          <div className="mt-10 p-5 md:w-3/12">
            <Image
              src="/images/logo.png"
              loading="lazy"
              width={500}
              height={500}
              alt="Human Initiative"
              className="h-20 w-56 cursor-pointer rounded-lg bg-white p-1"
            />
            <p className="mt-5 text-white">
              Info Bencana JABAR adalah platform kolaboratif yang menghimpun
              berbagai lembaga kemanusiaan di Jawa Barat.
            </p>
          </div>
          <div className="p-5 text-white md:mt-10 md:w-3/12">
            <p className="mb-3 text-xl font-bold text-secondary">Tautan</p>
            <ul className="flex flex-col">
              {listNavbar.map((item, index) => (
                <Link key={index} href={item.link} className="my-1">
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>
          <div className="p-5 text-white md:mt-10 md:w-3/12">
            <p className="mb-3 text-xl font-bold text-secondary">Informasi</p>
            <div className="flex flex-col gap-2">
              <Link href={"http://www.bmkg.go.id/"}>Perkiraan Cuaca</Link>
              <Link href={"#about"}>Tentang Kami</Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-6/12 text-white" />
      <div className="flex flex-col items-center justify-center bg-primary py-5">
        <p className="text-white">
          &copy; {new Date().getFullYear()} Info Bencana Jawa Barat. All rights
          reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
