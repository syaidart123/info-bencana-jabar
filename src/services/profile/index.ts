import instance from "@/lib/axios/instance";

const serviceProfile = {
  getProfile: (token: any) =>
    instance.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProfile: (id:any, data: any, token: any) =>
    instance.put(`/api/user/profile/${id}`, {data}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
};

export default serviceProfile