import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import { CirclePlus, ClipboardPen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalAddPost from "./ModalAddPost";
import ModalUpdatePost from "./ModalUpdatePost";
import ModalDeletePost from "./ModalDeletePost";
import Image from "next/image";
import formatTanggal from "@/utils/formatTanggal";
import Tabel from "@/components/UI/Tabel";
import FilterSelect from "@/components/Fragment/filterSelect";

const head = ["No", "Foto", "Judul", "Daerah", "Tanggal", "Aksi"];
const PostAdminView = (props: any) => {
  const { posts } = props;
  const [modalAddPost, setModalAddPost] = useState(false);
  const [postData, setPostData] = useState<any>(posts);
  const [deletedPost, setDeletedPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({});
  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

  const filteredData = postData.filter((item: any) => {
    const itemDate = new Date(item.tanggal);
    const matchesBencana = selectedBencana
      ? item.jenisBencana === selectedBencana
      : true;
    const matchesDaerah = selectedDaerah
      ? item.daerah === selectedDaerah
      : true;
    const matchesStartDate = startDate ? itemDate >= startDate : true;
    const matchesEndDate = endDate ? itemDate <= endDate : true;

    return (
      matchesBencana && matchesDaerah && matchesStartDate && matchesEndDate
    );
  });

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  return (
    <>
      <DashboardLayout type="Admin">
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <p className="my-3 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Postingan Bencana
          </p>
        </div>
        <div className="lg:w-1/2">
          <FilterSelect
            setSelectedBencana={setSelectedBencana}
            setSelectedDaerah={setSelectedDaerah}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
          />
        </div>

        <div>
          <Button onClick={() => setModalAddPost(true)} className={"my-5"}>
            <span className="flex gap-3 rounded-md bg-green-600 px-4 py-2 text-white hover:shadow-md">
              Tambahkan
              <CirclePlus width={20} height={20} />
            </span>
          </Button>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-x-auto rounded-md border shadow-md">
                  <Tabel head={head}>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((sub: any, index: number) => (
                          <tr
                            className="odd:bg-white even:bg-gray-100"
                            key={index}
                          >
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap rounded-md px-6 py-4 text-sm font-medium text-gray-800">
                              <Image
                                src={sub.image}
                                alt="foto"
                                width={100}
                                height={100}
                                className="max-h-20 rounded-lg object-cover shadow-lg"
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                              <p className="max-w-[200px] truncate">
                                {sub.title}
                              </p>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                              {sub.daerah}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                              {formatTanggal(sub.tanggal)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  onClick={() => setUpdatedPost(sub)}
                                >
                                  <div className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:shadow-md">
                                    <ClipboardPen />
                                  </div>
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => setDeletedPost(sub)}
                                >
                                  <div className="rounded-md bg-tertiary px-4 py-2 text-white hover:shadow-md">
                                    <Trash2 />
                                  </div>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
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
                                Tidak ada Postingan
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
        </div>
      </DashboardLayout>
      {modalAddPost && (
        <ModalAddPost
          setModalAddPost={setModalAddPost}
          setPostData={setPostData}
        />
      )}
      {Object.keys(updatedPost).length > 0 && (
        <ModalUpdatePost
          setUpdatedPost={setUpdatedPost}
          updatedPost={updatedPost}
          setPostData={setPostData}
        />
      )}
      {Object.keys(deletedPost).length > 0 && (
        <ModalDeletePost
          setDeletedPost={setDeletedPost}
          deletedPost={deletedPost}
          setPostData={setPostData}
        />
      )}
    </>
  );
};

export default PostAdminView;
