// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "全局搜索",
    prop: "filter",
    placeholder: "全局搜索",
    type: "input"
  }
]
export const columns = [
  {
    prop: "userName",
    label: "工号"
  },
  {
    prop: "nickName",
    label: "用户名"
  },
  {
    prop: "dept",
    label: "部门"
  },
  {
    prop: "browser",
    label: "浏览器"
  },
  {
    prop: "address",
    label: "登录地址"
  },
  {
    prop: "ip",
    label: "登录ip"
  },
  {
    prop: "os",
    label: "操作系统"
  },
  {
    prop: "loginTime",
    label: "登录时间"
  },
  {
    prop: "actionBar",
    label: "操作",
    type: "operation",
    log: "exit",
    width: 100,
    fixed: "right",
    hideTooltip: true
  }
]

export const options = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
 pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
