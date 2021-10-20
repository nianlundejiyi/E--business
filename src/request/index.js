import axios from "axios";
import store from '../store/index.js'
export default function(config) {
  const instance = axios.create({
    //baseURL: process.env.VUE_APP_BASE_API,
    baseURL: "/api",
    timeout: 1000,
  });
  // 添加请求拦截器
  instance.interceptors.request.use(
    function(config) {

      // 在发送请求之前做些什么
      // store.commit('show1',true)
      console.log(config);
      if (config.url != "/login" && config.url != "/register" &&localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem("token");
        
      }
      return config;
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      // store.commit('show1',false)
      return response.data;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );

  return instance(config);
}
