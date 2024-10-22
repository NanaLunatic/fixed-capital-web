import { request } from "@/utils/service"
import type * as types from "./types/index"

/**
 *****资产列表
 *
 */

// 查询
export function searchAssets(params: types.Search) {
  return request({
    url: "api/assets",
    method: "get",
    params
  })
}

// 删除
export function deleteAssets(data: types.Delete) {
  return request({
    url: "api/assets",
    method: "DELETE",
    data
  })
}

// 入库
export function assetsStorage(data: types.Delete) {
  return request({
    url: "api/assets/storage",
    method: "Post",
    data
  })
}

// 导出
export function assetsDownload(params: any) {
  return request({
    url: "api/assets/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 导入
export function assetsUpload(data: any) {
  return request({
    url: "api/assets/upload",
    method: "POST",
    data
  })
}


/**
 *****资产列表  -- 结束
 *
 */


 /**
 *****出库记录  -- 开始
 *
 */
// 查询
export function searchDelivery(params: types.Search) {
  return request({
    url: "api/delivery",
    method: "get",
    params
  })
}

// 资产出库查询
export function searchDeliveryFindUser(params: types.Search) {
  return request({
    url: "api/delivery/findUser",
    method: "get",
    params
  })
}

// 导出
export function deliveryDownload(params: any) {
  return request({
    url: "api/delivery/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 归还
export function postRestorations(data: types.Delete) {
  return request({
    url: "api/delivery",
    method: "Post",
    data
  })
}


// 确认
export function postNodesAudit(data: types.Delete) {
  return request({
    url: "api/nodes/audit",
    method: "Put",
    data
  })
}

/**
 *****出库记录  -- 结束
 *
 */


 /**
 *****入库记录  -- 开始
 *
 */

 // 查询
export function searchStorages(params: types.Search) {
  return request({
    url: "api/storages",
    method: "get",
    params
  })
}

// 导出
export function storagesDownload(params: any) {
  return request({
    url: "api/storages/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

 /**
 *****入库记录  -- 结束
 *
 */


  /**
 *****报废记录  -- 开始
 *
 */

 export function searchScrap(params: types.Search) {
  return request({
    url: "api/scrap",
    method: "get",
    params
  })
}

// 导出
export function scrapDownload(params: any) {
  return request({
    url: "api/scrap/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

/**
 *****报废记录  -- 结束
 *
 */


 /**
 *****维修记录  -- 开始
 *
 */

 export function searchRepair(params: types.Search) {
  return request({
    url: "api/repair",
    method: "get",
    params
  })
}

// 导出
export function repairDownload(params: any) {
  return request({
    url: "api/repair/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

/**
 *****维修记录  -- 结束
 *
 */
