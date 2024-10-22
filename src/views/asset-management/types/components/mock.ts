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
    prop: "typeName",
    rules: [{ required: true, message: '必填' }],
  },{
    label: "编号",
    prop: "typeCode",
    rules: [{ required: true, message: '必填' }],
  },{
    label: "状态",
    prop: "enabled",
    type: "switch",
    default: true
  }
]


// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: '新增',
    type: 'add',
    url: 'api/types',
    formType: 'edit',
    isId: false,
    method: 'Post',
  },
  {
    title: '修改',
    type: 'edit',
    url: 'api/types',
    formType: 'edit',
    isId: true,
    method: 'Put',
  }
]
