import { CircleSlash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Custom500 = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>
        <p className="flex items-center gap-1 text-9xl">500</p>
      </div>
      <div className="flex">
        <p className="text-lg">
          <b>ERROR</b>, Internal Server Error{" "}
          <span className="text-tertiary underline">
            <Link href={"/"}> Kembali Ke Beranda</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Custom500;
