import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import FilterSelect from "@/components/Fragment/filterSelect";

const BeritaPageView = (props: any) => {
  const { posts } = props;
  const [postData, setPostData] = useState(posts);
  const [selectedBencana, setSelectedBencana] = useState("");
  const [daerah, setDaerah] = useState("");

  useEffect(() => {
    setPostData(posts);
  }, [posts]);
  return (
    <div className="min-h-svh pb-20 px-10">
      <div className="flex justify-center items-center">
        <p className="text-3xl font-bold my-10 from-teal-400 to-sky-600 border-b bg-gradient-to-r inline-block text-transparent bg-clip-text">
          Berita Kebencanaan
        </p>
      </div>
      <FilterSelect
        setSelectedBencana={setSelectedBencana}
        setSelectedDaerah={setDaerah}
      />

      <div className="w-full grid gap-5 xl:gap-y-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {postData.map((post: any) => (
          <Link
            key={post.id}
            className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition"
            href={`/berita/${post.id}`}
          >
            <Card post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BeritaPageView;
