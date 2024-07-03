import Button from "@/components/UI/Button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex h-screen items-center justify-around">
      <div className="w-6/12 px-10">
        <p className="mb-5 text-3xl font-bold">
          Tangan yang Menyentuh,Hati yang Peduli.
        </p>
        <p className="mb-5 text-lg">
          Bersama-sama Memperkuat Kebangkitan di Tengah Bencana
        </p>
        <Button type="button" className="bg-sky-500 p-5 text-white">
          Selengkapnya
        </Button>
      </div>
      <div className="w-6/12 px-10">
        <Image
          src="/images/hero.jpg"
          width={500}
          height={500}
          alt="Hero"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};
export default HeroSection;
