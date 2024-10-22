
interface PageOption {
  currentPage: number,
  pageSizes: number[],
  pageSize: number,
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "单号",
    prop: "numberNo",
    placeholder: "请输入",
    type: "input"
  },{
    label: "资产编码",
    prop: "assetsNo",
    placeholder: "请输入",
    type: "input"
  },{
    label: "SN码",
    prop: "assetsSn",
    placeholder: "请输入",
    type: "input"
  },{
    label: "资产名称",
    prop: "assetsName",
    placeholder: "请输入",
    type: "input"
  },{
    label: "数据类型",
    prop: "type",
    placeholder: "请选择",
    type: "select",
    options: []
  },{
    label: "数据状态",
    prop: "statusDesc",
    placeholder: "请选择",
    type: "select",
    options: []
  },{
    label: "申请人",
    prop: "uplike",
    placeholder: "请输入",
    type: "input"
  },{
    label: "创建时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]
export const columns = [
  {
    prop: "numberNo",
    label: "单号",
    minWidth: '150',
    type: 'link'
  },{
    prop: "assetsSn",
    label: "SN码",
    width: 200,
    type: "object",
    parentProp: "assets"
  },{
    prop: "assetsNo",
    label: "资产编码",
    minWidth: '150',
    type: "object",
    parentProp: "assets"
  },{
    prop: "assetsName",
    label: "资产名称",
    type: "object",
    parentProp: "assets",
    minWidth: '120',
  },{
    prop: "type",
    label: "数据类型",
    minWidth: '120',
  },{
    prop: "amount",
    label: "数量",
    minWidth: '120',
  },{
    prop: "statusDesc",
    label: "数据状态",
    minWidth: '120',
  },{
    prop: "uplike",
    label: "申请人",
    minWidth: '120',
  },{
    prop: "createTime",
    label: "创建时间",
    minWidth: '180',
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
 pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
