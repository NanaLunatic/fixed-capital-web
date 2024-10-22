import { ElMessage, ElMessageBox } from "element-plus"
import { getCurrentTime } from "@/filter/index"
import router from "@/router"

export const exportLogs = async (exportFunction: (formData: Object | null) => Promise<Blob>, formData?: Object | null, fileName?: string | null) => {
  const metaTit = fileName ? fileName : router.currentRoute?.value.meta?.title
  ElMessageBox.confirm("导出全部数据, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    exportFunction(formData).then((res) => {
      const url = URL.createObjectURL(res) // 生成临时的下载链接
      const link = document.createElement("a") // 创建隐藏的a标签
      link.href = url // 设置下载链接
      link.download = `${metaTit + getCurrentTime()}.xlsx` // 设置下载文件名
      document.body.appendChild(link) // 添加a标签到页面中
      link.click() // 模拟点击a标签进行下载
      document.body.removeChild(link) // 下载完成后移除a标签
      URL.revokeObjectURL(url) // 释放临时的URL资源
      ElMessage.success("成功导出列表全部数据！")
    })
  })
}
