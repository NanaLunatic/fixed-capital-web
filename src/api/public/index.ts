import { request } from "@/utils/service"

// 类型下拉
export function typesFindAll() {
  return request({
    url: "api/types/findAll",
    method: "get"
  })
}

// 仓位下拉
export function locationsFindAll() {
  return request({
    url: "api/locations/findAll",
    method: "get"
  })
}

// 单位下拉
export function unitsFindAll() {
  return request({
    url: "api/units/findAll",
    method: "get"
  })
}

// 领用人下拉
export function commonRecipient() {
  return request({
    url: "api/common/recipient",
    method: "get"
  })
}

// 申请单号下拉
export function commonNote() {
  return request({
    url: "api/common/note",
    method: "get"
  })
}

// 资产编码下拉
export function commonAssets() {
  return request({
    url: "api/common/assets",
    method: "get"
  })
}

// 放行主管下拉
export function commonSupervisor() {
  return request({
    url: "api/common/supervisor",
    method: "get"
  })
}

// 签核流程
export function approveNodes(params: null) {
  return request({
    url: `api/nodes/${params}`,
    method: "get",
  })
}
