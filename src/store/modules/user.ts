import { nextTick, ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { resetRouter } from "@/router"
import router from "@/router"
import { loginApi, UserMenusBuildAll, loginLogout } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import { setUserInfo } from "@/utils/cache/local-storage"

const Layout = () => import("@/layouts/index.vue")

// 使用 import.meta.glob 创建一个上下文模块
const viewModules = import.meta.glob('@/views/**/*.vue')

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")
  const userInfo = ref<string[]>([])
  const dynamicRoutes = ref([])

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = (data: LoginRequestData) => {
    return new Promise<LoginRequestData>((resolve, reject) => {
      loginApi(data)
        .then((res) => {
          if (res) {
            setToken(res.token)
            token.value = res.token
            username.value = res.user.user.username
            roles.value = res.user.roles
            userInfo.value = res.user.user
            setUserInfo( JSON.stringify(res.user))
            setTimeout(() => {
              // 防止登录过期重新登录左侧路由菜单加载不出
              location.href = location.origin  // 强制跳转
            }, 0)
            resolve(res)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /** 后端服务-动态路由 */
  const dynamicRoutesFun= () => {
    return new Promise((resolve, reject) => {
      UserMenusBuildAll().then((res) => {
        dynamicRoutes.value = transformRoutes(res)
        resolve(dynamicRoutes.value)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
  /** 转换字符串路径为动态 import 语句 */
  const transformRoutes = (routes) => {
    return routes.map(route => {
      if (route.component && typeof route.component === 'string') {
        if (route.component === 'Layout') {
          route.component = Layout
        } else {
          route.component = loadView(route.component)
        }
      }
      if (route.children && route.children.length) {
        route.children = transformRoutes(route.children)
      }
      return route
    })
  }
  /** 动态加载视图组件 */
  const loadView = (view: string) => {
    // 构建最终的路径
    const viewPath = `/src/views/${view}`

    // 动态导入视图组件
    if (viewModules[viewPath]) {
      return viewModules[viewPath]
    } else {
      throw new Error(`${viewPath}未找到`)
    }
  }
  /** 设置动态路由 */
  const setDynamicRoutes = async () => {
    const routes = await dynamicRoutesFun()
    routes.forEach(route => {
      router.addRoute(route)
    })
  }
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }
  /** 登出 */
  const logout = () => {
    try {
      loginLogout().then((res) => {
        removeToken()
        token.value = ""
        roles.value = []
        resetRouter()
        _resetTagsView()
        // 清理用户信息
        userInfo.value = []
        username.value = ""
        location.href = location.origin  // 强制跳转
      })
      .catch((error) => {
        throw new Error(error)
      })
    } catch (error) {
      console.error(error)
    }
  }


  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return {
    token,
    roles,
    username,
    login,
    userInfo,
    dynamicRoutesFun,
    dynamicRoutes,
    setDynamicRoutes,
    changeRoles,
    logout,
    resetToken
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
