
import ProfileAdminView from "@/components/Page/Admin/ProfileAdminView";
import serviceProfile from "@/services/profile";
import React from "react";

const ProfilePage = (props: any) => {
  const { bio } = props;

  return <ProfileAdminView bio={bio} />;
};

export default ProfilePage;

export async function getServerSideProps() {
  const { data } = await serviceProfile.getProfile();
  return {
    props: {
      bio: data.data,
    },
  };
}
