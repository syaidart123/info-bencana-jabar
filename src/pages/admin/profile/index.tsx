import ProfileAdminView from "@/components/Page/Admin/ProfileAdminView";
import serviceProfile from "@/services/profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await serviceProfile.getProfile();
        setProfile(data.data);
      };
      getProfile();
    }
  }, [session, profile]);
  return (
    <>
      <ProfileAdminView
        profile={profile}
        setProfile={setProfile}
        session={session}
      />
    </>
  );
};

export default ProfilePage;
