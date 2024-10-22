interface FormOption {
  prop: string
  label: string
  type?: string
  precision?: number
  childProp?: string
  disabled?: boolean
  rules?: { required?: boolean; type?: string; message: string }[]
  options?: Array<{ label: string; value: string }>
}

export interface TypeListOption {
  title: string
  type: string
  url: string
  formType: string
  isIds?: boolean
  isId: boolean
  method: string
}

// 新增编辑弹框
export const editFormOptions: FormOption[] = [
  {
    prop: "assetsSn",
    label: "SN码",
    rules: [{ required: true, message: "必填" }]
  },
  {
    prop: "assetsNumbers",
    label: "资产型号"
  },
  {
    prop: "assetsName",
    label: "资产名称"
  },
  {
    prop: "configuration",
    label: "规格配置"
  },
  {
    prop: "amount",
    label: "数量",
    type: "number",
    precision: 0
  },
  {
    prop: "unit",
    label: "单位",
    type: "select",
    rules: [{ required: true, message: "必填" }]
  },
  {
    prop: "assetsValue",
    label: "价值",
    type: "number",
    precision: 2
  },
  {
    prop: "depreciation",
    label: "折旧率",
    type: "number",
    precision: 2
  },
  {
    prop: "locations",
    label: "仓位",
    type: "select",
    rules: [{ required: true, message: "必填" }]
  },
  {
    prop: "productionDate",
    label: "生产日期",
    type: "date"
  },
  {
    prop: "purchaseDate",
    label: "购置日期",
    type: "date"
  },
  {
    prop: "assetsBrand",
    label: "品牌"
  },
  {
    prop: "type",
    label: "类型",
    type: "select",
    rules: [{ required: true, message: "必填" }]
  }
]

// 报废弹框
export const scrapFormOptions: FormOption[] = [
  {
    prop: "scrapReason",
    label: "报废原因",
    rules: [{ required: true, message: "必填" }]
  },
  {
    prop: "disposalMode",
    label: "处置方式"
  },
  {
    prop: "memo",
    label: "备注",
    type: "textarea"
  }
]

// 维修弹框
export const repairFormOptions: FormOption[] = [
  {
    prop: "repairContent",
    label: "维修内容",
    rules: [{ required: true, message: "必填" }]
  },
  {
    prop: "repairUser",
    label: "维修人员"
  },
  {
    prop: "memo",
    label: "备注",
    type: "textarea"
  }
]

// 出库弹框
export const outboundFormOptions: FormOption[] = [
  {
    prop: "assetsSn",
    label: "SN码",
    disabled: true
  },
  {
    prop: "assetsName",
    label: "资产名称",
    disabled: true
  },
  {
    prop: "recipient",
    label: "使用人名称",
    type: "select"
  },
  {
    prop: "inventory",
    label: "库存数",
    type: "number",
    disabled: true
  },
  {
    prop: "locations",
    label: "出库位置",
    type: "select",
    rules: [{ required: true, message: "必填" }]
  },
  {
    prop: "amount",
    label: "数量",
    type: "number",
    precision: 0
  },
  {
    prop: "note",
    label: "申请单号",
    type: "select"
  }
]

// 失效弹框
export const failureFormOptions: FormOption[] = [
  {
    prop: "reason",
    label: "失效原因",
    rules: [{ required: true, message: "必填" }]
  }
]

// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: "新增",
    type: "add",
    url: "api/assets",
    formType: "edit",
    isId: false,
    method: "Post"
  },
  {
    title: "修改",
    type: "edit",
    url: "api/assets",
    formType: "edit",
    isId: true,
    method: "Put"
  },
  {
    title: "报废",
    type: "scrap",
    url: "api/assets/scrap",
    formType: "scrap",
    isIds: true,
    isId: true,
    method: "Post"
  },
  {
    title: "维修",
    type: "repair",
    url: "api/assets/repair",
    formType: "repair",
    isIds: true,
    isId: true,
    method: "Post"
  },
  {
    title: "出库",
    type: "outbound",
    url: "api/assets/delivery",
    formType: "outbound",
    isId: true,
    method: "Post"
  },
  {
    title: "失效",
    type: "failure",
    url: "api/printRecords",
    formType: "failure",
    isId: true,
    method: "put"
  }
]
