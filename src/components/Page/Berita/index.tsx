import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const BeritaPageView = (props: any) => {
  const { posts } = props;
  const [postData, setPostData] = useState(posts);

  useEffect(() => {
    setPostData(posts);
  }, [posts]);
  return (
    
      <div className="w-svw min-h-svh pb-20 px-10">

        <div className="flex justify-center items-center">
          <p className="text-3xl font-bold my-10 from-teal-400 to-sky-600 border-b bg-gradient-to-r inline-block text-transparent bg-clip-text">
            Berita Kebencanaan
          </p>
        </div>

        <div className="w-full grid gap-5 gap-y-14 grid-cols-3">
          {postData.map((post: any) => (
            <Link
              key={post.id}
              className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition "
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
