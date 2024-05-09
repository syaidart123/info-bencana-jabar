import Footer from "@/components/Layout/footer";
import Navbar from "@/components/Fragment/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const navDisable = ["auth", "admin","dashboard"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      {!navDisable.includes(pathname.split("/")[1]) && <Navbar />}
      <Component {...pageProps} />
      {!navDisable.includes(pathname.split("/")[1]) && <Footer />}
    </SessionProvider>
  );
}
