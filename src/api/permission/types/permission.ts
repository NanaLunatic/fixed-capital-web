export interface AddMenus {
  id: Number //新增id为空
  name: string //组件名称（菜单名称）
  title: string //菜单标题
  path: string //路径
  pid: Number
}
export interface DeleteMenus {
  id: Number[]
}

export interface SearchMenus {
  blurry: string
}

export interface AddRoles {
  id: any //新增id为空
  roleName: string //角色名称
  menus: [] //数组
  enabled: Boolean //角色状态
  description: string //描述
  currentPage: number
  pageSize: number
}

export interface SearchRoles {
  roleName: string
  enabled: Boolean
}
export interface AddDept {
  id: Number
  pid: Number
  name: string
  code: string
  deptSort: Number
  enabled: Boolean
}

export interface getIDDept {
  id: Number
}
export interface GetRoles {
  page: Number
  size: Number
}

export interface AddUsers {
  id: any
  roles: []
  jobs: []
  dept: {}
  username: string
  nickName: string
  email: string
  phone: string
  telephone: string
  userFax: string
  eName: string
  enabled: boolean
}
