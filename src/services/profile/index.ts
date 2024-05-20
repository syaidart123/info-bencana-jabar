import instance from "@/lib/axios/instance";

const serviceProfile = {
  getProfile: () => instance.get("http://localhost:3000/api/user/profile"),
  updateProfile: (id: any, data: any) =>
    instance.put(`/api/user/profile/${id}`, { data }),
};

export default serviceProfile;
