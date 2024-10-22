import { request } from "@/utils/service"
import type * as types from "./types/index"


// 查询
export function searchTransfer(params: types.Search) {
  return request({
    url: "api/transfer",
    method: "get",
    params
  })
}

// 导出
export function transferDownload(params: any) {
  return request({
    url: "api/transfer/download",
    method: "get",
    params,
    responseType: "blob"
  })
}
