import Link from "next/link";
import React from "react";
import Card from "./Card";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/UI/Pagination";

type propTypes = {
  postData: any;
  setDetailSubmission?: any;
};

const BeritaPageView = (props: propTypes) => {
  const { postData } = props;

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "12";
  const startIndex = (Number(page) - 1) * Number(per_page);
  const endIndex = Math.min(startIndex + Number(per_page), postData.length);
  const currentPage = Number(page);
  const totalPages = Math.ceil(postData.length / Number(per_page));
  const currentData = postData.slice(startIndex, endIndex);

  return (
    <div className="min-h-svh px-10 pb-20">
      {currentData.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-y-14">
          {currentData.map((post: any) => (
            <Link
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
              href={`/berita/${post.id}`}
            >
              <Card post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-70vh rounded-md border py-10">
          <div className="flex flex-col items-center">
            <Image
              src={`/images/noData.png`}
              alt="No Data"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
            <p className="py-3 text-lg font-semibold">Tidak ada Postingan</p>
          </div>
        </div>
      )}
      <div className={`${postData.length > 0 ? "flex" : "hidden"} mt-5`}>
        <Pagination
          hasNextPage={endIndex < postData.length}
          hasPrevPage={startIndex > 0}
          perPage="12"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default BeritaPageView;
