<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, Download, Delete } from "@element-plus/icons-vue"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import { searchLocations, locationsDownload, deleteLocations } from "@/api/assetManagement/locations/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
import { TypeListOption, editFormOptions, typeList } from './components/mock'
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))
const PublicDialog = defineAsyncComponent(() => import("@/components/PublicDialog/dialogIndex.vue"))

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const publicDialogRef = ref()
const localOptions = reactive({...mockOptions})

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({ api: searchLocations, options: localOptions})

// 按钮权限
const { buttonVisibility } = usePermissionButton()

// 弹框的定义
const currDialogObj = ref<TypeListOption | null>()  // 对应的弹框是哪个,比如新增,修改
const currForm = ref<any[]>([])  // 当前弹框的formitem
const currOptionType = ref<any[]>([])  // 当前弹框所对应的下拉prop

// 删除
const handelDel = () => {
  const selData = publicTableRef.value?.handleSelectionChange()
  const ids = selData.map((item: any) => item.id)
  if (!ids.length) {
    ElMessage.warning("至少选择一条数据")
    return
  }
  ElMessageBox.confirm(`确定删除${ids.length}条数据？`, "注意", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  }).then(() => {
    deleteLocations(ids).then(() => {
      ElMessage.success("删除成功！")
      querySearch(0, 20)
    })
  })
}

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(locationsDownload, formData)
}

// 弹框统一操作事件
const handelFun = (type: string, rows?: object) => {
  const dialogOption = typeList.find((item: any) => item.type === type)
  if(dialogOption){
    // 获取当前是哪个弹框以及对应的form内容
    currDialogObj.value = dialogOption
    currForm.value = editFormOptions
    currOptionType.value = ['type']

    nextTick(() => {
      publicDialogRef.value?.openSet(type, rows)
    })
  }
}

/** 操作列按钮 */
const actions = ref([
  {
    label: '修改',
    handler: (row: any) => {
      handelFun('edit', [row])
    },
    condition: (row: any) => buttonVisibility('locations:edit'),
  }
])


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
          <el-button type="primary" v-show="buttonVisibility('locations:add')" plain :icon="CirclePlus" @click="handelFun('add')">新增</el-button>
          <el-button type="danger" v-show="buttonVisibility('locations:delete')" plain :icon="Delete" @click="handelDel">删除</el-button>
          <el-button type="warning" v-show="buttonVisibility('locations:export')" plain :icon="Download" @click="handelExport">导出</el-button>
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :data="tableData"
        :columns="columns"
        :options="options"
        :actions="actions"
        :maxHeight="480"
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
  </div>
</template>
<style lang="scss" scoped>
</style>
