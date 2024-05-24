import Sidebar from "@/components/Fragment/sidebar";
import { BarChart3, CircleUser, HandCoins, Newspaper } from "lucide-react";
import React from "react";

type propTypes = {
  children: React.ReactNode;
  type: "Admin" | "User";
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
  return (
    <div className="flex justify-between">
      {type === "Admin" ? (
        <Sidebar links={listSidebarAdmin} />
      ) : (
        <Sidebar links={listSidebarUser} />
      )}
      <div className="w-full p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
