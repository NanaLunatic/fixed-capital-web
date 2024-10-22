// 表单数据选项(自行扩展)
export const formData = [
  {
    label: "部门名称",
    prop: "name",
    placeholder: "请输入部门名称",
    type: "input"
  },
  {
    label: "状态",
    prop: "enabled",
    placeholder: "",
    type: "select",
    options: [
      {
        label: "Y",
        value: true
      },
      {
        label: "N",
        value: false
      }
    ]
  }
]
export const tableData = [
  {
    id: 1,
    pid: null,
    deptSort: 0, //排序
    createBy: "admin", //创建者角色
    label: "华南分部",
    name: "华南分部", //公司名称
    enabled: true, //状态
    createTime: "2019-03-25 11:04:50", //创建时间
    hasChildren: true, //是否是懒加载节点 children不为null则true
    children: [
      {
        id: "1-1",
        pid: 1,
        deptSort: 0,
        createBy: "admin",
        label: "研发部",
        name: "研发部",
        enabled: true,
        createTime: "2019-03-25 11:04:50",
        hasChildren: true, // 如果children 存在则为true 反之false
        children: [
          {
            id: "2-1",
            pid: "1-1",
            children: null,
            deptSort: 0,
            createBy: "admin",
            label: "研发一组",
            name: "研发一组",
            enabled: true,
            createTime: "2019-03-25 11:04:50",
            hasChildren: false
          }
        ]
      },
      {
        id: "1-2",
        pid: 1,
        children: null, //是否有子级
        deptSort: 0,
        createBy: "admin",
        label: "运维部",
        name: "运维部",
        enabled: true,
        createTime: "2019-03-25 11:04:50",
        hasChildren: false
      }
    ]
  },
  {
    id: 2,
    children: null,
    deptSort: 0,
    createBy: "admin",
    label: "华北分部",
    name: "华北分部",
    enabled: false,
    createTime: "2019-03-25 11:04:50",
    hasChildren: false
  }
]
