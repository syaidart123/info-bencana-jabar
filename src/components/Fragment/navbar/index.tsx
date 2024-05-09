import Button from "@/components/UI/Button";
import serviceProfile from "@/services/profile";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const listNavbar = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Tentang Kami",
    link: "/about",
  },
  {
    title: "Data Bencana",
    link: "/bencana",
  },
  {
    title:"Ajukan Bencana",
    link:"/pengajuanBencana"
  }
];

const Navbar = () => {
  const [showDropdown, setDropdown] = useState(false);
  const [profile,setProfile]=useState<any>({});
  const session: any = useSession();
  
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside: any = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };

  useEffect(()=>{
    if(session.data?.accessToken && Object.keys(profile).length === 0){
      const getProfile = async () => {
        const {data} = await serviceProfile.getProfile(session.data?.accessToken)
        setProfile(data.data)
    }
    getProfile();
    }
  },[session,profile])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        <div
          className="relative inline-block cursor-pointer group-hover:block"
          onClick={() => setDropdown(!showDropdown)}
        >
        {session.data?.user.image ? 
          (<Image src={profile.image} loading="lazy" width={500} height={500} alt="Avatar" className=" bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full object-cover"/>
        )
        :(
          <div
            ref={ref}
            className="py-1 px-2 bg-gray flex items-center bg-gray-400 justify-center text-white h-[40px] w-[40px] rounded-full"
          >
            <p>{session.data?.user.name.charAt(0)}</p>
          </div>
        )}
          {showDropdown && (
            <div className="absolute flex flex-col items-center  bg-white min-w-[160px] border my-1 z-10 rounded-md">
              <Link
                href={session.data?.user.role === "admin"?"/admin":"/dashboard"}
                className="hover:bg-slate-50 w-full h-full text-center py-2 border-b"
              >
                Dashboard
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
      ) : (
        <div className="flex">
          <Button
            type="button"
            className=" text-sky-500  border border-sky-500 me-3 "
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button
            type="button"
            className="bg-sky-500 p-5 text-sky-500"
          >
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
