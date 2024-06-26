import HomePage from "@/components/Page/Home";
import submissionService from "@/services/submission";
import Head from "next/head";

export default function Home({ submission }: any) {
  return (
    <>
      <Head>
        <title>Info Bencana Jabar | Beranda</title>
      </Head>
      <HomePage submission={submission} />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await submissionService.getSubmission();
  return {
    props: {
      submission: data.data,
    },
  };
}
