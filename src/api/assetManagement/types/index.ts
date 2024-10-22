import { request } from "@/utils/service"
import type * as types from "./types/index"


// 查询
export function searchTypes(params: types.Search) {
  return request({
    url: "api/types",
    method: "get",
    params
  })
}

// 导出
export function typesDownload(params: any) {
  return request({
    url: "api/types/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 删除
export function deleteTypes(data: types.Delete) {
  return request({
    url: "api/types",
    method: "DELETE",
    data
  })
}
