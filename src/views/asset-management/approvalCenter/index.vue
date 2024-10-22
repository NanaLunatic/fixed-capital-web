<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRouter } from "vue-router"
import { Download, FolderChecked, EditPen } from "@element-plus/icons-vue"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import { searchSign, signDownload } from "@/api/assetManagement/approvalCenter/index"
import { TypeListOption, approvalFormOptions, restitutionFormOptions, releaseFormOptions, applicationFormOptions, transferFormOptions, typeList } from './components/mock'
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))
const PublicDialog = defineAsyncComponent(() => import("@/components/PublicDialog/dialogIndex.vue"))
const ApproveDialog = defineAsyncComponent(() => import("@/views/asset-management/components/approveDialog.vue"))

const router = useRouter()
const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const publicDialogRef = ref()
const approveDialogRef = ref()
const localOptions = reactive({...mockOptions})

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({ api: searchSign, options: localOptions})

// 按钮权限
const { buttonVisibility } = usePermissionButton()

// 弹框的定义
const currDialogObj = ref<TypeListOption | null>()  // 对应的弹框是哪个,比如新增,修改
const currForm = ref<any[]>([])  // 当前弹框的formitem

// 数据类型下拉
const typeOptions = reactive([
  {label: "资产申请", value: "资产申请"},
  {label: "放行申请", value: "放行申请"},
  {label: "资产归还", value: "资产归还"},
  {label: "资产移转", value: "资产移转"},
])

// 数据状态下拉
const statusNameOptions = reactive([
  {label: "待审核", value: "待审核"},
  {label: "已完成", value: "已完成"},
])

// 弹框审批意见选择
const radioOptions = reactive([
  {label: '同意', value: true},
  {label: '驳回', value: false},
])

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(signDownload, formData)
}

// 批量审核
const handelApproval = () => {
  const selData = publicTableRef.value?.handleSelectionChange()
  if (!selData.length) {
    ElMessage.warning("至少选择一条数据")
    return
  }
  handelFun('approval', selData)
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
  currForm.value = approvalFormOptions.map((e:any) => {
    if(e.type === 'radio'){
      e.options = radioOptions
    }
    return e
  })

  nextTick(() => {
      publicDialogRef.value?.openSet(type, rows)
  })
}

// 单号点击事件
const handleRowClick = (row: any) => {
  router.push({ name: 'approvalDetail', query: { id: row.id } })
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

onMounted(async() => {
  querySearch(0, 20)
  formItem.forEach((item: any) => {
    if (item.prop === 'type') {
      item.options = typeOptions
    }
    if (item.prop === 'statusDesc') {
      item.options = statusNameOptions
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
          <el-button type="primary" v-show="buttonVisibility('approvalCenter:approval')" plain :icon="FolderChecked" @click="handelApproval">批量审核</el-button>
          <el-button type="primary" v-show="buttonVisibility('approvalCenter:process')" plain :icon="EditPen" @click="handelProcess">签核流程</el-button>
          <el-button type="warning" v-show="buttonVisibility('approvalCenter:export')" plain :icon="Download" @click="handelExport">导出</el-button>
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :data="tableData"
        :columns="columns"
        :options="options"
        @page-change="handlePageChange"
        @row-click="handleRowClick"
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
    <ApproveDialog ref="approveDialogRef"/>
  </div>
</template>
<style lang="scss" scoped>
</style>
