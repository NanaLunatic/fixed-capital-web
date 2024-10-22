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
    prop: "scrapNo",
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
    label: "处理方式",
    prop: "disposalMode",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "报废时间",
    prop: "scrapTime",
    placeholder: "请输入",
    type: "date"
  }
]
export const columns = [
  {
    prop: "scrapNo",
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
    prop: "createBy",
    label: "报废人",
    minWidth: "120"
  },
  {
    prop: "scrapTime",
    label: "报废时间",
    minWidth: "180"
  },
  {
    prop: "disposalMode",
    label: "处理方式",
    minWidth: "120"
  },
  {
    prop: "scrapReason",
    label: "原因",
    minWidth: "150"
  },
  {
    prop: "memo",
    label: "备注",
    minWidth: "150"
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
