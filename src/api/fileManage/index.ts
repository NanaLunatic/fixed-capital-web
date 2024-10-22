import { request } from "@/utils/service"
import type * as file from "./types/fileManage"

/**
 *****一阶文件接口
 *
 */

// 新增一阶文件
export function addFirstOrder(data: file.AddSpecificat) {
  return request({
    url: "api/first/insert-all",
    method: "POST",
    data
  })
}

// 修改一阶文件
export function editFirstOrder(data: file.AddSpecificat) {
  return request({
    url: "api/first/update-all",
    method: "PUT",
    data
  })
}

// 查询一阶文件
export function getFirstOrder(params: file.Pagination) {
  return request({
    url: "api/first/list",
    method: "GET",
    params
  })
}

// 一阶文件模糊查询
export function searchFirstOrder(params: file.AddSpecificat) {
  return request({
    url: "api/first/list",
    method: "GET",
    params
  })
}
// 一阶文件--变更
export function alterFirstOrder(data: any) {
  return request({
    url: "api/first/change-all",
    method: "PUT",
    data
  })
}

/**
 *****二阶文件接口
 *
 */

// 新增二阶文件
export function addSecondOrder(data: file.AddSpecificat) {
  return request({
    url: "api/second/insert-all",
    method: "POST",
    data
  })
}

// 修改二阶文件
export function editSecondOrder(data: file.AddSpecificat) {
  return request({
    url: "api/second/update-all",
    method: "PUT",
    data
  })
}

// 查询二阶文件
export function getSecondOrder(params: file.Pagination) {
  return request({
    url: "api/second/list",
    method: "GET",
    params
  })
}

// 二阶文件模糊查询
export function searchSecondOrder(params: file.AddSpecificat) {
  return request({
    url: "api/second/list",
    method: "GET",
    params
  })
}
// 二阶文件--变更
export function alterSecondOrder(data: any) {
  return request({
    url: "api/second/change-all",
    method: "PUT",
    data
  })
}

/**
 *****通用规范接口
 *
 */

// 新增通用规范
export function addSpecificat(data: file.AddSpecificat) {
  return request({
    url: "api/biz-current/insert-all",
    method: "POST",
    data
  })
}

// 删除通用规范
export function deleteSpecificat(data: file.DeleteID) {
  return request({
    url: "api/biz-current/delete-list",
    method: "DELETE",
    data
  })
}

// 修改通用规范
export function editSpecificat(data: file.AddSpecificat) {
  return request({
    url: "api/biz-current/update-all",
    method: "PUT",
    data
  })
}

// 查询通用规范
export function getSpecificat(params: file.Pagination) {
  return request({
    url: "api/biz-current/list",
    method: "GET",
    params
  })
}

// 通用规范模糊查询
export function searchSpecificat(params: file.AddSpecificat) {
  return request({
    url: "api/biz-current/list",
    method: "GET",
    params
  })
}
// 通用规范--变更
export function alterSpecificat(data: any) {
  return request({
    url: "api/biz-current/change-all",
    method: "PUT",
    data
  })
}
// 通用规范--id查询详情回显
export function detailSpecificat(params: Number) {
  return request({
    url: "api/biz-current/select-id",
    method: "GET",
    params
  })
}
// 查询会签部门
export function getDeptAll() {
  return request({
    url: "api/dept/getDeptAll",
    method: "GET"
  })
}
// 查询会签部门主管
export function usersDeptId(params: Number) {
  return request({
    url: "api/users/deptId",
    method: "GET",
    params
  })
}

// 查询节点信息
export function usersJobId(params: Number) {
  return request({
    url: "api/users/jobId",
    method: "GET",
    params
  })
}

/**
 *****流程卡--申请中
 *
 */

// 新增流程卡
export function addFlowCard(data: file.AddFlowCard) {
  return request({
    url: "api/runCard",
    method: "POST",
    data
  })
}

