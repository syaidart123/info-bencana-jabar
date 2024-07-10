import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import React, { useEffect, useState } from "react";
import { ClipboardPen } from "lucide-react";
import ModalDeletePengajuan from "./ModalDeletePengajuan";
import ModalUpdatePengajuan from "./ModalUpdatePengajuan";
import Image from "next/image";
import Tabel from "@/components/UI/Tabel";

const head = ["No", "Foto", "Jenis Bencana", "Lokasi", "Status", "Aksi"];

const StatusPengajuanView = (props: any) => {
  const { submissions } = props;
  const [dataSubmission, setDataSubmission] = useState<any>([]);
  const [deletedSubmission, setDeletedSubmission] = useState({});
  const [updatedSubmission, setUpdatedSubmission] = useState({});

  useEffect(() => {
    setDataSubmission(submissions);
  }, [submissions]);

  return (
    <div>
      <DashboardLayout type="User">
        {/* <p className="mb-10 text-xl font-bold">Laporan Bencana</p>
         */}
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <p className="my-3 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Laporan Bencana
          </p>
        </div>
        <div className="overflow-x-auto rounded-md border shadow-md">
          <Tabel head={head}>
            <tbody>
              {dataSubmission.length > 0 ? (
                dataSubmission.map((sub: any, index: number) => {
                  return (
                    <tr className="odd:bg-white even:bg-gray-100" key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        {index + 1}.
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
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
                        {sub.daerah}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                        {sub.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => setUpdatedSubmission(sub)}
                          >
                            <div className="rounded-md bg-tertiary px-4 py-2 text-white">
                              <ClipboardPen />
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
                        Tidak ada laporan
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Tabel>
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

export default StatusPengajuanView;
