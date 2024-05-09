import { Inter } from "next/font/google";
import HomePage from "@/components/Page/Home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
