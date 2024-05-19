import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { uploadFile } from "@/lib/firebase/service";
import serviceProfile from "@/services/profile";
import Image from "next/image";
import React, { useState } from "react";

const ProfileAdminView = ({ profile, setProfile, session }: any) => {
  const [changeName, setChangeName] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");

  const handleUpdateFoto = async (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    const newName = "profile." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await serviceProfile.updateProfile(profile.id, data);
            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newImageUrl });
              setChangeName({});
              e.target.reset();
            }
          } else {
            setIsLoading("");
          }
        }
      );
    } else {
      setIsLoading("");
      setChangeName({});
    }
  };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    const data = {
      ...changeName,
    };
    const result = await serviceProfile.updateProfile(profile.id, data);
    if (result.status === 200) {
      setProfile({ ...profile, ...changeName });
      setChangeName({});
    }
  };

  return (
    <DashboardLayout type="Admin">
      <p className="text-xl font-bold mb-10">Profile Page</p>
      <div className="flex w-full">
        <div className="w-full flex p-10 border rounded-md gap-5 shadow-sm">
          <div className="w-1/4">
            {profile?.image ? (
              <Image
                src={profile?.image}
                width={100}
                height={100}
                alt="Profile"
                loading="lazy"
                className="rounded-full w-[200px] h-[200px] flex justify-center items-center object-cover bg-gray-200 text-3xl font-bold"
              />
            ) : (
              <div className="rounded-full w-[200px] h-[200px] flex justify-center items-center object-cover bg-gray-200 text-3xl font-bold">
                {profile?.fullname?.charAt(0)}
              </div>
            )}
            <form onSubmit={handleUpdateFoto}>
              <label
                htmlFor="upload-image"
                className="my-5 w-full bg-gray-300 flex flex-col justify-center items-center p-3 cursor-pointer rounded-md gap-5 float-left"
              >
                {changeName.name ? (
                  <p>{changeName.name}</p>
                ) : (
                  <p className="text-[12px] text-black">
                    Max Ukuran File : 1 MB
                  </p>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                className="opacity-0 absolute z-[-1]"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeName(e.currentTarget.files[0]);
                }}
              />
              <Button type="submit" className="bg-sky-500 text-white w-full">
                {isLoading ? "Loading..." : "Update Foto"}
              </Button>
            </form>
          </div>

          <div className="w-3/4 ">
            <form onSubmit={handleUpdateProfile}>
              <Input
                type="text"
                name="name"
                label="Nama Lengkap"
                defaultValue={profile.fullname}
              />
              <Input
                type="email"
                name="email"
                label="Email"
                defaultValue={profile.email}
                disabled
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 mt-3">
                Lembaga
                <select
                  name="jenisBencana"
                  className="border py-3 px-4 pe-9 mt-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <option selected disabled>
                    Pilih Lembaga...
                  </option>
                  <option value="Human Initiative">Human Initiative</option>
                  <option value="IZI">IZI</option>
                  <option value="Relawan Bencana">Relawan Bencana</option>
                  <option value="Al-Hilal">Al-Hilal</option>
                </select>
              </label>
              <Input
                type="text"
                name="jabatan"
                label="Jabatan"
                defaultValue={profile.jabatan}
              />
              <Button type="submit" className=" bg-sky-500 text-white mt-3  ">
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileAdminView;
