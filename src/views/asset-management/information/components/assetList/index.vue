<script lang="ts" setup>
import { defineAsyncComponent, toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { useRouter } from "vue-router"
import { type UploadRawFile, ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, Delete, Download, Upload, Box, FolderDelete, Printer, CircleClose } from "@element-plus/icons-vue"
import { useFetchSelect } from "@/hooks/useFetchSelect"
import { useFetchSearch } from "@/hooks/useHandleSearch"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import {
  searchAssets,
  deleteAssets,
  assetsStorage,
  assetsDownload,
  assetsUpload
} from "@/api/assetManagement/information/index"
import { typesFindAll, locationsFindAll, unitsFindAll, commonRecipient, commonNote } from "@/api/public/index"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options as mockOptions } from "./mock"
import {
  TypeListOption,
  editFormOptions,
  scrapFormOptions,
  repairFormOptions,
  outboundFormOptions,
  failureFormOptions,
  typeList
} from "./components/mock"
// 使用异步组件减少初始加载时间
const SearchVue = defineAsyncComponent(() => import("@/components/PublicTable/search.vue"))
const PublicTable = defineAsyncComponent(() => import("@/components/PublicTable/index.vue"))
const PublicDialog = defineAsyncComponent(() => import("@/components/PublicDialog/dialogIndex.vue"))
const PrintDialog = defineAsyncComponent(() => import("./components/printDialog.vue"))

const router = useRouter()
const loading = ref<boolean>(false)
const search = ref()
let formItem = toRaw(formData)
const publicTableRef = ref()
const publicDialogRef = ref()
const printDialogRef = ref()
const uploadRef = ref()
const localOptions = reactive({ ...mockOptions })

// 搜索表格hooks操作
const { querySearch, options, searchData, tableData } = useFetchSearch({ api: searchAssets, options: localOptions })

// 按钮权限
const { buttonVisibility } = usePermissionButton()

// 弹框的定义
const currDialogObj = ref<TypeListOption | null>() // 对应的弹框是哪个,比如新增,修改
const currForm = ref<any[]>([]) // 当前弹框的formitem
const currOptionType = ref<any[]>([]) // 当前弹框所对应的下拉prop

// 弹框映射
const formOptionsMap = {
  add: editFormOptions, // 新增
  edit: editFormOptions, // 修改
  scrap: scrapFormOptions, //  报废
  repair: repairFormOptions, // 维修
  outbound: outboundFormOptions, // 出库
  failure: failureFormOptions // 失效
}

// 状态下拉
const statusOptions = reactive([
  { label: "闲置", value: "闲置" },
  { label: "报废", value: "报废" },
  { label: "维修", value: "维修" },
  { label: "使用中", value: "使用中" }
])

// 服务下拉
const { options: typesOption, loadData: typesLoadData } = useFetchSelect({ api: typesFindAll })
const { options: locationsOption, loadData: locationsLoadData } = useFetchSelect({ api: locationsFindAll })
const { options: unitsOption, loadData: unitsLoadData } = useFetchSelect({ api: unitsFindAll })
const { options: recipientOption, loadData: recipientLoadData } = useFetchSelect({ api: commonRecipient })
const { options: noteOption, loadData: noteLoadData } = useFetchSelect({ api: commonNote })

// 下拉映射
const selOptionsMap = {
  type: typesLoadData, // 类型
  locations: locationsLoadData, // 仓位
  unit: unitsLoadData, // 单位
  recipient: recipientLoadData, // 领用人
  note: noteLoadData // 申请单号
}

// 加载下拉选项
const loadSelectOptions = (arr: object[] | []) => {
  const loadArr = arr.map((load) => selOptionsMap[load]())
  return Promise.all(loadArr).then(() => {
    currForm.value.forEach((item: any) => {
      // 类型
      if (item.prop === "type") {
        item.options = typesOption.value.map((obj: any) => ({ label: obj.typeName, value: obj.id }))
      }

      // 仓位
      if (item.prop === "locations") {
        item.options = locationsOption.value.map((obj: any) => ({ label: obj.locationsName, value: obj.id }))
      }

      // 单位
      if (item.prop === "unit") {
        item.options = unitsOption.value.map((obj: any) => ({ label: obj.unitName, value: obj.id }))
      }

      // 领用人
      if (item.prop === "recipient") {
        item.options = recipientOption.value.map((obj: any) => ({ label: obj.nickName, value: obj.id }))
      }

      // 申请单号
      if (item.prop === "note") {
        item.options = noteOption.value.map((obj: any) => ({ label: obj.note, value: obj.id }))
      }
    })
  })
}

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
    deleteAssets(ids).then(() => {
      ElMessage.success("删除成功！")
      querySearch(0, 20)
    })
  })
}

// 弹框统一操作事件
const handelFun = (type: string, rows?: object) => {
  const dialogOption = typeList.find((item: any) => item.type === type)
  if (dialogOption) {
    // 获取当前是哪个弹框以及对应的form内容
    currDialogObj.value = dialogOption
    currForm.value = formOptionsMap[dialogOption.formType] || []

    // 请求对应的弹框下拉
    let loadArr = ["type", "locations", "unit", "recipient", "note"]
    currOptionType.value = currForm.value
      .map((obj: any) => {
        if (loadArr.includes(obj.prop)) {
          return obj.prop
        }
      })
      .filter((k: string | null) => k)

    if (currOptionType.value.length) {
      loadSelectOptions(currOptionType.value)
    }

    nextTick(() => {
      publicDialogRef.value?.openSet(type, rows)
    })
  }
}

