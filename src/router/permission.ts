import router from "@/router"
import isWhiteList from "@/config/white-list"
import { getToken, setToken } from "@/utils/cache/cookies"
import { usersActivateApi } from "@/api/login"
import { setUserInfo } from "@/utils/cache/local-storage"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  // 判断该用户是否登录
  if (getToken()) {
    if (to.path === "/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next({ path: "/" })
      NProgress.done()
    } else {
      // 判断url链接是否存在token-免登录
      if(to.query?.token){
        await usersActivateApi().then((res) => {
          setUserInfo(JSON.stringify(res.user))
        })
      }
      next()
    }
  } else {
    // 如果没有 Token
    if (isWhiteList(to)) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/login")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
