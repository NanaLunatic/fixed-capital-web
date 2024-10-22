interface PageOption {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "单号",
    prop: "repairNo",
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
    label: "维修时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]

export const columns = [
  {
    prop: "repairNo",
    label: "单号",
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
    prop: "repairContent",
    label: "维修内容",
    minWidth: "150"
  },
  {
    prop: "repairUser",
    label: "维修人",
    minWidth: "120"
  },
  {
    prop: "createTime",
    label: "维修时间",
    minWidth: "180"
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
