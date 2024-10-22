import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "auth/login",
    method: "post",
    data
  })
}

/** 获取登录信息-用于链接带token免登录 */
export function usersActivateApi() {
  return request<Login.UsersActivateResponseData>({
    url: "api/users/activate",
    method: "get",
    // data
  })
}


// 登出接口
export function loginLogout() {
  return request({
    url: "auth/logout",
    method: "DELETE",
  })
}

/** 获取用户菜单 */
export function UserMenusBuildAll() {
  return request({
    url: "api/menus/buildAll",
    method: "get"
  })
}

/** 获取个人信息 */
export function getUserInfo() {
  return request({
    url: "/auth/info",
    method: "get"
  })
}

/** 修改个人手机 */
export function editUserPhone(data: any) {
  return request({
    url: "/api/users/center",
    method: "PUT",
    data
  })
}

/** 修改个人密码 */
export function editUserPass(data: any) {
  return request({
    url: "/api/users/updatePass",
    method: "POST",
    data
  })
}
