import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import ModalAddPost from "./ModalAddPost";
import ModalUpdatePost from "./ModalUpdatePost";
import ModalDeletePost from "./ModalDeletePost";

const PostAdminView = () => {
  const [modalAddPost, setModalAddPost] = useState(false);
  const [postData, setPostData] = useState({});
  const [deletedPost, setDeletedPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({});
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
                    {/* <tbody>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                              {sub.jenisBencana}
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
                    </tbody> */}
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
