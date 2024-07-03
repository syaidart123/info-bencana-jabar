import Footer from "@/components/Layout/footer";
import Navbar from "@/components/Fragment/navbar";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import Toaster from "@/components/UI/Toaster";
import { Roboto } from "next/font/google";

const montserrat = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "400", "700", "900"],
});

const navDisable = ["auth", "admin", "dashboard"];

type propsTypes = {
  children: React.ReactNode;
};

export default function AppShell(props: propsTypes) {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);
  return (
    <>
      <div className={montserrat.className}>
        {!navDisable.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
        {!navDisable.includes(pathname.split("/")[1]) && <Footer />}
      </div>
    </>
  );
}
