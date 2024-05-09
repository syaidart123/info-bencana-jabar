import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import React, { useEffect, useState } from "react";
import ModalUpdatePengajuan from "./ModalUpdatePengajuan";
import { ClipboardPen, Trash2 } from "lucide-react";
import ModalDeletePengajuan from "./ModalDeletePengajuan";
import Image from "next/image";

type propTypes = {
  submission: any;
};

const PengajuanView = (props: propTypes) => {
  const { submission } = props;
  const [dataSubmission, setDataSubmission] = useState<any>(submission);
  const [deletedSubmission, setDeletedSubmission] = useState({});
  const [updatedSubmission, setUpdatedSubmission] = useState({});

  useEffect(() => {
    setDataSubmission(submission);
  }, [submission]);
  
  return (
    <div>
      <DashboardLayout type="Admin">
        <p className="text-xl font-bold mb-10">Pengajuan Bencana</p>
        <div className="w-full border">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-sky-500">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Foto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Jenis bencana
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Lokasi
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-white uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSubmission.map((sub: any, index: number) => {
                        return (
                          <tr
                            className="odd:bg-white even:bg-gray-100"
                            key={index}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              <Image src={sub.image} width={100} height={100} alt="foto" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              {sub.jenisBencana}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {sub.lokasi}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {sub.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              
                              <Button
                                type="button"
                                onClick={() => setUpdatedSubmission(sub)}
                              >
                                <ClipboardPen />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setDeletedSubmission(sub)}
                              >
                                <Trash2 />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      {Object.keys(updatedSubmission).length > 0 ? (
        <ModalUpdatePengajuan
          updatedSubmission={updatedSubmission}
          setUpdatedSubmission={setUpdatedSubmission}
          setDataSubmission={setDataSubmission}
        />
      ):null}
      {Object.keys(deletedSubmission).length > 0 ? (
        <ModalDeletePengajuan
          deletedSubmission={deletedSubmission}
          setDeletedSubmission={setDeletedSubmission}
          setDataSubmission={setDataSubmission}
        />
      ):null}
    </div>
  );
};

export default PengajuanView;
