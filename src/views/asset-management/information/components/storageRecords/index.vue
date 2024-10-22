<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Download } from "@element-plus/icons-vue"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { searchStorages, storagesDownload } from "@/api/assetManagement/information/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const localOptions = reactive({...mockOptions})

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({ api: searchStorages, options: localOptions})

// 入库类型下拉
const typeOptions = reactive([
  {label: "正常", value: "正常"},
  {label: "移转", value: "移转"},
])

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(storagesDownload, formData, '入库记录')
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
    if (item.prop === 'storageType') {
      item.options = typeOptions
    }
  })
})

</script>

<template>
  <div>
    <div shadow="never" class="search-wrapper">
      <SearchVue :form-item="formItem" @handle-search="handleSearch" @reset-search="resetSearch" :search="search" />
    </div>
    <el-divider class="divider-pad" />
    <div v-loading="loading" shadow="never" class="flex-fill">
      <div class="menu-op">
        <div class="content">
          <el-button type="warning" plain :icon="Download" @click="handelExport">导出</el-button>
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :showSelection="false"
        :data="tableData"
        :columns="columns"
        :options="options"
        :maxHeight="378"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
