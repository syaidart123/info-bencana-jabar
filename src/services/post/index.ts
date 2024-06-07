import instance from "@/lib/axios/instance";

const postService = {
  getPost: () => instance.get("/api/post"),
  getDetailPost:(id:string)=> instance.get(`/api/post/${id}`),
  addPost: (data: any) => instance.post("/api/post", data),
  updatePost: (id: any, data: any) => instance.put(`/api/post/${id}`, { data }),
  deletePost: (id: string) => instance.delete(`/api/post/${id}`),
};

export default postService;
