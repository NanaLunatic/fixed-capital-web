import { request } from "@/utils/service"
import type * as types from "./types/index"


// 查询
export function searchNote(params: types.Search) {
  return request({
    url: "api/note",
    method: "get",
    params
  })
}

// 导出
export function noteDownload(params: any) {
  return request({
    url: "api/note/download",
    method: "get",
    params,
    responseType: "blob"
  })
}
