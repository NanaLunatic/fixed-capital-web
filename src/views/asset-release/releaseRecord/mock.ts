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
    prop: "applicationNo",
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
    label: "放行人",
    prop: "uplike",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "放行时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]

export const columns = [
  {
    prop: "applicationNo",
    label: "申请单号"
  },
  {
    prop: "assetsSn",
    label: "SN码"
  },
  {
    prop: "assetsNo",
    label: "资产编码",
    type: "object",
    parentProp: "assets"
  },
  {
    prop: "typeName",
    label: "类型"
  },
  {
    prop: "uplike",
    label: "放行人"
  },
  {
    prop: "createTime",
    label: "放行时间"
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
