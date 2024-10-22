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
    label: "放行主管",
    prop: "supervisorName",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "申请单号",
    prop: "applicationNo",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "申请人",
    prop: "createBy",
    placeholder: "请输入",
    type: "input"
  },
  {
    label: "申请时间",
    prop: "createTime",
    placeholder: "请输入",
    type: "date"
  }
]
export const columns = [
  {
    prop: "applicationNo",
    label: "申请单号",
    width: 160
  },
  {
    prop: "assetsSn",
    label: "SN码",
    width: 200,
    type: "object",
    parentProp: "assets"
  },
  {
    prop: "assetsNo",
    label: "资产编码",
    minWidth: "150",
    type: "object",
    parentProp: "assets"
  },
  {
    prop: "assetsName",
    label: "资产名称",
    type: "object",
    parentProp: "assets",
    width: 120
  },
  {
    prop: "supervisorName",
    label: "放行主管",
    width: 120
  },
  {
    prop: "type",
    label: "类型"
  },
  {
    prop: "memo",
    label: "申请原因",
    width: 140
  },
  {
    prop: "createBy",
    label: "申请人",
    width: 120
  },
  {
    prop: "deptName",
    label: "部门",
    width: 120
  },
  {
    prop: "desc",
    label: "审核状态",
    width: 120
  },
  {
    prop: "enabled",
    label: "状态",
    type: "switch",
    width: 100
  },
  {
    prop: "createTime",
    label: "申请时间",
    width: 160
  },
  {
    prop: "startTime",
    label: "开始时间",
    width: 160
  },
  {
    prop: "endTime",
    label: "结束时间",
    width: 160
  }
]

export const options: PageOption = {
  currentPage: 1,
  pageSizes: [10, 20, 50, 100],
  pageSize: 20,
  layout: "total, sizes, prev, pager, next, jumper"
}
