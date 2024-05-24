import serviceProfile from "@/services/profile";
import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react";
import Button from "@/components/UI/Button";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Sidebar = (props: any) => {
  
  const session: any = useSession();
  const [showDropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await serviceProfile.getProfile();
        setProfile(data.data);
      };
      getProfile();
    }
  }, [session, profile]);
  const handleClickOutside: any = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [open, setOpen] = useState(true);
  const { links } = props;
  const active = usePathname();
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <aside className="h-screen sticky top-0">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className=" p-4 pb-2 border-b flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/hi.png"
              alt="logo"
              width={200}
              height={200}
              className={`overflow-hidden transition-all ${
                open ? "w-32" : "w-0"
              }`}
            />
          </Link>
          <Button
            type="button"
            className="p-1.5"
            onClick={toggleSidebar}
          >
            {open ? (
              <ChevronsLeft color="blue" />
            ) : (
              <ChevronsRight color="blue" />
            )}
          </Button>
        </div>
        <ul className="flex-1 px-3 py-5">
          {links.map((link: any, i: any) => (
            <Link
              href={link.link}
              key={i}
              className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
                active === link.link
                  ? "bg-gradient-to-tr from-sky-200 to-sky-100 text-sky-800"
                  : "hover:bg-sky-50 text-gray-600 "
              }`}
            >
              {link.icon}{" "}
              <span
                className={`overflow-hidden transition-all ${
                  open ? "w-52 ml-3" : "w-0"
                }`}
              >
                {link.title}
              </span>
            </Link>
          ))}
        </ul>
        <div className="border-t flex p-3 py-6">
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              open ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4 flex justify-start gap-3 items-center">
              {session.data?.user?.image ? (
                <Image
                  src={profile.image}
                  width={500}
                  height={500}
                  alt=""
                  className={`${
                    isLoading && "animate-pulse"
                  } bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full object-cover border`}
                />
              ) : (
                <div
                  ref={ref}
                  className="py-1 px-2 bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full"
                >
                  <p>{session.data?.user?.fullname.charAt(0)}</p>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-black">
                  {profile.fullname}
                </h4>
                <span className="text-xs text-gray-600">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse" ref={ref}>
            <Button type="button" onClick={() => setDropdown(!showDropdown)}>
              <ChevronRight size={20} />
            </Button>
            {showDropdown && (
              <div className="translate-x-6 -translate-y-5 absolute flex flex-col items-center bg-white min-w-[160px] border z-10 rounded-md">
                <Link
                  href="/admin/profile"
                  className="hover:bg-slate-50 w-full h-full text-center py-2 border-b"
                >
                  Profile
                </Link>
                <Link
                  href="/auth/login"
                  type="button"
                  className="hover:bg-slate-50 text-red-500 w-full py-1 flex justify-center items-center"
                  onClick={() => signOut()}
                >
                  <p className="mr-1">Logout</p>
                  <LogOut size={15} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;




