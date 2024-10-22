// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "姓名",
    prop: "nickName",
    placeholder: "请输入姓名",
    type: "input"
  },
  {
    label: "工号",
    prop: "username",
    placeholder: "请输入工号",
    type: "input"
  }
]
export const columns = [
  {
    prop: "username",
    label: "工号",
    minWidth: "120",
  },
  {
    prop: "nickName",
    label: "姓名",
    minWidth: "120",
  },
  {
    prop: "name",
    label: "部门",
    type: "object",
    parentProp: "dept",
    minWidth: "150",
  },
  {
    prop: "email",
    label: "邮箱",
    width: 220,
  },
  {
    prop: "phone",
    label: "手机号",
    minWidth: "150",
  },
  {
    prop: "enabled",
    label: "状态",
    type: "switch",
    minWidth: "120",
  },
  {
    prop: "createTime",
    label: "创建日期",
    minWidth: "180",
  },
  {
    prop: "actionBar",
    label: "操作",
    type: "operation",
    width: 150,
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
