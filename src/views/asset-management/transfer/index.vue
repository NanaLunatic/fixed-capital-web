<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Download, EditPen } from "@element-plus/icons-vue"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import { searchTransfer, transferDownload } from "@/api/assetManagement/transfer/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))
const ApproveDialog = defineAsyncComponent(() => import("@/views/asset-management/components/approveDialog.vue"))

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const approveDialogRef = ref()
const localOptions = reactive({...mockOptions})

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({ api: searchTransfer, options: localOptions})

// 按钮权限
const { buttonVisibility } = usePermissionButton()

// 状态下拉
const statusOptions = reactive([
  {label: "待审核", value: "待审核"},
  {label: "审核中", value: "审核中"},
  {label: "已完成", value: "已完成"},
  {label: "拒签", value: "拒签"},
])

// 签核流程
const handelProcess = () => {
  const selData = publicTableRef.value?.handleSelectionChange()
  if (!selData.length || selData.length > 1) {
    ElMessage.warning("请仅选择一条数据进行操作")
    return
  }
  approveDialogRef.value?.openDialog(selData[0])
}

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(transferDownload, formData)
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
  formItem.forEach((item: any) => {
    if (item.prop === 'statusName') {
      item.options = statusOptions
    }
  })
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
          <el-button type="primary" v-show="buttonVisibility('transfer:process')" plain :icon="EditPen" @click="handelProcess">签核流程</el-button>
          <el-button type="warning" v-show="buttonVisibility('transfer:export')" plain :icon="Download" @click="handelExport">导出</el-button>
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

    <!-- 签核流程弹框 -->
    <ApproveDialog ref="approveDialogRef"/>
  </div>
</template>
<style lang="scss" scoped>
</style>
