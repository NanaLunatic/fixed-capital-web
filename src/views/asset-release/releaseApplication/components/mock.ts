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


export const assetsFormOptions: FormOption[] = [
  {
    prop: "assets",
    label: "资产编码",
    type: "select",
    rules: [{ required: true, message: '必填' }],
  },{
    prop: "supervisorId",
    label: "放行主管",
    type: "select",
    rules: [{ required: true, message: '必填' }],
  },{
    prop: "startTime",
    label: "开始时间",
    type: 'datetime',
    rules: [{ required: true, message: '必填' }],
  },{
    prop: "endTime",
    label: "结束时间",
    type: 'datetime',
    rules: [{ required: true, message: '必填' }],
  },{
    prop: "memo",
    label: "申请原因",
    type: 'textarea',
    rules: [{ required: true, message: '必填' }],
  },
]

// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: '新增',
    type: 'add',
    url: 'api/throughRequest',
    formType: 'edit',
    isId: true,
    method: 'Post',
  },
]