// 报废 & 维修
const handelSelChange = (type: string) => {
  const selData = publicTableRef.value?.handleSelectionChange()
  if (!selData.length) {
    ElMessage.warning("至少选择一条数据")
    return
  }
  handelFun(type, selData)
}

// 导入
const handelImport = (options: UploadRawFile) => {
  const formData = new FormData()
  formData.append("file", options.file)
  assetsUpload(formData)
    .then((res) => {
      ElMessage.success("导入成功！")
      querySearch(0, 20)
    })
    .finally(() => {
      uploadRef.value?.clearFiles()
    })
}

// 导出
const handelExport = () => {
  const formData = searchData.value ? JSON.parse(searchData.value) : ""
  delete formData.page
  delete formData.size
  exportLogs(assetsDownload, formData, "资产列表")
}

// 标签打印
const handelPrint = () => {
  // const selData = publicTableRef.value?.handleSelectionChange()
  // if (!selData.length) {
  //   ElMessage.warning("至少选择一条数据")
  //   return
  // }
  router.push({ name: "printEdit" })
}

/** 操作列按钮 */
const actions = ref([
  {
    label: "出库",
    handler: (row: any) => {
      handelFun("outbound", [row])
    },
    condition: (row: any) => buttonVisibility("assetList:outbound") // 设置当前按钮显示隐藏
  },
  {
    label: "入库",
    handler: (row: any) => {
      ElMessageBox.confirm(`该条数据是否入库？`, "注意", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        assetsStorage({ id: row.id }).then(() => {
          ElMessage.success("操作成功！")
          querySearch(0, 20)
        })
      })
    },
    condition: (row: any) => buttonVisibility("assetList:storage") // 设置当前按钮显示隐藏
  },
  {
    label: "修改",
    handler: (row: any) => {
      handelFun("edit", [row])
    },
    condition: (row: any) => buttonVisibility("assetList:edit") // 设置当前按钮显示隐藏
  },
  {
    label: "打印标签",
    handler: (row: any) => {
      printDialogRef.value?.showModal(row)
    },
    condition: (row: any) => buttonVisibility("assetList:print") // 设置当前按钮显示隐藏
  }
])

// 搜索查询
const handleSearch = (search: any) => {
  querySearch(0, 20, search)
}

// 重置
const resetSearch = () => {
  searchData.value = null
  querySearch(0, 20)
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

onMounted(async () => {
  await typesLoadData()
  querySearch(0, 20)
  formItem.forEach((item: any) => {
    if (item.prop === "status") {
      item.options = statusOptions
    }
    if (item.prop === "typeName") {
      item.options = typesOption.value.map((obj: any) => ({ label: obj.typeName, value: obj.typeName }))
    }
  })
})
</script>

<template>
  <div>
    <div class="search-wrapper">
      <SearchVue :form-item="formItem" @handle-search="handleSearch" @reset-search="resetSearch" :search="search" />
    </div>
    <el-divider class="divider-pad" />
    <div class="flex-fill">
      <div class="menu-op">
        <div class="content">
          <el-button
            type="primary"
            v-show="buttonVisibility('assetList:add')"
            plain
            :icon="CirclePlus"
            @click="handelFun('add')"
            >新增</el-button
          >
          <el-button type="danger" v-show="buttonVisibility('assetList:delete')" plain :icon="Delete" @click="handelDel"
            >删除</el-button
          >
          <el-button
            type="primary"
            v-show="buttonVisibility('assetList:repair')"
            plain
            :icon="Box"
            @click="handelSelChange('repair')"
            >维修</el-button
          >
          <el-button
            type="info"
            v-show="buttonVisibility('assetList:scrap')"
            plain
            :icon="FolderDelete"
            @click="handelSelChange('scrap')"
            >报废</el-button
          >
          <el-upload
            class="file-btn"
            ref="uploadRef"
            action="#"
            v-show="buttonVisibility('assetList:import')"
            :auto-upload="true"
            :show-file-list="false"
            :limit="1"
            :http-request="handelImport"
          >
            <el-button type="success" plain :icon="Upload">导入</el-button>
          </el-upload>
          <el-button
            type="warning"
            v-show="buttonVisibility('assetList:export')"
            plain
            :icon="Download"
            @click="handelExport"
            >导出</el-button
          >
          <!-- <el-button type="primary" plain :icon="Printer" @click="handelPrint">标签打印</el-button> -->
          <el-button type="info" plain :icon="CircleClose" @click="handelSelChange('failure')">失效</el-button>
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :data="tableData"
        :columns="columns"
        :options="options"
        :actions="actions"
        :maxHeight="378"
        @page-change="handlePageChange"
      />
    </div>

    <!-- 标签打印弹框 -->
    <PrintDialog ref="printDialogRef" />

    <!-- 其他弹框 -->
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
.menu-op .content {
  display: flex;
  align-items: center;
}
.file-btn {
  margin: auto 12px;
}
</style>
