import LoadingPage from "@/components/Layout/LoadingPage";
import fetcher from "@/lib/swr/fetcher";
import Custom500 from "@/pages/500";
import formatTanggal from "@/utils/formatTanggal";
import { CalendarClock } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const DetailBeritaView = () => {
  const { id } = useRouter().query;

  const { data, error, isLoading } = useSWR(`/api/post/${id}`, fetcher);

  if (error) return <Custom500 />;
  if (isLoading) return <LoadingPage />;

  const paragraphs = data.deskripsi
    .split("\n\n")
    .map((sentence: any, index: any) => (
      <p key={index} className="mb-4">
        {sentence.trim()}
      </p>
    ));

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className="container my-8 min-h-screen max-w-4xl p-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            {data.title}
          </p>
        </div>

        <div className="my-5 flex items-center justify-center">
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg">
            <Image
              alt={data.title}
              src={data.image}
              loading="lazy"
              width={500}
              height={500}
              className="w-full max-w-2xl transform transition duration-200 hover:scale-105"
            />
          </div>
        </div>

        <div className="my-5 flex items-center justify-center gap-2 text-sm text-gray-500">
          <p className="border-r-2 pr-2 font-medium text-primary">
            {data.daerah}
          </p>
          <CalendarClock color="gray" />
          <p className="ml-2">{formatTanggal(data.tanggal)}</p>
        </div>

        <div className="mx-auto max-w-3xl bg-white">{paragraphs}</div>
      </div>
    </>
  );
};

export default DetailBeritaView;
