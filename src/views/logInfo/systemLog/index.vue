<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Download } from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
import { getSystemLog, searchSystemLog, errorSystemLog, exportSystemLog } from "@/api/logInfo/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options } from "./mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))

const loading = ref<boolean>(false)
const route = useRoute()
const search = ref()
const formItem = toRaw(formData)
const tableData = ref<[]>([])
const dialogVisible = ref(false)
const abnormalInfo = ref()
const searchData = ref()

const getButton = (type: string) => {
  if (type === "导出") {
    exportLogs(exportSystemLog)
  }
}

// 改变了分页
const handlePageChange = (name: string, val: number) => {
  options[name] = val
  const { currentPage, pageSize } = options
  if (searchData.value) {
    handleSearch(JSON.parse(searchData.value), currentPage - 1, pageSize)
  } else {
    queryTableData(currentPage - 1, pageSize)
  }
}

/** 操作列按钮 ---  查看异常 */
const actions = ref([
  {
    label: "查看异常",
    type: "warning",
    handler: (row: any) => {
      errorSystemLog(row.id).then((res) => {
        dialogVisible.value = true
        abnormalInfo.value = row.description + "</br>" + res.exception
      })
    },
    condition: (row: any) => !!row.exceptionDetail // 设置当前按钮显示隐藏
  }
])

//#region 查
// 获取列表
const queryTableData = (page = 0, size = 20) => {
  loading.value = true
  const params = {
    page,
    size
  }
  getSystemLog(params).then((res) => {
    //根据后端返回的页面+1
    options.total = res.totalElements
    tableData.value = res.content
    loading.value = false
  })
}

// 搜索查询
const handleSearch = (search: any, page: Number, size: Number) => {
  loading.value = true
  const params = {
    ...search,
    page: page ? page : options.currentPage - 1,
    size: size ? size : options.pageSize,
    startDate: search.bizTime?.[0] ?? null,
    endDate: search.bizTime?.[1] ?? null
  }
  delete params.bizTime
  searchData.value = JSON.stringify(params)
  searchSystemLog(params).then((res) => {
    options.total = res.totalElements
    tableData.value = res.content
    loading.value = false
  })
}
// 重置
const resetSearch = () => {
  searchData.value = null
  queryTableData()
}

onMounted(() => {
  queryTableData()
})
</script>

<template>
  <div class="main-content">
    <el-card shadow="never" class="search-wrapper">
      <SearchVue :form-item="formItem" @handle-search="handleSearch" @reset-search="resetSearch" :search="search" />
    </el-card>
    <el-card v-loading="loading" shadow="never" class="flex-fill">
      <div class="menu-op">
        <div>
          <el-button type="warning" plain :icon="Download" @click="getButton('导出')">导出</el-button>
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :data="tableData"
        :columns="columns"
        :options="options"
        :actions="actions"
        :maxHeight="520"
        @page-change="handlePageChange"
        @edit-column="editColumn"
      />
    </el-card>
    <el-drawer v-model="dialogVisible" title="异常信息" size="70%">
      <el-scrollbar max-height="calc(100vh - 158px)">
        <div class="exception">
          <p v-html.unsafe="abnormalInfo" />
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.exception {
  background-color: #2b2b2b;
  color: #bbb;
  line-height: 26px;
  padding: 10px;
}
.exception p {
  white-space: pre-wrap;
  font-size: 16px;
  font-family: monospace;
  margin: 0;
  word-wrap: break-word;
}
</style>
