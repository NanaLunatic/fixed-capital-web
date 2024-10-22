interface PageOption {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "入库单号",
    prop: "storageNo",
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
    label: "入库类型",
    prop: "storageType",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    label: "入库时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]
export const columns = [
  {
    prop: "storageNo",
    label: "入库单号",
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
    label: "入库时间",
    minWidth: "180"
  },
  {
    prop: "createBy",
    label: "入库人",
    minWidth: "120"
  },
  {
    prop: "storageType",
    label: "入库类型",
    minWidth: "120"
  },
  {
    prop: "locations.locationsName",
    label: "入库位置",
    type: "object",
    parentProp: "assets",
    width: 120
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
