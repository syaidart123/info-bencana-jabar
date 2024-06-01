import AidAdminView from "@/components/Page/Admin/AidAdminView";
import aidService from "@/services/aid";
import React from "react";

const AidAdminPage = (props: any) => {
  const { aids } = props;
  return <AidAdminView aids={aids} />;
};

export default AidAdminPage;

export async function getServerSideProps() {
  const { data } = await aidService.getAid();
  return {
    props: {
      aids: data.data,
    },
  };
}
