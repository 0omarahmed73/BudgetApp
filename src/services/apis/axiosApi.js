import axios from "axios";

const APIURL = 'http://localhost:5100/'
const axiosAPI = axios.create({
  baseURL : APIURL
})
export default axiosAPI