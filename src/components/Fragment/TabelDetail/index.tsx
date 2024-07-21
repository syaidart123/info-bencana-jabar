import Image from "next/image";
import React, { useState } from "react";
import { Scaling } from "lucide-react";
import ModalDetailPengajuan from "./ModalDetailPengajuan";
import Button from "@/components/UI/Button";
import Tabel from "@/components/UI/Tabel";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/UI/Pagination";

type propTypes = {
  dataSubmission: any;
  setDetailSubmission?: any;
};

const head = ["No", "Foto", "Jenis Bencana", "Daerah", "Status", "Detail"];

const TabelDetail = (props: propTypes) => {
  const { dataSubmission } = props;
  const [detailSubmission, setDetailSubmission] = useState({});

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";
  const startIndex = (Number(page) - 1) * Number(per_page);
  const endIndex = Math.min(
    startIndex + Number(per_page),
    dataSubmission.length,
  );
  const currentPage = Number(page);
  const totalPages = Math.ceil(dataSubmission.length / Number(per_page));
  const currentData = dataSubmission.slice(startIndex, endIndex);

  return (
    <>
      <main className="px-10">
        <div className="flex w-full overflow-x-auto rounded-md border shadow-md">
          <Tabel head={head}>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((sub: any, index: number) => {
                  return (
                    <tr className="odd:bg-white even:bg-gray-100" key={index}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        {startIndex + index + 1}.
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
                      <td className="whitespace-nowrap px-6 py-4 text-start text-sm font-medium">
                        <Button
                          type="button"
                          onClick={() => setDetailSubmission(sub)}
                        >
                          <div className="rounded-md bg-tertiary px-4 py-2 text-white">
                            <Scaling />
                          </div>
                        </Button>
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
                        Tidak ada data bencana
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Tabel>
        </div>
        <div
          className={`${dataSubmission.length > 0 ? "flex" : "hidden"} mt-5`}
        >
          <Pagination
            hasNextPage={endIndex < dataSubmission.length}
            hasPrevPage={startIndex > 0}
            perPage="5"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </main>
      {Object.keys(detailSubmission).length > 0 ? (
        <ModalDetailPengajuan
          setDetailSubmission={setDetailSubmission}
          detailSubmission={detailSubmission}
        />
      ) : null}
    </>
  );
};

export default TabelDetail;
