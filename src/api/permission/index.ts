import { request } from "@/utils/service"
import type * as power from "./types/permission"

/**
 *****菜单接口
 *
 */

// 新增菜单
export function addMenus(data: power.AddMenus) {
  return request({
    url: "api/menus ",
    method: "POST",
    data
  })
}

// 删除菜单
export function deleteMenus(data: power.DeleteMenus) {
  return request({
    url: "api/menus ",
    method: "DELETE",
    data
  })
}

// 修改菜单
export function editMenus(data: power.AddMenus) {
  return request({
    url: "api/menus ",
    method: "PUT",
    data
  })
}
// 查询菜单
export function getMenus() {
  return request({
    url: "api/menus/getBuild",
    method: "get"
  })
}

// 菜单模糊查询
export function searchMenus(params: power.SearchMenus) {
  return request({
    url: "api/menus",
    method: "get",
    params
  })
}

/**
 *****角色接口
 *
 */
// 角色查询
export function getRoles(params: power.GetRoles) {
  return request({
    url: "api/roles",
    method: "get",
    params
  })
}

// 角色新增
export function addRoles(data: power.AddRoles) {
  return request({
    url: "api/roles",
    method: "POST",
    data
  })
}
// 角色修改
export function editRoles(data: power.AddRoles) {
  return request({
    url: "api/roles",
    method: "PUT",
    data
  })
}

// 角色删除
export function deleteRoles(data: power.AddRoles) {
  return request({
    url: "api/roles",
    method: "DELETE",
    data
  })
}

// 角色模糊查询
export function searchRoles(params: power.SearchRoles) {
  return request({
    url: "api/roles",
    method: "GET",
    params
  })
}
//角色--导出
export function exportRoles(params: any) {
  return request({
    url: "api/roles/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

/**
 *****组织架构接口
 *
 */
// 组织架构查询
export function getDept(params: power.AddDept) {
  return request({
    url: "api/dept",
    method: "GET",
    params
  })
}

// 组织架构新增
export function addDept(data: power.AddDept) {
  return request({
    url: "api/dept",
    method: "POST",
    data
  })
}
// 组织架构修改
export function editDept(data: power.AddRoles) {
  return request({
    url: "api/dept",
    method: "PUT",
    data
  })
}

// 组织架构删除
export function deleteDept(data: power.AddRoles) {
  return request({
    url: "api/dept",
    method: "DELETE",
    data
  })
}

// 组织架构模糊查询
export function searchDept(params: power.SearchRoles) {
  return request({
    url: "api/dept",
    method: "GET",
    params
  })
}

/**
 *****用户接口
 *
 */
// 用户查询
export function getUsers(params: power.GetRoles) {
  return request({
    url: "api/users",
    method: "GET",
    params
  })
}

// 用户新增
export function addUsers(data: power.AddUsers) {
  return request({
    url: "api/users",
    method: "POST",
    data
  })
}
// 用户修改
export function editUsers(data: power.AddUsers) {
  return request({
    url: "api/users",
    method: "PUT",
    data
  })
}

// 用户删除
export function deleteUsers(data: power.AddUsers) {
  return request({
    url: "api/users",
    method: "DELETE",
    data
  })
}

// 用户模糊查询
export function searchUsers(params: power.SearchRoles) {
  return request({
    url: "api/users",
    method: "GET",
    params
  })
}

//用户--导出
export function exportUsers(params: any) {
  return request({
    url: "api/users/download",
    method: "get",
    params,
    responseType: "blob"
  })
}

// 用户查询签核权限
export function getJob() {
  return request({
    url: "api/job",
    method: "GET"
  })
}

// 用户查询角色下拉框
export function allRoles() {
  return request({
    url: "api/roles/allRoles",
    method: "GET"
  })
}

// 密码重置
export function usersReset(data: any) {
  return request({
    url: "api/users/reset",
    method: "POST",
    data
  })
}
