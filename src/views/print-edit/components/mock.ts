// 声明接口
export interface FormOption {
  prop: string
  label: string
  type?: string
  precision?: number
  childProp?: string
  disabled?: boolean
  default?: boolean
  rows?: number
  hidden?: boolean
  rules?: { required?: boolean, type?: string, message: string }[]
  options?: Array<{ label: string, value: string }>
}

export interface TypeListOption {
  title: string
  type: string
  url: string
  formType: string
  isId: boolean
  method: string
}

// 导出编辑表单选项
const editFormOptions: FormOption[] = [
  {
    label: "唯一标识",
    prop: "printCode",
    rules: [{ required: true, message: '必填' }],
  },
  {
    label: "模板名称",
    prop: "printName",
    rules: [{ required: true, message: '必填' }],
  },
  {
    label: "模板宽度",
    prop: "printWidth",
    hidden: true
  },
  {
    label: "模板内容",
    prop: "modelContent",
    type: "textarea",
    rows: 18,
    disabled: true,
    rules: [{ required: true, message: '必填' }],
  }
]

// 导出弹框集合定义
const typeList: TypeListOption[] = [
  {
    title: '模板新增',
    type: 'edit',
    url: 'api/printModel',
    formType: 'edit',
    isId: false,
    method: 'Post',
  },
  {
    title: '模板修改',
    type: 'edit',
    url: 'api/printModel',
    formType: 'edit',
    isId: true,
    method: 'Put',
  }
]


export default { editFormOptions, typeList }
