import fetcher from "@/lib/swr/fetcher";
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

  if (error) return <div>Error</div>;
  if (isLoading) return <div>loading...</div>;

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
      <div className="container max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen p-6  my-8">
        <div className="text-center mb-10">
          <p className="text-4xl font-bold text-gray-900">{data.title}</p>
        </div>

        <div className="flex justify-center items-center my-5">
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg">
            <Image
              alt={data.title}
              src={data.image}
              width={500}
              height={500}
              className="w-full max-w-2xl transform transition duration-200 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center my-5 text-sm text-gray-500">
          <p className="font-medium text-sky-500 border-r-2 pr-2">
            {data.daerah}
          </p>
          <CalendarClock color="gray" />
          <p className="ml-2">{formatTanggal(data.tanggal)}</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white">{paragraphs}</div>
      </div>
    </>
  );
};

export default DetailBeritaView;
