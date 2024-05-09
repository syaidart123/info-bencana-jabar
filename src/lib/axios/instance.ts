import axios from "axios";

const headers={
  Accept:"application/json",
  "Content-Type":"application/json",
  "Cache-Control":"no-cache",
  Expires:0
}

const instance = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
})

instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// instance.interceptors.response.use(response => {
//   return response
// }, error => {
//   return Promise.reject(error)
// })

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Respons diterima dengan status tidak berhasil
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    } else if (error.request) {
      // Permintaan tidak mendapatkan respons
      console.error('No response received:', error.request);
    } else {
      // Kesalahan lainnya
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);



export default instance;