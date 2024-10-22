interface PageOption {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "申请单号",
    prop: "note",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "申请人",
    prop: "createBy",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "类型",
    prop: "type",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    label: "申请时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]

export const columns = [
  {
    prop: "note",
    label: "申请单号"
  },
  {
    prop: "quantity",
    label: "数量"
  },
  {
    prop: "typeName",
    label: "类型",
    type: "object",
    parentProp: "type"
  },
  {
    prop: "examineStatus",
    label: "单据状态"
  },
  {
    prop: "outboundStatus",
    label: "出库状态"
  },
  {
    prop: "outboundAmount",
    label: "出库数量"
  },
  {
    prop: "createBy",
    label: "申请人"
  },
  {
    prop: "createTime",
    label: "申请时间"
  },
  {
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
