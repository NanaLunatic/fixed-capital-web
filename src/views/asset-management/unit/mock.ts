
interface PageOption {
  currentPage: number,
  pageSizes: number[],
  pageSize: number,
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "名称",
    prop: "unitName",
    placeholder: "请输入",
    type: "input"
  },{
    prop: "createBy",
    label: "创建人",
    placeholder: "请输入",
    type: "input"
  },{
    prop: "createTime",
    label: "创建时间",
    type: "date"
  }
]

export const columns = [
  {
    prop: "unitName",
    label: "名称"
  },{
    prop: "enabled",
    label: "状态",
    type: 'switch'
  },{
    prop: "createBy",
    label: "创建人"
  },{
    prop: "createTime",
    label: "创建时间"
  },{
    prop: "actionBar",
    label: "操作",
    width: 120,
    type: "operation",
    fixed: "right",
    hideTooltip: true
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
