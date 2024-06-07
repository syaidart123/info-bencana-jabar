import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import { CirclePlus, ClipboardPen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalAddAid from "./ModalAddAid";
import { Aid } from "@/types/aid.type";
import ModalUpdateAid from "./ModalUpdateAid";
import ModalDeleteAid from "./ModalDeleteAid";
import formatRupiah from "@/utils/formatRupiah";



const AidAdminView = (props: any) => {
  const { aids } = props;
  const [aidData, setAidData] = useState<Aid[]>([]);
  // console.log(aidData);

  // const totalNominalAid = aidData
  // .flatMap((item: any) => item.bantuan)
  // .reduce((total: any, item: any) => total + (item.nominal || 0), 0);  
  // console.log(totalNominalAid);

  const totalNominal = (data:any)=>data.map((item: any) => parseInt(item.nominal) || 0)  
  .reduce((total: any, item: any) => total + item, 0);  
  
  const [updatedAid, setUpdatedAid] = useState({});
  const [deletedAid, setDeletedAid] = useState({});
  const [modalAddAid, setModalAddAid] = useState(false);

  useEffect(() => {
    setAidData(aids);
  }, [aids]);

  return (
    <div>
      <DashboardLayout type="Admin">
        <p className="text-3xl font-bold">Bantuan Bencana</p>
        <Button onClick={() => setModalAddAid(true)} className={"my-5"}>
          <span className="py-2 px-4 bg-green-500 rounded-md text-white flex gap-3">
            Tambahkan
            <CirclePlus width={20} height={20} />
          </span>
        </Button>
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
                          daerah
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Jenis Bencana
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Nominal Bantuan
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          status
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {aidData.map((sub: any, index: number) => {
                        return (
                          <tr
                            className="odd:bg-white even:bg-gray-100"
                            key={index}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm rounded-md font-medium text-gray-800 ">
                              {sub.daerah}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm rounded-md font-medium text-gray-800 ">
                              {sub.jenisBencana}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              {formatRupiah(totalNominal(sub.bantuan))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {sub.Status}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  onClick={() => setUpdatedAid(sub)}
                                >
                                  <div className="bg-yellow-500 px-4 py-2 rounded-md text-white">
                                    <ClipboardPen />
                                  </div>
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => setDeletedAid(sub)}
                                >
                                  <div className="bg-red-500 px-4 py-2 rounded-md text-white">
                                    <Trash2 />
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
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      {modalAddAid && (
        <ModalAddAid setModalAddAid={setModalAddAid} setAidData={setAidData} />
      )}
      {Object.keys(updatedAid).length > 0 && (
        <ModalUpdateAid
          setUpdatedAid={setUpdatedAid}
          setAidData={setAidData}
          updatedAid={updatedAid}
        />
      )}
      {Object.keys(deletedAid).length > 0 && (
        <ModalDeleteAid
          setDeletedAid={setDeletedAid}
          setAidData={setAidData}
          deletedAid={deletedAid}
        />
      )}
    </div>
  );
};

export default AidAdminView;
