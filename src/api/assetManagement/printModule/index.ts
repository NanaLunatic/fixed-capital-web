import { request } from "@/utils/service"
import type * as types from "./types/index"

// 左侧元素查询
export function searchModel() {
  return request({
    url: "api/model",
    method: "get"
  })
}

// 模版列表查询
export function searchPrintModel(params: types.Search) {
  return request({
    url: "api/printModel",
    method: "get",
    params
  })
}

// 删除
export function deletePrintModel(data: types.Delete) {
  return request({
    url: "api/printModel",
    method: "DELETE",
    data
  })
}

// 导出列表数据
export function printModelDownload(params: any) {
  return request({
    url: "api/printModel/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 打印详情
export function detailPrintModelPrint(params: types.Delete) {
  return request({
    url: "api/printModel/print",
    method: "get",
    params
  })
}

// 打印记录
export function printRecords(data: any) {
  return request({
    url: "api/printRecords",
    method: "Post",
    data
  })
}
