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
      <div className="container mx-auto my-8 min-h-screen max-w-4xl p-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-4xl font-bold text-gray-900">{data.title}</p>
        </div>

        <div className="my-5 flex items-center justify-center">
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

        <div className="my-5 flex items-center justify-center gap-2 text-sm text-gray-500">
          <p className="border-r-2 pr-2 font-medium text-sky-500">
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
