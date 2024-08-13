import DashboardGrafik from "@/components/Layout/DashboardGrafik";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import Tabel from "@/components/UI/Tabel";
import { ClipboardPen, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ModalUpdatePengajuan from "./ModalUpdatePengajuan";
import ModalDeletePengajuan from "./ModalDeletePengajuan";
import formatRupiah from "@/utils/formatRupiah";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/UI/Pagination";

type propsTypes = {
  submission: any;
  post?: any;
};

const head = [
  "No",
  "Foto",
  "Jenis Bencana",
  "Lokasi",
  "Taksiran Kerugian",
  "Bantuan Terkumpul",
  "Aksi",
];

const DashboardAdminView = (props: propsTypes) => {
  const { submission, post } = props;

  const [dataSubmission, setDataSubmission] = useState<any>(submission);
  const [deletedSubmission, setDeletedSubmission] = useState({});
  const [updatedSubmission, setUpdatedSubmission] = useState({});

  const filteredData = dataSubmission.filter((item: any) => {
    return item.status === "Diproses";
  });
  const router = useSearchParams();
  const page = router.get("page") ?? "1";

  const per_page = router.get("per_page") ?? "5";
  const startIndex = (Number(page) - 1) * Number(per_page);
  const endIndex = Math.min(
    startIndex + Number(per_page),
    dataSubmission.length,
  );
  const currentPage = Number(page);
  const totalPages = Math.ceil(filteredData.length / Number(per_page));
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setDataSubmission(submission);
  }, [submission]);

  const totalKerugian = dataSubmission
    .map((item: { taksiranKerugian: number }) => item.taksiranKerugian)
    .reduce((total: number, item: number) => total + item, 0);

  const totalBantuan = dataSubmission
    .filter((item: { status: string; bantuan: any }) => item.bantuan) // Filter by status and bantuan
    .flatMap((item: any) => item.bantuan)
    .reduce(
      (total: any, bantuanItem: any) => total + (bantuanItem.nominal || 0),
      0,
    );

  const total = dataSubmission.bantuan
    ? dataSubmission.bantuan.reduce(
        (total: any, item: any) => total + (item.nominal || 0),
        0,
      )
    : 0;

  return (
    <>
      <DashboardLayout type="Admin">
        <div className="flex">
          <p className="my-2 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Dashboard
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
          <div className="rounded-md bg-gradient-to-tr from-purple-400 to-red-400 px-5 py-10 text-white shadow-md hover:shadow-lg lg:py-8">
            <p className="">Jumlah Pengajuan : {dataSubmission.length}</p>
          </div>
          <div className="rounded-md bg-gradient-to-tr from-sky-400 to-secondary px-5 py-10 text-white shadow-md hover:shadow-lg lg:py-8">
            <p>Jumlah Berita : {post.length}</p>
          </div>
          <div className="to- rounded-md bg-gradient-to-tr from-emerald-400 to-teal-400 px-5 py-10 text-white shadow-md hover:shadow-lg lg:py-8">
            <p>Kerugian : {formatRupiah(totalKerugian)}</p>
          </div>
          <div className="rounded-md bg-gradient-to-tr from-rose-400 to-amber-400 px-5 py-10 text-white shadow-md hover:shadow-lg lg:py-8">
            <p>Bantuan : {formatRupiah(totalBantuan)}</p>
          </div>
        </div>

        <div className="mb-10 mt-5 grid grid-cols-1 gap-5 lg:grid-cols-1">
          <div className="flex">
            <p className="my-2 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-2xl font-bold text-transparent">
              Grafik Laporan Bencana
            </p>
          </div>
          <DashboardGrafik submission={submission} />
        </div>
        <div className="mb-20">
          <div className="flex">
            <p className="my-2 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-2xl font-bold text-transparent">
              Laporan Sedang Ditangani
            </p>
          </div>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-x-auto rounded-md border shadow-md">
                  <Tabel head={head}>
                    <tbody>
                      {currentData.length > 0 ? (
                        currentData.map((sub: any, index: number) => {
                          return (
                            <tr
                              className="odd:bg-white even:bg-gray-100"
                              key={index}
                            >
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                                {startIndex + index + 1}.
                              </td>
                              <td className="whitespace-nowrap rounded-md px-6 py-4 text-sm font-medium text-gray-800">
                                <Image
                                  src={sub.image}
                                  width={100}
                                  height={100}
                                  alt="foto"
                                  className="max-h-20 rounded-lg object-cover shadow-lg"
                                />
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                                {sub.jenisBencana}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                                {sub.lokasi}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                                {formatRupiah(sub.taksiranKerugian)}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                                {formatRupiah(
                                  sub.bantuan.reduce(
                                    (total: any, item: any) =>
                                      total + (item.nominal || 0),
                                    0,
                                  ),
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    onClick={() => setUpdatedSubmission(sub)}
                                  >
                                    <div className="rounded-md bg-yellow-500 px-4 py-2 text-white">
                                      <ClipboardPen />
                                    </div>
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => setDeletedSubmission(sub)}
                                  >
                                    <div className="rounded-md bg-tertiary px-4 py-2 text-white">
                                      <Trash2 />
                                    </div>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="whitespace-nowrap bg-white px-6 py-4 text-center text-sm text-gray-800"
                          >
                            <div className="flex flex-col items-center">
                              <Image
                                src={`/images/noData.png`}
                                alt="No Data"
                                width={400}
                                height={400}
                                className="rounded-lg object-cover"
                              />
                              <p className="py-3 text-lg font-semibold">
                                Tidak ada laporan yang diproses
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Tabel>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${filteredData.length > 0 ? "flex" : "hidden"} my-5`}
          >
            <Pagination
              hasNextPage={endIndex < filteredData.length}
              hasPrevPage={startIndex > 0}
              perPage="5"
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </DashboardLayout>
      {Object.keys(updatedSubmission).length > 0 ? (
        <ModalUpdatePengajuan
          updatedSubmission={updatedSubmission}
          setUpdatedSubmission={setUpdatedSubmission}
          setDataSubmission={setDataSubmission}
        />
      ) : null}
      {Object.keys(deletedSubmission).length > 0 ? (
        <ModalDeletePengajuan
          deletedSubmission={deletedSubmission}
          setDeletedSubmission={setDeletedSubmission}
          setDataSubmission={setDataSubmission}
        />
      ) : null}
    </>
  );
};

export default DashboardAdminView;
