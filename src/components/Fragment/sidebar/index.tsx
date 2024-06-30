import {
  AlignLeft,
  ChevronRight,
  CircleChevronDown,
  CircleChevronUp,
  LogOut,
} from "lucide-react";
import Button from "@/components/UI/Button";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Sidebar = (props: any) => {
  const { profile } = props;
  const session: any = useSession();
  const [showDropdown, setDropdown] = useState(false);
  const [open, setOpen] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref: any = useRef<HTMLDivElement>(null);
  const { links } = props;

  const active = usePathname();

  const toggleSidebar = () => {
    setOpen(!open);
  };
  const handleClickOutsideNav = (e: MouseEvent) => {
    if (ref.current && !ref.current?.contains(e.target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideNav);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNav);
    };
  }, [ref]);
  return (
    <aside className="fixed bottom-0 w-full md:w-auto md:h-screen md:sticky md:top-0">
      <nav className="hidden h-full md:flex flex-col bg-white border-r shadow-sm">
        <div className=" p-4 pb-2 border-b flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/hi.png"
              alt="logo"
              width={200}
              height={200}
              className={`overflow-hidden transition-all md:w-0 ${
                open ? "xl:w-32 " : "md:w-32 xl:w-0"
              }`}
            />
          </Link>
          <Button type="button" onClick={toggleSidebar}>
            <AlignLeft />
          </Button>
        </div>
        <ul className="flex-1 px-3 py-5">
          {links.map((link: any, i: any) => (
            <li
              key={i}
              className="relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={link.link}
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
                  link.active
                    ? "bg-gradient-to-tr from-sky-200 to-sky-100 text-sky-800"
                    : "hover:bg-sky-50 text-gray-600"
                }`}
              >
                {link.icon}
                <span
                  className={` overflow-hidden transition-all md:w-0 ${
                    open
                      ? "xl:w-52 xl:ml-3 overflow-hidden"
                      : "md:w-52 md:ml-3 xl:w-0"
                  }`}
                >
                  {link.title}
                </span>
              </Link>
              {hoveredIndex === i && (
                <div
                  className={` ${
                    open ? "xl:hidden " : ""
                  } absolute left-full top-1/2 transform -translate-y-1/2 ml-2 whitespace-nowrap px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 opacity-100 z-20`}
                >
                  {link.title}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="border-t flex p-3 py-6">
          <div
            className={`flex justify-between items-center overflow-hidden transition-all md:w-0 ${
              open ? "xl:w-52 xl:ml-3" : "md:w-52 md:ml-3 xl:w-0"
            }`}
          >
            <div className="leading-4 flex justify-start gap-3 items-center">
              {session.data?.user?.image ? (
                <>
                  {profile.image ? (
                    <Image
                      src={profile?.image}
                      width={500}
                      height={500}
                      alt=""
                      className={`bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full object-cover border`}
                    />
                  ) : (
                    <div className="py-1 px-2 bg-gray flex items-center animate-pulse bg-gray-300 justify-center text-white h-[40px] w-[40px] rounded-full"></div>
                  )}
                </>
              ) : (
                <div className="py-1 px-2 bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full">
                  <p>{session.data?.user?.fullname.charAt(0)}</p>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-black">{profile.fullname}</h4>
                <span className="text-xs text-gray-600">
                  {session.data?.user.email}
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
                  href="/"
                  className="hover:bg-slate-50 w-full h-full text-center py-2 border-b"
                >
                  Beranda
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
      <nav className="border p-1 bg-white z-[99999]">
        <ul className="md:hidden flex justify-center items-center gap-3">
          {links.map((link: any, i: any) => (
            <Link
              href={link.link}
              key={i}
              className={`transition-colors text-xs p-2  cursor-pointer ${
                active === link.link
                  ? " text-sky-800 font-bold border-b-2 border-sky-800"
                  : " text-gray-600 "
              }`}
            >
              <span className="flex justify-center items-center mb-1">
                {link.icon}
              </span>
              <span
                className={`overflow-hidden transition-all text-center
              `}
              >
                {link.title}
              </span>
            </Link>
          ))}
          <div className="flex flex-col-reverse " ref={ref}>
            <Button type="button" onClick={() => setDropdown(!showDropdown)}>
              {showDropdown ? (
                <CircleChevronUp size={20} />
              ) : (
                <CircleChevronDown size={20} />
              )}
            </Button>
            {showDropdown && (
              <div className="-translate-x-32 -translate-y-10 absolute flex flex-col items-center bg-white min-w-[160px] border z-10 rounded-md">
                <Link
                  href="/"
                  className="hover:bg-slate-50 w-full h-full text-center py-2 border-b"
                >
                  Beranda
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
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
