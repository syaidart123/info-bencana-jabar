import instance from "@/lib/axios/instance";


const aidService = {
    getAid: () => instance.get('/api/aid'),
    addAid: (data: any) => instance.post('/api/aid', data),
    updateAid: (id: any, data: any) => instance.put(`/api/aid/${id}`, {data}),
    deleteAid: (id: string) => instance.delete(`/api/aid/${id}`),
}

export default aidService;