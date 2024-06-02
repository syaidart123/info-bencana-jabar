import Sidebar from "@/components/Fragment/sidebar";
import serviceProfile from "@/services/profile";
import useSWR from "swr";
import {
  BarChart3,
  CircleUser,
  HandCoins,
  MonitorUp,
  Newspaper,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import fetcher from "@/lib/swr/fetcher";

type propTypes = {
  children: React.ReactNode;
  type: "Admin" | "User";
  profile?: any;
};

const listSidebarAdmin = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <BarChart3 />,
  },
  {
    title: "Pengajuan",
    link: "/admin/pengajuan",
    icon: <Newspaper />,
  },
  {
    title: "Bantuan",
    link: "/admin/bantuan",
    icon: <HandCoins />,
  },
  {
    title: "Postingan",
    link: "/admin/postingan",
    icon: <MonitorUp />,
  },
  {
    title: "Profile",
    link: "/admin/profile",
    icon: <CircleUser />,
  },
];
const listSidebarUser = [
  // {
  //   title: "Dashboard Pengajuan",
  //   link: "/dashboard",
  //   icon: <BarChart3 />,
  // },
  {
    title: "Pengajuan",
    link: "/dashboard",
    icon: <Newspaper />,
  },
  {
    title: "Profile",
    link: "/dashboard/profile",
    icon: <CircleUser />,
  },
];

const DashboardLayout = (props: propTypes) => {
  const { children, type } = props;
  const { data, error, isLoading } = useSWR("/api/user/profile", fetcher);

  if (error) return <div>Error loading submissions</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex justify-between">
      {type === "Admin" ? (
        <Sidebar links={listSidebarAdmin} profile={data} />
      ) : (
        <Sidebar links={listSidebarUser} profile={data} />
      )}
      <div className="w-full p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
