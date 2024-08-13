import { CalendarClock } from "lucide-react";
import Image from "next/image";
import React from "react";

const Card = (props: any) => {
  const { post } = props;

  return (
    <div>
      <div className="relative overflow-hidden rounded-t-xl pt-[50%] sm:pt-[60%] lg:pt-[80%]">
        <Image
          width={700}
          height={700}
          className="absolute start-0 top-0 size-full rounded-t-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          src={post.image}
          alt="post"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 p-4 md:p-5">
        <p className="font-medium text-primary">{post.daerah}</p>
        <div className="flex gap-2">
          <CalendarClock color="gray" />
          <p className="font-medium text-gray-400">{post.tanggal}</p>
        </div>
        <h3 className="text-xl font-bold text-gray-700">{post.title}</h3>
      </div>
    </div>
  );
};

export default Card;
