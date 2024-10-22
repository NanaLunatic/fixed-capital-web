interface PageOption {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

// 表单数据选项(自行扩展)
export const formData = [
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
    label: "状态",
    prop: "status",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    label: "资产型号",
    prop: "assetsNumbers",
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
    label: "规格配置",
    prop: "configuration",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "品牌",
    prop: "assetsBrand",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "类型",
    prop: "typeName",
    placeholder: "请选择",
    type: "select",
    options: []
  },
  {
    label: "创建人",
    prop: "createBy",
    placeholder: "请输入",
    type: "input"
  }
]
export const columns = [
  {
    prop: "assetsSn",
    label: "SN码",
    width: 200,
    fixed: "left"
  },
  {
    prop: "assetsNo",
    label: "资产编码",
    minWidth: "150"
  },
  {
    prop: "status",
    label: "状态"
  },
  {
    prop: "assetsNumbers",
    label: "资产型号",
    width: 120
  },
  {
    prop: "assetsName",
    label: "资产名称",
    width: 120
  },
  {
    prop: "configuration",
    label: "规格配置",
    width: 120
  },
  {
    prop: "assetsBrand",
    label: "品牌"
  },
  {
    prop: "typeName",
    label: "类型",
    width: 120,
    type: "object",
    parentProp: "type"
  },
  {
    prop: "uplike",
    label: "使用人",
    width: 100
  },
  {
    prop: "deptName",
    label: "部门",
    width: 100
  },
  {
    prop: "locationsName",
    label: "仓位",
    type: "object",
    parentProp: "locations",
    width: 120
  },
  {
    prop: "amount",
    label: "数量"
  },
  {
    prop: "unitName",
    label: "单位",
    type: "object",
    parentProp: "unit"
  },
  {
    prop: "assetsValue",
    label: "价值"
  },
  {
    prop: "depreciation",
    label: "折旧率",
    width: 100
  },
  {
    prop: "productionDate",
    label: "生产日期",
    width: 120
  },
  {
    prop: "purchaseDate",
    label: "购置日期",
    width: 120
  },
  {
    prop: "createBy",
    label: "创建人",
    width: 100
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 180
  },
  {
    prop: "actionBar",
    label: "操作",
    type: "operation",
    width: 240,
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
