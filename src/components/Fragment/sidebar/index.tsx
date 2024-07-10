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
  const { profile, links } = props;
  const [showDropdown, setDropdown] = useState(false);
  const [open, setOpen] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref = useRef<HTMLDivElement>(null);
  const session: any = useSession();
  const active = usePathname();

  const toggleSidebar = () => {
    setOpen(!open);
  };
  const handleClickOutsideNav = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleClickOutsideNav);
    return () => {
      document.removeEventListener("mousemove", handleClickOutsideNav);
    };
  }, [ref]);
  return (
    <aside
      className="fixed bottom-0 w-full md:sticky md:top-0 md:h-screen md:w-auto"
      ref={ref}
    >
      <nav className="hidden h-full flex-col border-r bg-white shadow-sm md:flex">
        <div className="flex items-center justify-between border-b p-4 pb-2">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={200}
              height={200}
              className={`h-20 overflow-hidden transition-all md:w-0 ${
                open ? "xl:w-56" : "md:w-56 xl:w-0"
              }`}
            />
          </Link>
          <Button type="button" onClick={toggleSidebar}>
            <AlignLeft color="gray" />
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
                className={`relative ${
                  link.link === active ? "bg-sky-100" : ""
                } my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${
                  link.active
                    ? "bg-gradient-to-tr from-sky-200 to-sky-100 text-sky-800"
                    : "text-gray-600 transition-colors hover:bg-sky-100"
                }`}
              >
                {link.icon}
                <span
                  className={`overflow-hidden transition-all md:w-0 ${
                    open
                      ? "overflow-hidden xl:ml-3 xl:w-52"
                      : "md:ml-3 md:w-52 xl:w-0"
                  }`}
                >
                  {link.title}
                </span>
              </Link>
              {hoveredIndex === i && (
                <div
                  className={` ${
                    open ? "xl:hidden" : ""
                  } absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-100 shadow-sm transition-opacity duration-300`}
                >
                  {link.title}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex border-t p-3 py-6">
          <div
            className={`flex items-center justify-between overflow-hidden transition-all md:w-0 ${
              open ? "xl:ml-3 xl:w-52" : "md:ml-3 md:w-52 xl:w-0"
            }`}
          >
            <div className="flex items-center justify-start gap-3 leading-4">
              {session.data?.user?.image ? (
                <>
                  {profile.image ? (
                    <Image
                      src={profile?.image}
                      width={500}
                      height={500}
                      alt=""
                      className={`bg-gray flex h-[40px] w-[40px] items-center justify-center rounded-full border bg-gray-400 object-cover text-white`}
                    />
                  ) : (
                    <div className="bg-gray flex h-[40px] w-[40px] animate-pulse items-center justify-center rounded-full bg-gray-300 px-2 py-1 text-white"></div>
                  )}
                </>
              ) : (
                <div className="bg-gray flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-400 px-2 py-1 text-white">
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
          <div className="flex flex-col-reverse">
            <Button type="button" onClick={() => setDropdown(!showDropdown)}>
              <ChevronRight size={20} />
            </Button>
            {showDropdown && (
              <div className="absolute z-10 flex min-w-[160px] -translate-y-5 translate-x-6 flex-col items-center rounded-md border bg-white">
                <Link
                  href="/"
                  className="h-full w-full border-b py-2 text-center hover:bg-slate-50"
                >
                  Beranda
                </Link>
                <Link
                  href="/auth/login"
                  type="button"
                  className="flex w-full items-center justify-center py-1 text-red-500 hover:bg-slate-50"
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
      <nav className="z-[99999] border bg-white p-1">
        <ul className="flex items-center justify-center gap-3 md:hidden">
          {links.map((link: any, i: any) => (
            <Link
              href={link.link}
              key={i}
              className={`cursor-pointer p-2 text-xs transition-colors ${
                active === link.link
                  ? "border-b-2 border-sky-800 font-bold text-sky-800"
                  : "text-gray-600"
              }`}
            >
              <span className="mb-1 flex items-center justify-center">
                {link.icon}
              </span>
              <span className={`overflow-hidden text-center transition-all`}>
                {link.title}
              </span>
            </Link>
          ))}
          <div className="flex flex-col-reverse">
            <Button type="button" onClick={() => setDropdown(!showDropdown)}>
              {showDropdown ? (
                <CircleChevronUp size={20} />
              ) : (
                <CircleChevronDown size={20} />
              )}
            </Button>
            {showDropdown && (
              <div className="absolute z-10 flex min-w-[160px] -translate-x-32 -translate-y-10 flex-col items-center rounded-md border bg-white">
                <Link
                  href="/"
                  className="h-full w-full border-b py-2 text-center hover:bg-slate-50"
                >
                  Beranda
                </Link>
                <Link
                  href="/auth/login"
                  type="button"
                  className="flex w-full items-center justify-center py-1 text-red-500 hover:bg-slate-50"
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
