//routerList
export const routerList: RoutesList[] = [
  {
    id: 1,
    path: "/fileManage",
    name: "FileManage",
    meta: {
      title: "文件管理"
    },
    children: [
      {
        id: 2,
        path: "firstOrder",
        name: "FirstOrder",
        meta: {
          title: "一阶文件"
        }
      },
      {
        id: 3,
        path: "secondOrder",
        name: "SecondOrder",
        meta: {
          title: "二阶文件"
        }
      },
      {
        id: 4,
        path: "thirdOrder",
        name: "ThirdOrder",
        meta: {
          title: "三阶文件"
        },
        children: [
          {
            id: 5,
            path: "specification",
            name: "Specification",
            meta: {
              title: "通用规范"
            }
          },
          {
            id: 6,
            path: "flowCard",
            name: "FlowCard",
            meta: {
              title: "流程卡"
            }
          },
          {
            id: 7,
            path: "iS",
            name: "IS",
            meta: {
              title: "IS"
            }
          },
          {
            id: 8,
            path: "pop",
            name: "POP",
            meta: {
              title: "POP"
            }
          },
          {
            id: 9,
            path: "sip",
            name: "SIP",
            meta: {
              title: "SIP"
            }
          },
          {
            id: 10,
            path: "sop",
            name: "SOP",
            meta: {
              title: "SOP"
            }
          },
          {
            id: 11,
            path: "bom",
            name: "BOM",
            meta: {
              title: "BOM"
            }
          },
          {
            id: 12,
            path: "blueprint",
            name: "Blueprint",
            meta: {
              title: "蓝图"
            }
          }
        ]
      },
      {
        id: 13,
        path: "fourthOrder",
        name: "FourthOrder",
        meta: {
          title: "四阶文件"
        }
      },
      {
        id: 14,
        path: "copyApply",
        name: "CopyApply",
        meta: {
          title: "副本申请"
        }
      },
      {
        id: 15,
        path: "signOff",
        name: "SignOff",
        meta: {
          title: "签核中心"
        }
      },
      {
        id: 16,
        path: "basicInfo",
        name: "BasicInfo",
        meta: {
          title: "基本信息"
        }
      }
    ]
  },
  {
    id: 17,
    path: "/fileDeposit",
    name: "FileDeposit",
    meta: {
      title: "文件存放"
    },
    children: [
      {
        id: 18,
        path: "detectReport",
        name: "DetectReport",
        meta: {
          title: "检测报告存放"
        }
      },
      {
        id: 19,
        path: "environmentalProtection",
        name: "EnvironmentalProtection",
        meta: {
          title: "环保管理"
        }
      },
      {
        id: 20,
        path: "productEstimate",
        name: "ProductEstimate",
        meta: {
          title: "稽核&会议记录"
        }
      }
    ]
  },
  {
    id: 21,
    path: "/permission",
    name: "Permission",
    meta: {
      title: "权限管理",
      elIcon: "SetUp"
    },
    children: [
      {
        id: 22,
        path: "menuManage",
        name: "MenuManage",
        meta: {
          title: "菜单管理"
        }
      },
      {
        id: 23,
        path: "roleManage",
        name: "RoleManage",
        meta: {
          title: "角色管理"
        }
      },
      {
        id: 24,
        path: "userManage",
        name: "UserManage",
        meta: {
          title: "用户管理"
        }
      },
      {
        id: 25,
        path: "organization",
        name: "Organization",
        meta: {
          title: "组织架构"
        }
      }
    ]
  },
  {
    id: 26,
    path: "/logManage",
    name: "logManage",
    meta: {
      title: "日志信息"
    },
    children: [
      {
        id: 27,
        path: "loginLog",
        name: "LoginLog",
        meta: {
          title: "登录日志"
        }
      },
      {
        id: 28,
        path: "operateLog",
        name: "OperateLog",
        meta: {
          title: "操作日志"
        }
      },
      {
        id: 29,
        path: "abnormalLog",
        name: "AbnormalLog",
        meta: {
          title: "异常日志"
        }
      }
    ]
  }
]
