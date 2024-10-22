interface FormOption {
  prop: string
  label: string
  type?: string
  precision?: number
  parentProp?: string
  disabled?: boolean
  default?: boolean
  rules?: { required?: boolean; type?: string; message: string }[]
  options?: Array<{ label: string; value: string | boolean }>
}

export interface TypeListOption {
  title: string
  type: string
  url?: string
  formType: string
  isIds?: boolean
  isId: boolean
  method?: string
  optionMap: object[]
}

export const approvalFormOptions: FormOption[] = [
  {
    prop: "isEnabled",
    label: "审批意见",
    type: "radio",
    default: true,
    options: []
  },
  {
    prop: "suggestion",
    label: "原因",
    type: "textarea"
  }
]

// 资产归还
export const restitutionFormOptions: FormOption[] = [
  {
    prop: "numberNo",
    label: "单号",
    disabled: true
  },
  {
    prop: "typeName",
    label: "资产类型",
    parentProp: "assets.type",
    disabled: true
  },
  {
    prop: "createBy",
    label: "申请人",
    disabled: true
  },
  {
    prop: "createTime",
    label: "申请时间",
    disabled: true
  },
  {
    prop: "amount",
    label: "数量",
    disabled: true
  },
  {
    prop: "memo",
    label: "备注",
    disabled: true
  }
]

// 放行申请
export const releaseFormOptions: FormOption[] = [
  {
    prop: "numberNo",
    label: "单号",
    disabled: true
  },
  {
    prop: "typeName",
    label: "资产类型",
    parentProp: "assets.type",
    disabled: true
  },
  {
    prop: "createBy",
    label: "申请人",
    disabled: true
  },
  {
    prop: "deptName",
    label: "部门",
    disabled: true
  },
  {
    prop: "assetsNo",
    label: "资产编码",
    parentProp: "assets",
    disabled: true
  },
  {
    prop: "assetsName",
    label: "资产名称",
    parentProp: "assets",
    disabled: true
  },
  {
    prop: "assetsSn",
    label: "SN码",
    parentProp: "assets",
    disabled: true
  },
  {
    prop: "assetsBrand",
    label: "品牌",
    parentProp: "assets",
    disabled: true
  },
  {
    prop: "startTime",
    label: "开始时间",
    disabled: true
  },
  {
    prop: "endTime",
    label: "结束时间",
    disabled: true
  },
  {
    prop: "tReason",
    label: "申请原因",
    disabled: true
  }
]

// 资产申请
export const applicationFormOptions: FormOption[] = [
  {
    prop: "numberNo",
    label: "单号",
    disabled: true
  },
  {
    prop: "typeName",
    label: "资产类型",
    parentProp: "assets.type",
    disabled: true
  },
  {
    prop: "createBy",
    label: "申请人",
    disabled: true
  },
  {
    prop: "createTime",
    label: "申请时间",
    disabled: true
  },
  {
    prop: "amount",
    label: "数量",
    disabled: true
  },
  {
    prop: "memo",
    label: "备注",
    disabled: true
  }
]

// 资产移转
export const transferFormOptions: FormOption[] = [
  {
    prop: "numberNo",
    label: "单号",
    disabled: true
  },
  {
    prop: "typeName",
    label: "资产类型",
    parentProp: "assets.type",
    disabled: true
  },
  {
    prop: "createBy",
    label: "申请人",
    disabled: true
  },
  {
    prop: "createTime",
    label: "申请时间",
    disabled: true
  },
  {
    prop: "assetsNo",
    label: "资产编码",
    parentProp: "assets",
    disabled: true
  },
  {
    prop: "amount",
    label: "数量",
    disabled: true
  },
  {
    prop: "tUplike",
    label: "接收人",
    disabled: true
  },
  {
    prop: "tReason",
    label: "转移原因",
    disabled: true
  },
  {
    prop: "rLocation",
    label: "移转前位置",
    disabled: true
  },
  {
    prop: "afterLocation",
    label: "移转后位置",
    disabled: true
  }
]

// 弹框集合定义
export const typeList: TypeListOption[] = [
  {
    title: "批量审核",
    type: "approval",
    url: "api/delivery/auditList",
    formType: "approval",
    isIds: true,
    isId: true,
    method: "put",
    optionMap: approvalFormOptions
  },
  {
    title: "资产归还",
    type: "edit",
    formType: "restitution",
    isId: true,
    optionMap: restitutionFormOptions
  },
  {
    title: "放行申请",
    type: "edit",
    formType: "release",
    isId: true,
    optionMap: releaseFormOptions
  },
  {
    title: "资产申请",
    type: "edit",
    formType: "application",
    isId: true,
    optionMap: applicationFormOptions
  },
  {
    title: "资产移转",
    type: "edit",
    formType: "transfer",
    isId: true,
    optionMap: transferFormOptions
  }
]
