import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import React, { useEffect, useState } from "react";
import { ClipboardPen } from "lucide-react";
import ModalDeletePengajuan from "./ModalDeletePengajuan";
import ModalUpdatePengajuan from "./ModalUpdatePengajuan";
import Image from "next/image";

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
        <p className="mb-10 text-xl font-bold">Laporan Bencana</p>
        <div className="overflow-x-auto rounded-md border shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-sky-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
                >
                  Foto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
                >
                  Jenis bencana
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
                >
                  Daerah
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSubmission.map((sub: any, index: number) => {
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
                          <div className="rounded-md bg-green-500 px-4 py-2 text-white">
                            <ClipboardPen />
                          </div>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
