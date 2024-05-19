import instance from "@/lib/axios/instance";

const serviceUser = {
  getSubmissionByUser: () => instance.get("/api/user/submission"),
};

export default serviceUser;
