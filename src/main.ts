// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"

// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"
import datav from "@kjgl77/datav-vue3"

// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"

import { useUserStoreHook } from "@/store/modules/user"
import { setToken } from "@/utils/cache/cookies"

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)

/** 加载全局 SVG */
loadSvg(app)

/** 加载自定义指令 */
loadDirectives(app)

// 确保在应用启动时添加动态路由
const userStore = useUserStoreHook()

const initializeApp = async () => {
  let token = userStore.token
  if (!token) {
    // 带token免登录的情况 - 免登录
    const tokenMatch = location.href.match(/(?:[?&])token=([^&]+)/)
    if (tokenMatch) {
      token = tokenMatch[1]
      setToken(token)
    }
  }
  if (token) {
    await userStore.setDynamicRoutes()
  }

  app.use(store).use(datav).use(router)

  // 确保路由准备好再挂载应用
  await router.isReady()
  app.mount("#app")
}

initializeApp()
