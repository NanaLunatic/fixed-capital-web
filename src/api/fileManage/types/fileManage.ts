export interface AddSpecificat {
  bizId: string
  bizNo: string
  bizCate: string
  bizCode: string
  bizName: string
  bizVersion: string
  BizYsd: string
  BizUser: string
  BizUsername: string
  departmentId: string
  BizStatus: string
  BizTime: string
  BizBefore: string
  BizAfter: string
  nodeList: []
  nodeId: string
  userId: string
  userName: string
  nodeCan: string
  nodeName: string
  nodeSequence: string
  nodeStatus: string
  nodeStatusDesc: string
  nodeComment: string
  nodeTime: string
  desc: string
  changeOrUpdate: string
}

export interface DeleteID {
  idList: String[]
}

export interface Pagination {
  currentPage: Number
  pageSize: Number
}

export interface AddFlowCard {
  id: String
  bizNo: String
  bizType: String
  bizName: String
  bizCate: String
  dept: {}
  user: {}
  bizYSD: String
  bizReason: String
  bizAircraft: String
  bizBefore: String
  bizCountersign: Number
  bizVersion: String
  bizChange: Number
  depts: []
}

export interface AddfourthOrder {
  id: Number
  unitNo: String
  unitName: String
  unitVersion: String
}
