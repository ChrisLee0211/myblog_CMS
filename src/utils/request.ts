import axios, { AxiosInstance } from "axios";
import { message, Modal } from "antd";
import createHistory from "history/createHashHistory";
import store from "@/store";
import intl from "react-intl-universal";

const history = createHistory();

// create an axios instance
const service: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // api的base_url
    // baseURL: '/api', // api的base_url
    timeout: 50000, // request timeout
    headers: { "Content-Type": "application/json;charset=UTF-8" }
});

// request interceptor
service.interceptors.request.use((config) => {
    // Do something before request is sent
    if (localStorage.getItem("token")) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.url = `${config.url}?token=${localStorage.getItem("token")}&flagsign=1`;
    } else {
        config.url = `${config.url}?flagsign=1`;
    }
    return config;
}, (error) => {
    // Do something with request error
    message.error("请求失败");
    console.log(error); // for debug
    Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
    (response) => {
        // 增加权限拦截
        const res = response.data;
        /**
         * http的code
         */
        res.status = response.status;
        res.statusText = response.statusText;
        res.headers = response.headers;
        res.config = response.config;
        res.request = response.request;
        if (res.code === 403) {
            message.error("暂无权限进行该操作");
        }
        if (res.code === 401) {
            let secondsToGo = 2;
            const modal = Modal.success({
                title: `${intl.get("messageBox.tip")}`,
                content: `${intl.get("messageBox.tokenInvalid")}`
            });
            const timer = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                    content: `${intl.get("messageBox.tokenInvalid")}`,
                });
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                modal.destroy();
            }, secondsToGo * 1000);
            localStorage.setItem("token", "");
            history.push("/login");
        }
        return res;
    },
    (error) => {
        if (error.message === "Request failed with status code 401") {
            let secondsToGo = 3;
            const modal = Modal.success({
                title: "登陆提示",
                content: "当前登陆已失效，即将跳转到登陆页"
            });
            const timer = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                    content: `This modal will be destroyed after ${secondsToGo} second.`,
                });
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                modal.destroy();
            }, secondsToGo * 1000);
            localStorage.setItem("token", "");
            history.push("/login");
        } else {
            console.log(error);
            message.error("请求错误");
        }
        return Promise.reject(error);
    }
);

export default service;
