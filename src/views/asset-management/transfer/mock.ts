interface PageOption {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    prop: "transferNo",
    label: "单号",
    placeholder: "请输入",
    type: "input"
  },
  {
    prop: "assetNo",
    label: "资产编码",
    placeholder: "请输入",
    type: "input"
  },
  {
    prop: "assetName",
    label: "资产名称",
    placeholder: "请输入",
    type: "input"
  },
  {
    prop: "statusName",
    label: "状态",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    prop: "uplike",
    label: "移转人",
    placeholder: "请输入",
    type: "input"
  },
  {
    prop: "tUplike",
    label: "移转后使用人",
    placeholder: "请输入",
    type: "input"
  },
  {
    prop: "updateTime",
    label: "移转时间",
    placeholder: "请输入",
    type: "date"
  }
]

export const columns = [
  {
    prop: "transferNo",
    label: "单号",
    minWidth: "150"
  },
  {
    prop: "assetSn",
    label: "SN码",
    width: 200
  },
  {
    prop: "assetNo",
    label: "资产编码",
    minWidth: "150"
  },
  {
    prop: "assetName",
    label: "资产名称",
    minWidth: "120"
  },
  {
    prop: "uplike",
    label: "移转人",
    minWidth: "120"
  },
  {
    prop: "rLocation",
    label: "移转前位置",
    minWidth: "150"
  },
  {
    prop: "locationsName",
    type: "object",
    parentProp: "locations",
    width: 150,
    label: "移转后位置"
  },
  {
    prop: "tUplike",
    label: "移转后使用人",
    minWidth: "150"
  },
  {
    prop: "updateTime",
    label: "移转时间",
    width: 180
  },
  {
    prop: "amount",
    label: "数量",
    minWidth: "120"
  },
  {
    prop: "statusName",
    label: "状态",
    minWidth: "120"
  },
  {
    prop: "tReason",
    label: "原因",
    minWidth: "150"
  },
  {
    prop: "memo",
    label: "备注",
    minWidth: "120"
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
