import { getUserInfo } from "@/utils/cache/local-storage"

export function usePermissionButton() {
  const buttonVisibility = (pageBtn: string) => {
    const userInfo = JSON.parse(getUserInfo() || '')
    const findBtn = userInfo.roles?.includes(pageBtn)
    return findBtn
  }

  return {
    buttonVisibility
  }
}
