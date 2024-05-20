import instance from "@/lib/axios/instance";

const submissionService = {
  addSubmission: (data: any) => instance.post("/api/submission", data),
  getSubmission: () => instance.get('/api/submission'),
  updateSubmission: (id: any, data: any) =>
    instance.put(`/api/submission/${id}`, { data }),
  deleteSubmission: (id: string) => instance.delete(`/api/submission/${id}`),
};

export default submissionService;
