import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { ToasterContext } from "@/context/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import serviceProfile from "@/services/profile";
import Image from "next/image";
import React, { FormEvent, useContext, useState } from "react";

const ProfileUserView = ({ profile, setProfile }: any) => {
  const [changeName, setChangeName] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const file = form.uploadImage.files[0];
    
    const newProfileData = {
      fullname: form.namaLengkap.value,
      telepon: form.telepon.value,
    };

    try {
      // Update Profile Information
      const profileResult = await serviceProfile.updateProfile(profile.id, newProfileData);
      if (profileResult.status === 200) {
        setProfile({
          ...profile,
          fullname: newProfileData.fullname,
          telepon: newProfileData.telepon,
        });
        setToaster({
          variant: "success",
          message: "Profile Berhasil Diperbarui",
        });
      } else {
        throw new Error("Profile update failed");
      }

      // Update Profile Photo if file exists
      if (file) {
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          setToaster({
            variant: "danger",
            message: "Ekstensi file tidak sesuai. Hanya jpg, jpeg dan png yang diizinkan.",
          })
          setChangeName({});
          return;
        }

        if (file.size >= 1000000) {
          setToaster({
            variant: "danger",
            message: "Ukuran file maksimal 1 MB",
          })
          setChangeName({});
          return;
        }

        const newName = "profile." + file.name.split(".")[1];
        uploadFile(
          profile.id,
          file,
          newName,
          "users",
          async (status: boolean, newImageUrl: string) => {
            if (status) {
              const data = { image: newImageUrl };
              const imageResult = await serviceProfile.updateProfile(profile.id, data);
              if (imageResult.status === 200) {
                setProfile({ ...profile, image: newImageUrl });
                setChangeName({});
                setToaster({
                  variant: "success",
                  message: "Foto Profile Berhasil Diperbarui",
                });
              } else {
                throw new Error("Gagal memperbarui foto profil");
              }
            } else {
              throw new Error("Gagal Upload File");
            }
          }
        );
      }
    } catch (error) {
      setChangeName({});
      setToaster({
        variant: "danger",
        message: "Profile Gagal Diperbarui",
      });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (  
    <DashboardLayout type="User">
      <p className="text-xl font-bold mb-10">Profile Page</p>
      <div className="w-full border rounded-md p-5">
        <form onSubmit={handleUpdate} className="flex flex-col lg:flex-row justify-start items-center lg:items-start space-y-5 lg:space-y-0 lg:space-x-10">
          <div className="w-full lg:w-1/3 flex flex-col items-center border rounded-md shadow-md p-2">
            {profile?.image ? (
              <Image
                src={profile?.image}
                width={250}
                height={250}
                alt="Profile"
                loading="lazy"
                className="rounded-full object-cover w-auto h-auto lg:w-[250px] lg:h-[250px] bg-gray-200 border text-3xl font-bold"
              />
            ) : (
              <div className="rounded-full w-[250px] h-[250px] flex justify-center items-center object-cover bg-gray-200 text-3xl font-bold">
                {profile?.fullname?.charAt(0)}
              </div>
            )}
            <div className="my-5">
              <label
                htmlFor="upload-image"
                className="w-full bg-gray-300 flex flex-col justify-center items-center p-5 cursor-pointer rounded-md"
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
                name="uploadImage"
                id="upload-image"
                className="opacity-0 absolute z-[-1]"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeName(e.currentTarget.files[0]);
                }}
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col border rounded-md shadow-md p-4">
            <Input
              type="text"
              name="namaLengkap"
              label="Nama Lengkap"
              defaultValue={profile.fullname}
              className="w-full"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              defaultValue={profile.email}
              className="bg-gray-100 border-gray-300 opacity-40 w-full"
              disabled
            />
            <Input
              type="number"
              name="telepon"
              label="No. Telepon"
              defaultValue={profile.telepon}
              className="w-full"
            />
            <hr className="mt-5 mb-2" />
            <div className="flex justify-end">

            <Button type="submit" className="bg-sky-500 text-white mt-3 w-3/4 lg:w-1/3">
              {isLoading ? "Loading..." : "Update"}
            </Button>
            </div>

          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProfileUserView;
