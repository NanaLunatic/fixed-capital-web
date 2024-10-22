import { request } from "@/utils/service"
import type * as types from "./types/index"


 /**
 *****放行申请  -- 开始
 *
 */

 export function searchThroughRequest(params: types.Search) {
  return request({
    url: "api/throughRequest",
    method: "get",
    params
  })
}

// 导出
export function throughRequestDownload(params: any) {
  return request({
    url: "api/throughRequest/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

/**
 *****放行申请  -- 结束
 *
 */



  /**
 *****放行记录  -- 开始
 *
 */

 export function searchThrough(params: types.Search) {
  return request({
    url: "api/through",
    method: "get",
    params
  })
}

// 导出
export function throughDownload(params: any) {
  return request({
    url: "api/through/download",
    method: "get",
    params,
    responseType: "blob"
  })
}


// 放行
export function postThrough(data: any) {
  return request({
    url: "api/through",
    method: "post",
    data
  })
}

/**
 *****放行记录  -- 结束
 *
 */
