import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import { CirclePlus, ClipboardPen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalAddPost from "./ModalAddPost";
import ModalUpdatePost from "./ModalUpdatePost";
import ModalDeletePost from "./ModalDeletePost";
import Image from "next/image";

const PostAdminView = (props: any) => {
  const {posts}=props;
  const [modalAddPost, setModalAddPost] = useState(false);
  const [postData, setPostData] = useState<any>(posts);
  const [deletedPost, setDeletedPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({});

useEffect(()=>{
  setPostData(posts);
},[posts])

  return (
    <>
      <DashboardLayout type="Admin">
        <p className="text-3xl font-bold">Postingan Bencana</p>
        <Button onClick={() => setModalAddPost(true)} className={"my-5"}>
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
                          Foto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                        >
                          Judul
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
                          Tanggal
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
                      {postData.map((sub: any, index: number) => {
                        return (
                          <tr
                            className="odd:bg-white even:bg-gray-100"
                            key={index}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm rounded-md font-medium text-gray-800 ">
                              <Image src={sub.image} alt="foto" width={100} height={100}  />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                               <p className="truncate max-w-[200px]">{sub.title}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {sub.jenisBencana}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {sub.tanggal}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  onClick={() => setUpdatedPost(sub)}
                                >
                                  <div className="bg-yellow-500 px-4 py-2 rounded-md text-white">
                                    <ClipboardPen />
                                  </div>
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() => setDeletedPost(sub)}
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
