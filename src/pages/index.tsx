import HomePage from "@/components/Page/Home";
import submissionService from "@/services/submission";


export default function Home({submission}:any) {
  
  return (
    <>
      <HomePage submission={submission} />
    </>
  );
}

export async function getServerSideProps() {
  const {data} = await submissionService.getSubmission();
  return {
    props: {
      submission: data.data,
    },  
  }
}
