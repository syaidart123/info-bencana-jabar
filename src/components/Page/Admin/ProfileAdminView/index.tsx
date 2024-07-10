import DashboardLayout from "@/components/Layout/DashboardLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { ToasterContext } from "@/context/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import serviceProfile from "@/services/profile";
import Image from "next/image";
import React, { FormEvent, useContext, useEffect, useState } from "react";

const ProfileAdminView = (props: any) => {
  const { bio } = props;
  const { setToaster } = useContext(ToasterContext);
  const [profileData, setProfileData] = useState<any>(bio);
  const [changeName, setChangeName] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileData(bio);
  }, [bio]);

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
      const profileResult = await serviceProfile.updateProfile(
        profileData.id,
        newProfileData,
      );
      if (profileResult.status === 200) {
        setProfileData({
          ...profileData,
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
            message:
              "Ekstensi file tidak sesuai. Hanya jpg, jpeg dan png yang diizinkan.",
          });
          setChangeName({});
          return;
        }

        if (file.size >= 1000000) {
          setToaster({
            variant: "danger",
            message: "Ukuran file maksimal 1 MB",
          });
          setChangeName({});
          return;
        }
        const newName = "profile." + file.name.split(".")[1];
        uploadFile(
          profileData.id,
          file,
          newName,
          "users",
          async (status: boolean, newImageUrl: string) => {
            if (status) {
              const data = { image: newImageUrl };
              const imageResult = await serviceProfile.updateProfile(
                profileData.id,
                data,
              );
              if (imageResult.status === 200) {
                setProfileData({ ...profileData, image: newImageUrl });
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
          },
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
    <DashboardLayout type="Admin">
      <div className="flex items-center justify-center lg:items-start lg:justify-start">
        <p className="my-3 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
          Profile
        </p>
      </div>
      <div className="mb-28 rounded-md border p-4">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col items-center justify-start space-y-5 lg:flex-row lg:items-start lg:space-x-10 lg:space-y-0"
        >
          <div className="flex w-full flex-col items-center rounded-md border p-2 shadow-md lg:w-1/3">
            {profileData?.image ? (
              <Image
                src={profileData?.image}
                width={250}
                height={250}
                alt="profile"
                loading="lazy"
                className="h-40 w-40 rounded-full border bg-gray-200 object-cover text-3xl font-bold lg:h-[250px] lg:w-[250px]"
              />
            ) : (
              <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-gray-200 object-cover text-3xl font-bold">
                {profileData?.fullname?.charAt(0)}
              </div>
            )}
            <div className="my-5">
              <label
                htmlFor="upload-image"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md bg-gray-300 p-5"
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
                className="absolute z-[-1] opacity-0"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeName(e.currentTarget.files[0]);
                }}
              />
            </div>
          </div>
          <div className="flex w-full flex-col rounded-md border p-4 shadow-md lg:w-2/3">
            <p className="py-3 text-2xl font-bold text-primary">Biodata</p>

            <Input
              type="text"
              name="namaLengkap"
              label="Nama Lengkap"
              defaultValue={profileData.fullname}
              className="w-full"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              defaultValue={profileData.email}
              className="w-full border-gray-300 bg-gray-100 opacity-40"
              disabled
            />
            <Input
              type="number"
              name="telepon"
              label="No. Telepon"
              defaultValue={profileData.telepon}
              className="w-full"
            />
            <hr className="mb-2 mt-5" />
            <div className="flex justify-end">
              <Button
                type="submit"
                className={`mt-3 w-3/4 bg-primary text-white lg:w-1/3 ${isLoading && "cursor-not-allowed"}`}
              >
                {isLoading ? "Loading..." : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProfileAdminView;
