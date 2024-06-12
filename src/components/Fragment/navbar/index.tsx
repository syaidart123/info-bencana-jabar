import Button from "@/components/UI/Button";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const listNavbar = [
  {
    title: "Beranda",
    link: "/",
  },
  {
    title: "Berita",
    link: "/berita",
  },
  {
    title: "Data Bencana",
    link: "/bencana",
  },
  {
    title: "Lapor Bencana",
    link: "/lapor",
  },
];

const Navbar = () => {
  const [showDropdown, setDropdown] = useState(false);
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

  const handleClickOutside: any = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <nav className="sticky flex top-0 w-screen z-50 py-5 justify-around items-center border-b bg-white">
      <div>
        <Image
          src="/images/hi.png"
          width={500}
          height={500}
          alt="Human Initiative"
          className="w-24 h-10 cursor-pointer"
          loading="lazy"
        />
      </div>
      <div className="flex">
        <ul className="flex gap-3">
          {listNavbar.map((list, i) => {
            return (
              <Link
                href={list.link}
                className={`text-sky-500 hover:border-b-2 hover:border-sky-600 hover:text-sky-600 ${
                  pathname === list.link
                    ? "font-bold text-sky-600 border-b-2 border-sky-600"
                    : ""
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
        <div className="flex gap-4 items-center">
          <div className="relative">
            {session.data?.user.image ? (
              <Image
                alt={session.data?.user?.fullname}
                src={session.data?.user?.image}
                width={40}
                height={40}
                className="rounded-full w-[45px] h-[45px] cursor-pointer object-cover object-center"
                onClick={() => setDropdown(!showDropdown)}
              />
            ) : (
              <div
                className="py-1 px-2 cursor-pointer bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full"
                onClick={() => setDropdown(!showDropdown)}
              >
                <p>{session.data?.user.fullname.charAt(0)}</p>
              </div>
            )}
            <div
              className={`absolute border right-0 top-[45px] rounded-md flex-col ${
                showDropdown ? "flex z-10" : "hidden"
              }`}
            >
              <button
                onClick={handleDashboard}
                className="w-[150px] flex rounded-t-md  justify-center items-center text-left py-2 px-4 bg-white cursor-pointer border-none text-lg hover:bg-slate-50"
              >
                Dashboard
              </button>
              <button
                onClick={() => signOut()}
                className="w-[150px] text-red-500 rounded-b-md flex justify-center items-center text-left py-2 px-4 bg-white cursor-pointer border-none text-lg hover:bg-slate-50"
              >
                <p className="mr-1">Logout</p>
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button type="button" className=" text-sky-500 border border-sky-500">
            <Link
              href="/auth/login"
              className="bg-white px-4 py-2 rounded-lg border border-sky-500 hover:bg-slate-50"
            >
              Login
            </Link>
          </Button>
          <Button type="button" className=" text-white">
            <Link
              href="/auth/register"
              className="bg-sky-500 px-4 py-2 rounded-lg border hover:bg-sky-600"
            >
              Register
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
