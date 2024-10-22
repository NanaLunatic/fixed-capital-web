import { request } from "@/utils/service"
import type * as log from "./types/logInfo"

/**
 *****登录日志
 *
 */

// 查询登录日志
export function getLoginLog(params: Pagination) {
  return request({
    url: "auth/online",
    method: "get",
    params
  })
}

// 登录日志--模糊查询
export function searchLoginLog(params: Pagination) {
  return request({
    url: "auth/online",
    method: "get",
    params
  })
}

// 登录日志--导出
export function exportLoginLog(params: any) {
  return request({
    url: "auth/online/download",
    method: "get",
    params,
    responseType: "blob"
  })
}
// 登录日志--登出
export function exitLoginLog(data: any) {
  return request({
    url: "auth/online",
    method: "DELETE",
    data
  })
}

/**
 *****系统日志
 *
 */

// 查询系统日志
export function getSystemLog(params: Pagination) {
  return request({
    url: "api/logs",
    method: "get",
    params
  })
}

// 系统日志--模糊查询
export function searchSystemLog(params: Pagination) {
  return request({
    url: "api/logs",
    method: "get",
    params
  })
}

// 系统日志--导出
export function exportSystemLog(params: any) {
  return request({
    url: "api/logs/download",
    method: "get",
    params,
    responseType: "blob"
  })
}
// 系统日志--查看异常
export function errorSystemLog(id: any) {
  return request({
    url: `api/logs/error/${id}`,
    method: "GET"
  })
}
