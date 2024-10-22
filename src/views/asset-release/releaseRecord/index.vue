<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { TopRight, Download } from "@element-plus/icons-vue"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import { searchThrough, throughDownload, postThrough } from "@/api/assetRelease/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const assetsSnCode = ref()
const localOptions = reactive({...mockOptions})

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({ api: searchThrough, options: localOptions})

// 按钮权限
const { buttonVisibility } = usePermissionButton()

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(throughDownload, formData)
}

// 放行
const handelRelease = () => {
  if(!assetsSnCode.value) {
    ElMessage.warning("二维码未输入，请检查")
    return
  }
  postThrough({assetsSnCode: assetsSnCode.value}).then(() => {
    ElMessage.success("操作成功！")
    assetsSnCode.value = null
    querySearch(0, 20)
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
          <el-button type="warning" v-show="buttonVisibility('releaseRecord:export')" plain :icon="Download" @click="handelExport">导出</el-button>
        </div>
        <div class="menu-right">
          <div>二维码</div>
          <el-input class="nemu-input" v-model="assetsSnCode" placeholder="请输入" @keyup.enter="handelRelease" clearable @clear="querySearch(0, 20)" />
          <el-button type="primary" plain :icon="TopRight" @click="handelRelease">放行</el-button>
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :showSelection="false"
        :data="tableData"
        :columns="columns"
        :options="options"
        @page-change="handlePageChange"
      />
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.menu-right{
  display: flex;
  align-items: center;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  .nemu-input{
    width: 210px;
    margin: auto 18px auto 8px;
  }
}
</style>
