import ProfileUserView from "@/components/Page/User/ProfileUserView";
import serviceProfile from "@/services/profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProfileUserPage = () => {
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
    <ProfileUserView
      profile={profile}
      setProfile={setProfile}
      session={session}
    />
  );
};

export default ProfileUserPage;
