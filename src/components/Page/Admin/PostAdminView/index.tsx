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
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/UI/Pagination";

const head = ["No", "Foto", "Judul", "Daerah", "Tanggal", "Aksi"];
const PostAdminView = (props: any) => {
  const { posts } = props;
  const [modalAddPost, setModalAddPost] = useState(false);
  const [postData, setPostData] = useState<any>(posts);
  const [deletedPost, setDeletedPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({});

  const router = useSearchParams();

  const page = router.get("page") ?? "1";
  const per_page = router.get("per_page") ?? "5";
  const startIndex = (Number(page) - 1) * Number(per_page);
  const endIndex = Math.min(startIndex + Number(per_page), postData.length);
  const currentPage = Number(page);
  const totalPages = Math.ceil(postData.length / Number(per_page));
  const currentData = postData.slice(startIndex, endIndex);

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  return (
    <>
      <div className="my-3 flex">
        <Button onClick={() => setModalAddPost(true)}>
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
                    {currentData.length > 0 ? (
                      currentData.map((sub: any, index: number) => (
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
        <div className={`${postData.length > 0 ? "flex" : "hidden"} mt-5`}>
          <Pagination
            hasNextPage={endIndex < postData.length}
            hasPrevPage={startIndex > 0}
            perPage="5"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
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
