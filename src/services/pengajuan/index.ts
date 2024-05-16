import instance from "@/lib/axios/instance";

const submissionService = {
  addSubmission: (data: any, token: any) => instance.post("/api/submission", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getSubmission: () =>
    instance.get("/api/submission"),

  updateSubmission: (id: any, data: any, token: string) =>
    instance.put(
      `/api/submission/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteSubmission: (id: string, token: any) =>
    instance.delete(`/api/submission/${id}`, {
      headers: { Authorization: `Bearer ${token}`},
    }),
  getSubmissionByUser: (token: any) =>
    instance.get('/api/submission', {
      headers:{
        Authorization: `Bearer ${token}`
      }
})
};

export default submissionService;
