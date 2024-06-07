import {  CalendarClock } from "lucide-react";
import Image from "next/image";
import React from "react";

const Card = (props: any) => {
  const { post } = props;

  return (
    <div>
      <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
        <Image
          width={700}
          height={700}
          className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
          src={post.image}
          alt="post"
        />
      </div>
      <div className="p-4 md:p-5 flex flex-col gap-2">
      <p className="text-sky-500 font-medium">{post.daerah}</p>
      <div className="flex gap-2">
        <CalendarClock color="gray" />
        <p className="font-medium text-gray-400">{post.tanggal}</p>
      </div>
        <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
      </div>
    </div>
  );
};

export default Card;
