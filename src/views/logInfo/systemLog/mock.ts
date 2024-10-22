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
    prop: "username",
    label: "工号"
  },
  {
    prop: "requestIp",
    label: "登录ip",
    width: 150,
  },
  {
    prop: "address",
    label: "IP来源",
    width: 100,
  },
  {
    prop: "browser",
    label: "浏览器",
    width: 200,
  },
  {
    prop: "time",
    label: "请求耗时",
    width: 120,
  },
  {
    prop: "method",
    label: "请求方法",
    width: 260,
  },
  {
    prop: "os",
    label: "操作系统",
    width: 180,
  },
  {
    prop: "description",
    label: "描述",
    width: 180,
  },
  {
    prop: "createTime",
    label: "请求时间",
    width: 180,
  },
  {
    prop: "actionBar",
    label: "操作",
    type: "operation",
    log: "abnormal", //查看异常
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
