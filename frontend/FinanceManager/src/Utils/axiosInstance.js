import axios from "axios";
import {BASE_URL} from "./apiPaths.js"; ///ESM ecmaSCript module    check for "type: module" in package.json
// const {BASE_URL} = require('./apiPaths'); //CommonJS

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        // console.log("inside request");
        return config;
    },
    (error) => {
        // console.log("inside request intersecpor");
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle common errors globally
        if(error.response){
            if(error.response.status === 401){
                //Redirect to login page
                window.location.href = "/login";
            }
            else if(error.response.status === 500){
                console.error("Server error. Please try again later.")
            }
        }
        else if(error.code === "ECONNABORTD"){
            console.error("Request timeout. Please try again.")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;