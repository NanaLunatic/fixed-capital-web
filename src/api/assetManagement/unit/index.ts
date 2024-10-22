import { request } from "@/utils/service"
import type * as types from "./types/index"


// 查询
export function searchUnits(params: types.Search) {
  return request({
    url: "api/units",
    method: "get",
    params
  })
}

// 导出
export function unitsDownload(params: any) {
  return request({
    url: "api/units/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 删除
export function deleteUnits(data: types.Delete) {
  return request({
    url: "api/units",
    method: "DELETE",
    data
  })
}
