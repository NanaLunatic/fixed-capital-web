interface FormOption {
  prop: string
  label: string
  type?: string
  precision?: number
  childProp?: string
  disabled?: boolean
  default?: boolean
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
    label: "名称",
    prop: "locationsName",
  },{
    label: "状态",
    prop: "enabled",
    type: "switch",
    default: true
  },{
    label: "描述",
    prop: "description",
    type: "textarea",
  },{
    label: "备注",
    prop: "memo",
    type: "textarea",
  }
]


// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: '新增',
    type: 'add',
    url: 'api/locations',
    formType: 'edit',
    isId: false,
    method: 'Post',
  },
  {
    title: '修改',
    type: 'edit',
    url: 'api/locations',
    formType: 'edit',
    isId: true,
    method: 'Put',
  }
]
