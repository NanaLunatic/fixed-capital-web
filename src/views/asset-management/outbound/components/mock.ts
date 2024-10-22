interface FormOption {
  prop: string
  label: string
  type?: string
  precision?: number
  childProp?: string
  disabled?: boolean
  rules?: { required?: boolean, type?: string, message: string }[]
  options?: Array<{label: string, value: string}>
}

export interface TypeListOption {
  title: string
  type: string
  url: string
  formType: string
  isId: boolean
  method: string
}

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
    label: "领用人名称",
    type: "select",
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
    rules: [{ required: true, message: '必填' }],
  },
  {
    prop: "amount",
    label: "数量",
    type: "number",
    precision: 0,
  },
  {
    prop: "note",
    label: "申请单号",
    type: "select",
  },
]


export const transferFormOptions: FormOption[] = [
  {
    prop: "tReason",
    label: "移转原因",
    rules: [{ required: true, message: '必填' }],
  },
  {
    prop: "user",
    label: "移转后使用人",
    type: "select",
    rules: [{ required: true, message: '必填' }],
  },
  {
    prop: "memo",
    label: "备注",
    type: "textarea",
  },
  {
    prop: "locations",
    label: "移转后位置",
    type: "select",
    rules: [{ required: true, message: '必填' }],
  }
]

// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: '移转',
    type: 'transfer',
    url: 'api/delivery/transfer',
    formType: 'transfer',
    isId: true,
    method: 'Post',
  },
]
