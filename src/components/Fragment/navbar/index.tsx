import Button from "@/components/UI/Button";
import { listNavbar } from "@/utils/listNavbar";
import { AlignJustify, LogOut, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [showDropdown, setDropdown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { push } = useRouter();
  const session: any = useSession();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const handleDashboard = () => {
    if (session.data.user.role === "admin") {
      push("/admin");
    } else {
      push("/dashboard");
    }
  };

  const handleNav = () => {
    setIsActive(!isActive);
    if (showDropdown) {
      setDropdown(false);
    }
  };

  const handleProfile = () => {
    setDropdown(!showDropdown);
    if (isActive) {
      setIsActive(false);
    }
  };

  const handleClickOutsideDashboard: any = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };
  const handleClickOutsideNav: any = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDashboard);
    document.addEventListener("mousedown", handleClickOutsideNav);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDashboard);
      document.removeEventListener("mousedown", handleClickOutsideNav);
    };
  }, [ref]);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between border-b bg-white px-6 md:justify-around`}
    >
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={1000}
          height={1000}
          alt="Human Initiative"
          className="h-20 w-56 cursor-pointer lg:w-56"
          loading="lazy"
        />
      </Link>
      <div className="mr-20 hidden md:flex lg:mr-32">
        <ul className="flex gap-3">
          {listNavbar.map((list, i) => {
            return (
              <Link
                href={list.link}
                className={`cursor-pointer hover:text-primary ${
                  pathname === list.link
                    ? "border-b-2 border-primary font-bold text-primary"
                    : "text-basic"
                }`}
                key={i}
              >
                {list.title}
              </Link>
            );
          })}
        </ul>
      </div>
      {session.data ? (
        <div className="flex items-center gap-4" ref={ref}>
          <div className="relative">
            {session.data?.user.image ? (
              <Image
                alt={session.data?.user?.fullname}
                src={session.data?.user?.image}
                width={40}
                height={40}
                className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover object-center"
                onClick={handleProfile}
              />
            ) : (
              <div
                className="bg-gray flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-gray-400 px-2 py-1 text-white"
                onClick={handleProfile}
              >
                <p>{session.data?.user.fullname.charAt(0)}</p>
              </div>
            )}
            <div
              className={`absolute -right-10 top-[50px] flex-col rounded-md border ${
                showDropdown ? "z-10 flex" : "hidden"
              }`}
            >
              <button
                onClick={handleDashboard}
                className="flex w-[150px] cursor-pointer items-center justify-center rounded-t-md border-none bg-white px-4 py-2 text-left text-lg text-basic hover:bg-slate-50"
              >
                Dashboard
              </button>
              <button
                onClick={() => signOut()}
                className="flex w-[150px] cursor-pointer items-center justify-center rounded-b-md border-none bg-white px-4 py-2 text-left text-lg text-tertiary hover:bg-slate-50"
              >
                <p className="mr-1">Logout</p>
                <LogOut size={15} />
              </button>
            </div>
          </div>
          <div className="relative md:hidden">
            <div>
              <Button type="button" className={""} onClick={handleNav}>
                {isActive ? <X color="gray" /> : <AlignJustify color="gray" />}
              </Button>
            </div>
            <div
              className={`${
                isActive ? "translate-x-0" : "translate-x-[110%]"
              } fixed right-2 top-[70px] w-1/2 overflow-hidden rounded-md border bg-slate-50 px-2 py-2 shadow-md transition-transform duration-500 ease-in-out`}
            >
              <nav>
                <ul className="mt-2 flex flex-col">
                  {listNavbar.map((list, i) => {
                    return (
                      <Link
                        href={list.link}
                        className={`mx-2 my-1 rounded-md px-3 py-2 font-medium transition-colors hover:bg-slate-100 ${
                          pathname === list.link
                            ? "bg-gradient-to-tr from-slate-50 to-secondary text-primary"
                            : "text-basic"
                        }`}
                        key={i}
                      >
                        {list.title}
                      </Link>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3" ref={ref}>
          <div className="relative md:hidden">
            <div>
              <Button
                type="button"
                className={""}
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? <X color="gray" /> : <AlignJustify color="gray" />}
              </Button>
            </div>
            <div
              className={`${
                isActive ? "translate-x-0" : "translate-x-[110%]"
              } fixed right-2 top-14 w-1/2 overflow-hidden rounded-md border bg-slate-50 px-2 py-2 shadow-md transition-transform duration-500 ease-in-out`}
            >
              <nav>
                <ul className="mt-2 flex flex-col">
                  {listNavbar.map((list, i) => {
                    return (
                      <Link
                        href={list.link}
                        className={`mx-2 my-1 rounded-md px-3 py-2 font-medium transition-colors hover:bg-slate-100 ${
                          pathname === list.link
                            ? "bg-gradient-to-tr from-slate-50 to-secondary text-primary"
                            : ""
                        }`}
                        key={i}
                      >
                        {list.title}
                      </Link>
                    );
                  })}
                </ul>
                <hr className="my-3" />
                <div className="flex justify-center gap-3 py-5 md:hidden">
                  <Button
                    type="button"
                    className="border border-primary text-primary"
                  >
                    <Link
                      href="/auth/login"
                      className="rounded-lg border border-primary bg-white px-4 py-2 hover:bg-slate-50"
                    >
                      Login
                    </Link>
                  </Button>
                  <Button type="button" className="text-white">
                    <Link
                      href="/auth/register"
                      className="rounded-lg border bg-primary px-4 py-2 hover:bg-dark"
                    >
                      Register
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
          <div className="hidden gap-3 md:flex">
            <Button
              type="button"
              className="border border-primary text-primary"
            >
              <Link
                href="/auth/login"
                className="rounded-lg border border-primary bg-white px-4 py-2 hover:bg-slate-50"
              >
                Login
              </Link>
            </Button>
            <Button type="button" className="text-white">
              <Link
                href="/auth/register"
                className="rounded-lg border bg-primary px-4 py-2 hover:bg-dark"
              >
                Register
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