// 删除流程卡
export function deleteFlowCard(data: file.DeleteID) {
  return request({
    url: "api/runCard",
    method: "DELETE",
    data
  })
}

// 修改流程卡
export function editFlowCard(data: file.AddFlowCard) {
  return request({
    url: "api/runCard",
    method: "PUT",
    data
  })
}

// 查询流程卡
export function getFlowCard(params: file.Pagination) {
  return request({
    url: "api/runCard",
    method: "GET",
    params
  })
}

// 流程卡模糊查询
export function searchFlowCard(params: file.AddFlowCard) {
  return request({
    url: "api/runCard",
    method: "GET",
    params
  })
}
// 流程卡--审核
export function auditFlowCard(data: any) {
  return request({
    url: "api/runCard/audit",
    method: "PUT",
    data
  })
}
// 流程卡--变更
export function alterFlowCard(data: any) {
  return request({
    url: "api/runCard/alter",
    method: "PUT",
    data
  })
}

// 流程卡--作废
export function cancelFlowCard(data: any) {
  return request({
    url: "api/runCard/reason",
    method: "PUT",
    data
  })
}
// 流程卡--导出
export function exportFlowCard(params: string) {
  return request({
    url: "api/runCard/download",
    method: "GET",
    params,
    responseType: "blob" // 设置响应类型为二进制流
  })
}
// 流程卡--id查询详情回显
export function detailFlowCard(params: Number) {
  return request({
    url: "api/runCard/findById",
    method: "GET",
    params
  })
}

/**
 *****下载--下载
 *
 */
// 签核完成--附档下载
export function download(id: any) {
  return request({
    url: `api/download/${id}`,
    method: "GET",
    responseType: "blob"
  })
}

/**
 *****流程卡--签核完成
 *
 */
// 查询签核完成数据--流程卡
export function completeFlowCard(params: file.Pagination) {
  return request({
    url: "api/runCard/complete",
    method: "GET",
    params
  })
}
// 根据id查询file文件--流程卡
export function getFiles(id: any) {
  return request({
    url: `api/runCard/${id}`,
    method: "GET"
  })
}

/**
 *****蓝图--申请中
 *
 */

// 新增蓝图
export function addBlueprint(data: file.AddFlowCard) {
  return request({
    url: "api/blue",
    method: "POST",
    data
  })
}

// 删除蓝图
export function deleteBlueprint(data: file.DeleteID) {
  return request({
    url: "api/blue",
    method: "DELETE",
    data
  })
}

// 修改蓝图
export function editBlueprint(data: file.AddFlowCard) {
  return request({
    url: "api/blue",
    method: "PUT",
    data
  })
}

// 查询蓝图
export function getBlueprint(params: file.Pagination) {
  return request({
    url: "api/blue",
    method: "GET",
    params
  })
}

// 蓝图模糊查询
export function searchBlueprint(params: file.AddFlowCard) {
  return request({
    url: "api/blue",
    method: "GET",
    params
  })
}
// 蓝图--审核
export function auditBlueprint(data: any) {
  return request({
    url: "api/runCard/audit",
    method: "PUT",
    data
  })
}
// 蓝图--变更
export function alterBlueprint(data: any) {
  return request({
    url: "api/blue/alter",
    method: "PUT",
    data
  })
}

// 蓝图--作废
export function cancelBlueprint(data: any) {
  return request({
    url: "api/runCard/reason",
    method: "PUT",
    data
  })
}
// 蓝图--导出
export function exportBlueprint() {
  return request({
    url: "api/runCard/download",
    method: "GET"
  })
}
// 蓝图--id查询详情回显
export function detailBlueprint(params: Number) {
  return request({
    url: "api/blue/findById",
    method: "GET",
    params
  })
}

/**
 *****四阶文件
 *
 */

// 新增四阶文件
export function addfourthOrder(data: file.AddfourthOrder) {
  return request({
    url: "api/fourth",
    method: "POST",
    data
  })
}

// 删除四阶文件
export function deletefourthOrder(data: file.DeleteID) {
  return request({
    url: "api/fourth",
    method: "DELETE",
    data
  })
}

