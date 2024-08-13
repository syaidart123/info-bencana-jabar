import Button from "@/components/UI/Button";
import React, { useEffect, useState } from "react";
import ModalUpdatePengajuan from "./ModalUpdatePengajuan";
import { ClipboardPen, Trash2 } from "lucide-react";
import ModalDeletePengajuan from "./ModalDeletePengajuan";
import Image from "next/image";
import Tabel from "@/components/UI/Tabel";
import Pagination from "@/components/UI/Pagination";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import formatRupiah from "@/utils/formatRupiah";

const head = [
  "No",
  "Foto",
  "Jenis Bencana",
  "Lokasi",
  "Status",
  "Taksiran Kerugian",
  "Aksi",
];

const PengajuanView = (props: any) => {
  const { submission, children } = props;
  const [dataSubmission, setDataSubmission] = useState<any>(submission);
  const [deletedSubmission, setDeletedSubmission] = useState({});
  const [updatedSubmission, setUpdatedSubmission] = useState({});
  const router = useSearchParams();

  const page = router.get("page") ?? "1";
  const per_page = router.get("per_page") ?? "5";
  const startIndex = (Number(page) - 1) * Number(per_page);
  const endIndex = Math.min(
    startIndex + Number(per_page),
    dataSubmission.length,
  );
  const currentPage = Number(page);
  const totalPages = Math.ceil(dataSubmission.length / Number(per_page));
  const currentData = dataSubmission.slice(startIndex, endIndex);

  useEffect(() => {
    setDataSubmission(submission);
  }, [submission]);

  return (
    <div>
      <DashboardLayout type="Admin">
        {children}
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
                              {sub.status}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                              {formatRupiah(sub.taksiranKerugian)}
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
                              Tidak ada Laporan
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
          <div
            className={`${dataSubmission.length > 0 ? "flex" : "hidden"} mb-20 mt-5`}
          >
            <Pagination
              hasNextPage={endIndex < dataSubmission.length}
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
    </div>
  );
};

export default PengajuanView;
