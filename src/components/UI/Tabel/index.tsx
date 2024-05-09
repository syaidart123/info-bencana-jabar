import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import { Scaling } from "lucide-react";
import SelectOption from "../SelectOption";
import Option from "../Option";
import ModalDetailPengajuan from "./ModalDetailPengajuan";
import FilterSelect from "@/components/Fragment/filterSelect";

type propTypes = {
  dataSubmission: any;
  setDetailSubmission?: any;
};

const Tabel = (props: propTypes) => {
  const { dataSubmission} = props;
  const [detailSubmission, setDetailSubmission] = useState({});
  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");

  const filteredData = dataSubmission.filter((item: any) => {
    if (selectedBencana && selectedDaerah) {
      return (
        item.jenisBencana === selectedBencana && item.daerah === selectedDaerah
      );
    } else if (selectedBencana) {
      return item.jenisBencana === selectedBencana;
    } else if (selectedDaerah) {
      return item.daerah === selectedDaerah;
    }
    return true;
  });

  return (
    <>
      <div className="px-10 h-screen">
        <p className="text-2xl mb-5">Data Bencana</p>
        <FilterSelect setSelectedBencana={setSelectedBencana} setSelectedDaerah={setSelectedDaerah} />
        <div className="flex w-full">
          <table className="w-3/6 min-w-full divide-y divide-gray-200">
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
                  Daerah
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
              {filteredData.map((sub: any, index: number) => {
                return (
                  <tr className="odd:bg-white even:bg-gray-100" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      <Image
                        src={sub.image}
                        width={100}
                        height={100}
                        alt="foto"
                        className="rounded-lg shadow-lg max-h-20 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      {sub.jenisBencana}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.daerah}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {sub.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <Button
                        type="button"
                        onClick={() => setDetailSubmission(sub)}
                      >
                        <Scaling />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {Object.keys(detailSubmission).length > 0 ? (
        <ModalDetailPengajuan
          setDetailSubmission={setDetailSubmission}
          detailSubmission={detailSubmission}
        />
      ) : null}
    </>
  );
};

export default Tabel;
