import { request } from "@/utils/service"
import type * as types from "./types/index"


// 查询
export function searchSign(params: types.Search) {
  return request({
    url: "api/sign",
    method: "get",
    params
  })
}

// 导出
export function signDownload(params: any) {
  return request({
    url: "api/sign/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 审批
export function deliveryAuditList(data: types.Delete) {
  return request({
    url: "api/delivery/auditList",
    method: "put",
    data
  })
}
