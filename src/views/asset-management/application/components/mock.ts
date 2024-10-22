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


export const editFormOptions: FormOption[] = [
  {
    prop: "type",
    label: "资产类型",
    type: "select",
    rules: [{ required: true, message: '必填' }],
  },{
    prop: "quantity",
    label: "数量",
    type: "number",
    precision: 0,
  },{
    prop: "memo",
    label: "备注",
    type: "textarea",
  },
]


// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: '新增',
    type: 'add',
    url: 'api/note',
    formType: 'edit',
    isId: false,
    method: 'Post',
  },
  {
    title: '修改',
    type: 'edit',
    url: 'api/note',
    formType: 'edit',
    isId: true,
    method: 'Put',
  }
]
