import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")


/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/personalCenter",
    name: "PersonalCenter",
    component: () => import("@/views/personal-center/index.vue"),
    meta: {
      title: "个人中心",
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          elIcon: "House",
          hidden: false,
          affix: true,
          keepAlive: false
        }
      }
    ]
  },
  // {
  //   path: "/assetManagement",
  //   component: Layouts,
  //   redirect: "/assetManagement/information",
  //   name: "assetManagement",
  //   meta: {
  //     title: "资产管理",
  //     elIcon: "CreditCard",
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "information",
  //       component: () => import("@/views/asset-management/information/index.vue"),
  //       name: "information",
  //       meta: {
  //         title: "资产资料",
  //       }
  //     },{
  //       path: "/printModel/printEdit",
  //       component: () => import("@/views/print-edit/print.vue"),
  //       name: "printEdit",
  //       meta: {
  //         title: "打印编辑",
  //         hidden: true
  //       }
  //     },{
  //       path: "application",
  //       component: () => import("@/views/asset-management/application/index.vue"),
  //       name: "application",
  //       meta: {
  //         title: "资产申请",
  //       }
  //     },{
  //       path: "transfer",
  //       component: () => import("@/views/asset-management/transfer/index.vue"),
  //       name: "transfer",
  //       meta: {
  //         title: "资产移转",
  //       }
  //     },{
  //       path: "types",
  //       component: () => import("@/views/asset-management/types/index.vue"),
  //       name: "types",
  //       meta: {
  //         title: "资产类型",
  //       }
  //     },{
  //       path: "unit",
  //       component: () => import("@/views/asset-management/unit/index.vue"),
  //       name: "unit",
  //       meta: {
  //         title: "资产单位",
  //       }
  //     },{
  //       path: "locations",
  //       component: () => import("@/views/asset-management/locations/index.vue"),
  //       name: "locations",
  //       meta: {
  //         title: "资产仓位",
  //       }
  //     },{
  //       path: "outbound",
  //       component: () => import("@/views/asset-management/outbound/index.vue"),
  //       name: "outbound",
  //       meta: {
  //         title: "资产出库",
  //       }
  //     },{
  //       path: "approvalCenter",
  //       component: () => import("@/views/asset-management/approvalCenter/index.vue"),
  //       name: "approvalCenter",
  //       meta: {
  //         title: "签核中心",
  //       }
  //     },{
  //       path: "approvalCenter/approvalDetail",
  //       component: () => import("@/views/asset-management/approvalCenter/approvalDetail.vue"),
  //       name: "approvalDetail",
  //       meta: {
  //         title: "签核详情",
  //         hidden: true
  //       }
  //     },{
  //       path: "printModel",
  //       component: () => import("@/views/asset-management/printModel/index.vue"),
  //       name: "printModel",
  //       meta: {
  //         title: "资产模板",
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/assetRelease",
  //   component: Layouts,
  //   redirect: "/assetRelease/releaseApplication",
  //   name: "assetRelease",
  //   meta: {
  //     title: "资产放行",
  //     elIcon: "Position",
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "releaseApplication",
  //       component: () => import("@/views/asset-release/releaseApplication/index.vue"),
  //       name: "releaseApplication",
  //       meta: {
  //         title: "放行申请",
  //       }
  //     },{
  //       path: "releaseRecord",
  //       component: () => import("@/views/asset-release/releaseRecord/index.vue"),
  //       name: "releaseRecord",
  //       meta: {
  //         title: "放行记录",
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/logInfo",
  //   component: Layouts,
  //   redirect: "/logInfo/loginLog",
  //   name: "logInfo",
  //   meta: {
  //     title: "日志信息",
  //     elIcon: "Clock",
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "loginLog",
  //       component: () => import("@/views/logInfo/loginLog/index.vue"),
  //       name: "LoginLog",
  //       meta: {
  //         title: "登录日志",
  //       }
  //     },
  //     {
  //       path: "systemLog",
  //       component: () => import("@/views/logInfo/systemLog/index.vue"),
  //       name: "SystemLog",
  //       meta: {
  //         title: "系统日志"
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name } = route
      if (name) {
        if (router.hasRoute(name)) {
          router.removeRoute(name)
        }
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
