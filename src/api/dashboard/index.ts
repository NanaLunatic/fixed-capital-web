import { request } from "@/utils/service"
import type * as types from "./types/index"

// 入库货量
export function biStorageAmount() {
  return request({
    url: "api/bi/storageAmount",
    method: "get"
  })
}

// 地图
export function biDistribution() {
  return request({
    url: "api/bi/distribution",
    method: "get"
  })
}

// 资产状态
export function biAssetsStatus() {
  return request({
    url: "api/bi/assetsStatus",
    method: "get"
  })
}

// 资产详情
export function biAssetsDetails() {
  return request({
    url: "api/bi/assetsDetails",
    method: "get"
  })
}

// 近一年出/入库情况
export function biOutAndPutStorage() {
  return request({
    url: "api/bi/outAndPutStorage",
    method: "get"
  })
}
