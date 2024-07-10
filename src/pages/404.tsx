import { CircleSlash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>
        <p className="flex items-center gap-1 text-9xl">
          4
          <span>
            <CircleSlash2 color="#E63946" size={80} />
          </span>
          4
        </p>
      </div>
      <div className="flex">
        <p className="text-lg">
          <b>ERROR</b>, Page Not Found{" "}
          <span className="text-tertiary underline">
            <Link href={"/"}> Kembali Ke Beranda</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Custom404;
