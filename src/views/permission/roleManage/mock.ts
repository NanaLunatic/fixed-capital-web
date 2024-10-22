// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "角色名称",
    prop: "roleName",
    placeholder: "请输入角色名称",
    type: "input"
  },
  {
    label: "角色状态",
    prop: "enabled",
    placeholder: "全部",
    type: "select",
    options: [
      {
        label: "Y",
        value: true
      },
      {
        label: "N",
        value: false
      }
    ]
  }
]
export const columns = [
  {
    prop: "roleName",
    label: "角色名称"
  },
  {
    prop: "roleSort",
    label: "排序"
  },
  {
    prop: "enabled",
    label: "角色状态",
    type: "switch"
  },
  {
    prop: "description",
    label: "角色描述"
  },
  {
    prop: "createTime",
    label: "创建日期"
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
