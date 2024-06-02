import instance from "../axios/instance";

const fetcher = (url: string) => instance.get(url).then((res) => res.data.data);

export default fetcher;
