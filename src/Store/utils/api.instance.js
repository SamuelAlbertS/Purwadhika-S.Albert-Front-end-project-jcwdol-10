import axios from "axios";

// @create instance
const api = axios.create({
    // baseURL : process.env.REACT_APP_API_URL,
    //baseURL : "http://localhost:2000",
    baseURL : "https://minpro-blog.purwadhikabootcamp.com/api",
    timeout : 5000,
})


// @interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log(token)
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export default api;