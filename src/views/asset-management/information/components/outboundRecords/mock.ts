interface PageOption {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "出库单号",
    prop: "deliveryNo",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "申请单号",
    prop: "applicationNo",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "SN码",
    prop: "assetsSn",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "资产编码",
    prop: "assetsNo",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "资产名称",
    prop: "assetsName",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "出库类型",
    prop: "type",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    label: "使用人",
    prop: "empName",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    label: "出库时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]
export const columns = [
  {
    prop: "deliveryNo",
    label: "出库单号",
    minWidth: "150"
  },
  {
    prop: "applicationNo",
    label: "申请单号",
    minWidth: "150"
  },
  {
    prop: "assetsSn",
    label: "SN码",
    width: 200,
    type: "object",
    parentProp: "assets"
  },
  {
    prop: "assetsNo",
    label: "资产编码",
    minWidth: "150",
    type: "object",
    parentProp: "assets"
  },
  {
    prop: "assetsName",
    label: "资产名称",
    type: "object",
    parentProp: "assets",
    minWidth: "120"
  },
  {
    prop: "amount",
    label: "数量",
    minWidth: "100"
  },
  {
    prop: "createTime",
    label: "出库时间",
    minWidth: "180"
  },
  {
    prop: "nickName",
    label: "出库人",
    minWidth: "120"
  },
  {
    prop: "type",
    label: "出库类型",
    minWidth: "120"
  },
  {
    prop: "locationsName",
    label: "出库位置",
    type: "object",
    parentProp: "locations",
    width: 120
  },
  {
    prop: "empName",
    label: "使用人",
    minWidth: "120"
  },
  {
    prop: "actionBar",
    label: "操作",
    type: "operation",
    width: 160,
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
