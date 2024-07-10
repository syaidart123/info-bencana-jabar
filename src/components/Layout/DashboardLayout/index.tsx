import Sidebar from "@/components/Fragment/sidebar";
import useSWR from "swr";
import { BarChart3, CircleUser, MonitorUp, Newspaper } from "lucide-react";
import React from "react";
import fetcher from "@/lib/swr/fetcher";
import LoadingPage from "../LoadingPage";
import Custom500 from "@/pages/500";

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
    title: "Laporan",
    link: "/admin/laporan",
    icon: <Newspaper />,
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
  {
    title: "Laporan",
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

  if (error) return <Custom500 />;
  if (isLoading) return <LoadingPage />;
  return (
    <div className="flex justify-between">
      {type === "Admin" ? (
        <Sidebar links={listSidebarAdmin} profile={data} />
      ) : (
        <Sidebar links={listSidebarUser} profile={data} />
      )}
      <div className="w-full p-2 lg:p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
