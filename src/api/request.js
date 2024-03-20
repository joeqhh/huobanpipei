import axios from "axios";
import qs from "qs";
import {
  getCurrentUserState,
  setCurrentUserState,
} from "../service/UserService";

import { teamStatusEnum } from "@/constants/TeamConstant";

const baseURL = "http://localhost:7529/api";

const request = axios.create({
  baseURL: baseURL,
});

request.defaults.withCredentials = true;

export const searchUserByTags = (tagList) => {
  return request
    .get("/user/search/tags", {
      params: {
        tagList: tagList,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    })
    .then(function (response) {
      // 处理成功情况
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
      return error;
    })
    .finally(function () {
      // 总是会执行
    });
};

export const userLogin = (user) => {
  return request.post("/user/login", {
    userAccount: user.用户名,
    userPassword: user.密码,
  });
};

export const getCurrentUser = async () => {
  let currentUser = getCurrentUserState();
  if (currentUser) return currentUser;
  const { data: res } = await request.get("/user/get/login");
  if (res.code === 0) {
    setCurrentUserState(res.data);
    return res.data;
  }
  return null;
};

export const updateUser = (user) => {
  return request.post("/user/update", {
    id: user.id,
    [user.editKey]: user.currentValue,
  });
};

export const getRecommendUser = (pageNum, pageSize) => {
  return request.get("/user/recommend", {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};

export const addTeam = (teamAddRequest) => {
  return request.post("/team/save", {
    ...teamAddRequest,
  });
};

export const getTeamList = async () => {
  let result = await request.get("/team/list");
  result.data.data.forEach((element) => {
    element.status = teamStatusEnum[element.status];
  });
  return result;
};

export const joinTeam = (teamJoinRequest) => {
  return request.post("/team/join", {
    ...teamJoinRequest,
  });
};

export const getJoinTeam = async (userId) => {
  let result = await request.get("/team/list/join", {
    params: {
      userId: userId,
    },
  });
  result.data.data.forEach((element) => {
    element.status = teamStatusEnum[element.status];
  });
  return result;
};

export const getCreateTeam = async (userId) => {
  let result = await request.get("/team/list/myCreate", {
    params: {
      userId: userId,
    },
  });
  result.data.data.forEach((element) => {
    element.status = teamStatusEnum[element.status];
  });
  return result;
};

export const quitTeam = (teamId) => {
  return request.post("/team/quit", {
    teamId: teamId,
  });
};

export const updateTeam = (newTeam) => {
  return request.post("/team/update", {
    ...newTeam,
  });
};

export const matchUser = (matchUserReqquest) => {
  return request.get("/user/match", {
    params: {
      ...matchUserReqquest,
    },
  });
};

// // 添加请求拦截器
// request.interceptors.request.use(
//   function (config) {
//     // 在发送请求之前做些什么
//     console.log(config);
//     return config;
//   },
//   function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// // 添加响应拦截器
// request.interceptors.response.use(
//   function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response;
//   },
//   function (error) {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );
