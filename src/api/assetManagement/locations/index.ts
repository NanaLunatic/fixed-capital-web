import { request } from "@/utils/service"
import type * as types from "./types/index"


// 查询
export function searchLocations(params: types.Search) {
  return request({
    url: "api/locations",
    method: "get",
    params
  })
}

// 导出
export function locationsDownload(params: any) {
  return request({
    url: "api/locations/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 删除
export function deleteLocations(data: types.Delete) {
  return request({
    url: "api/locations",
    method: "DELETE",
    data
  })
}