// 修改四阶文件
export function editfourthOrder(data: file.AddfourthOrder) {
  return request({
    url: "api/fourth",
    method: "PUT",
    data
  })
}

// 查询四阶文件
export function getfourthOrder(params: file.Pagination) {
  return request({
    url: "api/fourth",
    method: "GET",
    params
  })
}

// 四阶文件模糊查询
export function searchfourthOrder(params: file.AddfourthOrder) {
  return request({
    url: "api/fourth",
    method: "GET",
    params
  })
}

// 四阶文件--导出
export function exportfourthOrder(params: string) {
  return request({
    url: "api/fourth/download",
    method: "GET",
    params,
    responseType: "blob" // 设置响应类型为二进制流
  })
}

/**
 *****IS--申请中
 *
 */

// 新增IS
export function addIS(data: file.AddFlowCard) {
  return request({
    url: "api/is/insert-all",
    method: "POST",
    data
  })
}

// 修改IS
export function editIS(data: file.AddFlowCard) {
  return request({
    url: "api/is/update-all",
    method: "PUT",
    data
  })
}

// 查询IS
export function getIS(params: file.Pagination) {
  return request({
    url: "api/is/list",
    method: "GET",
    params
  })
}

// IS模糊查询
export function searchIS(params: file.AddFlowCard) {
  return request({
    url: "api/is/list",
    method: "GET",
    params
  })
}
// IS--变更
export function alterIS(data: any) {
  return request({
    url: "api/is/change-all",
    method: "PUT",
    data
  })
}

/**
 *****POP--申请中
 *
 */

// 新增POP
export function addPOP(data: file.AddFlowCard) {
  return request({
    url: "api/pop/insert-all",
    method: "POST",
    data
  })
}

// 修改POP
export function editPOP(data: file.AddFlowCard) {
  return request({
    url: "api/pop/update-all",
    method: "PUT",
    data
  })
}

// 查询POP
export function getPOP(params: file.Pagination) {
  return request({
    url: "api/pop/list",
    method: "GET",
    params
  })
}

// POP模糊查询
export function searchPOP(params: file.AddFlowCard) {
  return request({
    url: "api/pop/list",
    method: "GET",
    params
  })
}
// POP--变更
export function alterPOP(data: any) {
  return request({
    url: "api/pop/change-all",
    method: "PUT",
    data
  })
}

/**
 *****POP--申请中
 *
 */

// 新增SIP
export function addSIP(data: file.AddFlowCard) {
  return request({
    url: "api/sip/insert-all",
    method: "POST",
    data
  })
}

// 修改POP
export function editSIP(data: file.AddFlowCard) {
  return request({
    url: "api/sip/update-all",
    method: "PUT",
    data
  })
}

// 查询POP
export function getSIP(params: file.Pagination) {
  return request({
    url: "api/sip/list",
    method: "GET",
    params
  })
}

// POP模糊查询
export function searchSIP(params: file.AddFlowCard) {
  return request({
    url: "api/sip/list",
    method: "GET",
    params
  })
}
// POP--变更
export function alterSIP(data: any) {
  return request({
    url: "api/sip/change-all",
    method: "PUT",
    data
  })
}

/**
 *****SOP--申请中
 *
 */

// 新增SIP
export function addSOP(data: file.AddFlowCard) {
  return request({
    url: "api/sop/insert-all",
    method: "POST",
    data
  })
}

// 修改POP
export function editSOP(data: file.AddFlowCard) {
  return request({
    url: "api/sop/update-all",
    method: "PUT",
    data
  })
}

// 查询POP
export function getSOP(params: file.Pagination) {
  return request({
    url: "api/sop/list",
    method: "GET",
    params
  })
}

// POP模糊查询
export function searchSOP(params: file.AddFlowCard) {
  return request({
    url: "api/sop/list",
    method: "GET",
    params
  })
}
// POP--变更
export function alterSOP(data: any) {
  return request({
    url: "api/sop/change-all",
    method: "PUT",
    data
  })
}

