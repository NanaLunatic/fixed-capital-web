export const menuData = [
  {
    path: "/fileManage",
    component: "Layout",
    redirect: "/fileManage",
    name: "FileManage",
    meta: {
      title: "文件管理",
      elIcon: "Files",
      noCache: true,
      hidden: false,
      alwaysShow: true
    },
    children: [
      {
        path: "firstOrder",
        component: "fileManage/firstOrder",
        name: "FirstOrder",
        meta: {
          title: "一阶文件",
          noCache: true,
          hidden: false,
          alwaysShow: true
        }
      },
      {
        path: "secondOrder",
        component: "fileManage/firstOrder",
        name: "SecondOrder",
        meta: {
          title: "二阶文件"
        }
      },
      {
        path: "thirdOrder",
        component: "Layout",
        redirect: "/thirdOrder",
        name: "ThirdOrder",
        meta: {
          title: "三阶文件",
          noCache: true,
          hidden: false,
          alwaysShow: true
        },
        children: [
          {
            path: "specification",
            component: "fileManage/firstOrder",
            name: "Specification",
            meta: {
              title: "通用规范"
            }
          },
          {
            path: "flowCard",
            component: "fileManage/firstOrder",
            name: "FlowCard",
            meta: {
              title: "流程卡"
            }
          },
          {
            path: "iS",
            component: "fileManage/firstOrder",
            name: "IS",
            meta: {
              title: "IS"
            }
          },
          {
            path: "pop",
            component: "fileManage/firstOrder",
            name: "POP",
            meta: {
              title: "POP"
            }
          },
          {
            path: "sip",
            component: "fileManage/firstOrder",
            name: "SIP",
            meta: {
              title: "SIP"
            }
          },
          {
            path: "sop",
            component: "fileManage/firstOrder",
            name: "SOP",
            meta: {
              title: "SOP"
            }
          },
          {
            path: "bom",
            component: "fileManage/firstOrder",
            name: "BOM",
            meta: {
              title: "BOM"
            }
          },
          {
            path: "blueprint",
            component: "fileManage/firstOrder",
            name: "Blueprint",
            meta: {
              title: "蓝图"
            }
          }
        ]
      },
      {
        path: "fourthOrder",
        component: "fileManage/firstOrder",
        name: "FourthOrder",
        meta: {
          title: "四阶文件"
        }
      },
      {
        path: "copyApply",
        component: "fileManage/firstOrder",
        name: "CopyApply",
        meta: {
          title: "副本申请"
        }
      },
      {
        path: "signOff",
        component: "fileManage/firstOrder",
        name: "SignOff",
        meta: {
          title: "签核中心"
        }
      },
      {
        path: "basicInfo",
        component: "fileManage/firstOrder",
        name: "BasicInfo",
        meta: {
          title: "基本信息"
        }
      }
    ]
  },
  {
    path: "/fileDeposit",
    component: "Layout",
    redirect: "/fileDeposit",
    name: "FileDeposit",
    meta: {
      title: "文件存放",
      elIcon: "FolderOpened",
      noCache: true,
      hidden: false,
      alwaysShow: true
    },
    children: [
      {
        path: "detectReport",
        component: "permission/page",
        name: "DetectReport",
        meta: {
          title: "检测报告存放"
        }
      },
      {
        path: "environmentalProtection",
        component: "permission/directive",
        name: "EnvironmentalProtection",
        meta: {
          title: "环保管理"
        }
      },
      {
        path: "productEstimate",
        component: "permission/directive",
        name: "ProductEstimate",
        meta: {
          title: "稽核&会议记录"
        }
      }
    ]
  },
  {
    path: "/permission",
    component: "Layout",
    redirect: "/permission",
    name: "Permission",
    meta: {
      title: "权限管理",
      elIcon: "SetUp",
      noCache: true,
      hidden: false,
      alwaysShow: true
    },
    children: [
      {
        path: "menuManage",
        component: "permission/page",
        name: "MenuManage",
        meta: {
          title: "菜单管理"
        }
      },
      {
        path: "roleManage",
        component: "permission/directive",
        name: "RoleManage",
        meta: {
          title: "角色管理"
        }
      },
      {
        path: "userManage",
        component: "permission/directive",
        name: "UserManage",
        meta: {
          title: "用户管理"
        }
      },
      {
        path: "organization",
        component: "permission/directive",
        name: "Organization",
        meta: {
          title: "组织架构"
        }
      }
    ]
  },
  {
    path: "/logManage",
    component: "Layout",
    redirect: "/logManage",
    name: "logManage",
    meta: {
      title: "日志信息",
      elIcon: "Clock",
      noCache: true,
      hidden: false,
      alwaysShow: true
    },
    children: [
      {
        path: "loginLog",
        component: "fileManage/firstOrder",
        name: "LoginLog",
        meta: {
          title: "登录日志"
        }
      },
      {
        path: "operateLog",
        component: "fileManage/firstOrder",
        name: "OperateLog",
        meta: {
          title: "操作日志"
        }
      },
      {
        path: "abnormalLog",
        component: "fileManage/firstOrder",
        name: "AbnormalLog",
        meta: {
          title: "异常日志"
        }
      }
    ]
  }
]
