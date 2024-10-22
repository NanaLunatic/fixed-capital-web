<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, Download, EditPen } from "@element-plus/icons-vue"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import { searchThroughRequest, throughRequestDownload } from "@/api/assetRelease/index"
import { TypeListOption, assetsFormOptions, typeList } from "./components/mock"
import { useFetchSelect } from "@/hooks/useFetchSelect"
import { commonAssets, commonSupervisor } from "@/api/public/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))
const PublicDialog = defineAsyncComponent(() => import("@/components/PublicDialog/dialogIndex.vue"))
const ApproveDialog = defineAsyncComponent(() => import("@/views/asset-management/components/approveDialog.vue"))

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const publicDialogRef = ref()
const approveDialogRef = ref()
const localOptions = reactive({ ...mockOptions })

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({
  api: searchThroughRequest,
  options: localOptions
})

// 按钮权限
const { buttonVisibility } = usePermissionButton()

// 弹框的定义
const currDialogObj = ref<TypeListOption | null>() // 对应的弹框是哪个,比如新增,修改
const currForm = ref<any[]>([]) // 当前弹框的formitem
const currOptionType = ref<any[]>([]) // 当前弹框所对应的下拉prop

// 服务下拉
const { options: assetsOption, loadData: assetsLoadData } = useFetchSelect({ api: commonAssets })
const { options: supervisorOption, loadData: supervisorLoadData } = useFetchSelect({ api: commonSupervisor })

// 加载下拉选项
const loadSelectOptions = () => {
  return Promise.all([assetsLoadData(), supervisorLoadData()]).then(() => {
    currForm.value.forEach((item: any) => {
      // 资产编码
      if (item.prop === "assets") {
        item.options = assetsOption.value.map((obj: any) => ({ label: obj.assetsNo, value: obj.id }))
      }
      // 放行主管
      if (item.prop === "supervisorId") {
        item.options = supervisorOption.value.map((obj: any) => ({ label: obj.nickName, value: obj.id }))
      }
    })
  })
}

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(throughRequestDownload, formData)
}

// 签核流程
const handelProcess = () => {
  const selData = publicTableRef.value?.handleSelectionChange()
  if (!selData.length || selData.length > 1) {
    ElMessage.warning("请仅选择一条数据进行操作")
    return
  }
  approveDialogRef.value?.openDialog(selData[0])
}

// 弹框统一操作事件
const handelFun = (type: string, rows?: object) => {
  // 获取当前是哪个弹框以及对应的form内容
  currDialogObj.value = typeList[0]
  currForm.value = assetsFormOptions
  currOptionType.value = ["assets"]

  // 根据下拉映射获取当前弹框的所有下拉请求
  loadSelectOptions()

  nextTick(() => {
    publicDialogRef.value?.openSet(type, rows)
  })
}

// 改变了分页
const handlePageChange = (name: string, val: number) => {
  options[name] = val
  const { currentPage, pageSize } = options
  let searchObj = JSON.parse(searchData.value)
  delete searchObj.page
  delete searchObj.size
  querySearch(currentPage - 1, pageSize, searchObj)
}

// 搜索查询
const handleSearch = (search: any) => {
  querySearch(0, 20, search)
}

// 重置
const resetSearch = () => {
  searchData.value = null
  querySearch(0, 20)
}

onMounted(() => {
  querySearch(0, 20)
})
</script>

<template>
  <div class="main-content">
    <el-card shadow="never" class="search-wrapper">
      <SearchVue :form-item="formItem" @handle-search="handleSearch" @reset-search="resetSearch" :search="search" />
    </el-card>
    <el-card v-loading="loading" shadow="never" class="flex-fill">
      <div class="menu-op">
        <div class="content">
          <el-button
            type="primary"
            v-show="buttonVisibility('releaseApplication:add')"
            plain
            :icon="CirclePlus"
            @click="handelFun('add')"
            >新增</el-button
          >
          <el-button
            type="primary"
            v-show="buttonVisibility('releaseApplication:process')"
            plain
            :icon="EditPen"
            @click="handelProcess"
            >签核流程</el-button
          >
          <el-button
            type="warning"
            v-show="buttonVisibility('releaseApplication:export')"
            plain
            :icon="Download"
            @click="handelExport"
            >导出</el-button
          >
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :data="tableData"
        :columns="columns"
        :options="options"
        @page-change="handlePageChange"
      />
    </el-card>

    <!-- 弹框 -->
    <PublicDialog
      ref="publicDialogRef"
      :currDialogObj="currDialogObj"
      :currForm="currForm"
      :currOptionType="currOptionType"
      @query-search="querySearch"
    />

    <!-- 签核流程弹框 -->
    <ApproveDialog ref="approveDialogRef" />
  </div>
</template>
<style lang="scss" scoped></style>