/**
 *****BOM--申请中
 *
 */

// 新增SIP
export function addBOM(data: file.AddFlowCard) {
  return request({
    url: "api/bom/insert-all",
    method: "POST",
    data
  })
}

// 修改POP
export function editBOM(data: file.AddFlowCard) {
  return request({
    url: "api/bom/update-all",
    method: "PUT",
    data
  })
}

// 查询POP
export function getBOM(params: file.Pagination) {
  return request({
    url: "api/bom/list",
    method: "GET",
    params
  })
}

// POP模糊查询
export function searchBOM(params: file.AddFlowCard) {
  return request({
    url: "api/bom/list",
    method: "GET",
    params
  })
}
// POP--变更
export function alterBOM(data: any) {
  return request({
    url: "api/bom/change-all",
    method: "PUT",
    data
  })
}

// 签核中心
export function getSignOff(params: any) {
  return request({
    url: "api/biz-current/signingCenter",
    method: "GET",
    params
  })
}

// 签核中心模糊查询
export function searchSignOff(params: any) {
  return request({
    url: "api/biz-current/signingCenter",
    method: "GET",
    params
  })
}

//批量审核
export function reviewSignOff(data: any) {
  return request({
    url: "api/runCard/auditList",
    method: "PUT",
    data
  })
}

/**
 *****副本申请
 *
 */

// 新增副本申请
export function addCopyApply(data: file.AddFlowCard) {
  return request({
    url: "api/document/insert-all",
    method: "POST",
    data
  })
}

// 删除副本申请
export function deleteCopyApply(data: file.DeleteID) {
  return request({
    url: "api/document/delete-list",
    method: "DELETE",
    data
  })
}

// 修改副本申请
export function editCopyApply(data: file.AddFlowCard) {
  return request({
    url: "api/document/update-all",
    method: "PUT",
    data
  })
}

// 查询副本申请
export function getCopyApply(params: file.Pagination) {
  return request({
    url: "api/document/list",
    method: "GET",
    params
  })
}

// 副本申请模糊查询
export function searchCopyApply(params: file.AddFlowCard) {
  return request({
    url: "api/document/list",
    method: "GET",
    params
  })
}

// 副本申请模糊查询
export function remoteCopyApply(params: file.AddFlowCard) {
  return request({
    url: "api/biz-current/ecn-or-no",
    method: "GET",
    params
  })
}
// 副本申请--审核
export function auditCopyApply(data: any) {
  return request({
    url: "api/nodes/confirm-off",
    method: "PUT",
    data
  })
}
// 副本申请--导出
export function exportCopyApply() {
  return request({
    url: "api/document/download",
    method: "GET"
  })
}
// 副本申请--id查询详情回显
export function detailCopyApply(params: Number) {
  return request({
    url: "api/document/select-code",
    method: "GET",
    params
  })
}

// 获取客户类别接口
export function getCustomType() {
  return request({
    url: "api/clients/nonPaginated",
    method: "GET"
  })
}

// 获取供应商接口
export function getSupplier() {
  return request({
    url: "api/suppliers/nonPaginated",
    method: "GET"
  })
}

// 教育训练文件上传接口
export function uploadTrain(data: any) {
  return request({
    url: "api/runCard/uploadTrain",
    method: "POST",
    data
  })
}

// 邮件跟催
export function emailReminder(data: any) {
  return request({
    url: "api/email-record/email-reminder",
    method: "POST",
    data
  })
}
// 签核流程
export function auditNode(id: string) {
  return request({
    url: `api/auditNode/${id}`,
    method: "GET"
  })
}

// 生成文件编号
export function fileCodeDatar(data: any) {
  return request({
    url: "api/codeData",
    method: "POST",
    data
  })
}
//  文件编号
export function queryCodeDatar(params: any) {
  return request({
    url: "api/codeData",
    method: "GET",
    params
  })
}
