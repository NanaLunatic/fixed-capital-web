<script lang="ts" setup>
import { toRaw, ref, onMounted, defineAsyncComponent, reactive } from "vue"
import { useRoute } from "vue-router"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, Download, Delete, Refresh } from "@element-plus/icons-vue"
// 引入表格组件
import SearchVue from "../../../components/PublicTable/search.vue"
import PublicTable from "../../../components/PublicTable/index.vue"
import formDialog from "./components/formDialog.vue"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import { getUsers, deleteUsers, searchUsers, editUsers, exportUsers, usersReset } from "@/api/permission"
import { exportLogs } from "@/utils/exportUtils"
import { formData, columns, options } from "./mock"
import { encrypt } from "@/utils/JSEncrypt"

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const publicTableRef = ref()
const fmDialogRef = ref()
const tableData = ref<[]>([])
const checkIds = ref<[]>([])
const searchData = ref()
const route = useRoute()
const formRef = ref<FormInstance>()
let formModel = reactive({})
const dialogVisible = ref(false)

// 按钮权限
const { buttonVisibility } = usePermissionButton()

//#region 增
const btnCombind = (type: string) => {
  if (type === "新增") {
    fmDialogRef.value.onOpenAddDialog(type, "")
  } else if (type === "批量删除") {
    rowDel()
  } else if (type === "导出") {
    const formData = searchData.value ? JSON.parse(searchData.value) : ""
    delete formData.page
    delete formData.size
    exportLogs(exportUsers, formData)
  } else if (type === "密码重置") {
    const selData = publicTableRef.value?.handleSelectionChange()
    if (!selData.length) {
      ElMessage.warning("至少选择一条数据")
      return
    }
    dialogVisible.value = true
  }
}
//#region 删
const rowDel = (index, row) => {
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
    deleteUsers(ids).then(() => {
      ElMessage.success("删除成功！")
      queryUsers()
    })
  })
}

// 密码重置确认
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      const selData = publicTableRef.value?.handleSelectionChange()
      const ids = selData.map((item: any) => item.id)
      const params = {
        ids: ids,
        newPass: encrypt(formModel.newPass)
      }
      // 服务请求
      usersReset(params).then(() => {
        ElMessage.success("操作成功！")
        queryUsers()
        dialogVisible.value = false
      })
    }
  })
}

/** 操作列按钮 */
const actions = ref([
  {
    label: "修改",
    type: "primary",
    handler: (row: any) => {
      fmDialogRef.value.onOpenAddDialog("edit", row)
    },
    condition: (row: any) => buttonVisibility("User:edit") // 设置当前按钮显示隐藏
  }
])

// 编辑单元格
const editColumn = (row) => {
  editUsers(row).then((res) => {
    ElMessage.success("角色修改成功！")
  })
  queryUsers()
}

// 改变了分页
const handlePageChange = (name: string, val: number) => {
  options[name] = val
  const { currentPage, pageSize } = options
  if (searchData.value) {
    handleSearch(JSON.parse(searchData.value), currentPage - 1, pageSize)
  } else {
    queryUsers(currentPage - 1, pageSize)
  }
}

//#region 查

// 查询接口
// 获取列表
const queryUsers = (page = 0, size = 10) => {
  loading.value = true
  const params = {
    page,
    size
  }
  getUsers(params).then((res) => {
    //根据后端返回的页面+1
    options.currentPage = res.page + 1
    options.pageSize = res.size
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
    size: size ? size : options.pageSize
  }
  searchData.value = JSON.stringify(params)
  searchUsers(params).then((res) => {
    options.currentPage = res.page + 1
    options.pageSize = res.size
    options.total = res.totalElements
    tableData.value = res.content
    loading.value = false
  })
}
// 重置
const resetSearch = () => {
  searchData.value = null
  queryUsers()
}

const closeReset = () => {
  if (searchData.value) {
    handleSearch(JSON.parse(searchData.value), options.currentPage - 1, options.pageSize)
  } else {
    queryUsers(options.currentPage - 1, options.pageSize)
  }
}

onMounted(() => {
  queryUsers()
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
          <el-button
            v-if="buttonVisibility('User:add')"
            plain
            type="primary"
            :icon="CirclePlus"
            @click="btnCombind('新增')"
            >新增</el-button
          >
          <el-button
            v-show="buttonVisibility('User:export')"
            type="warning"
            plain
            :icon="Download"
            @click="btnCombind('导出')"
            >导出</el-button
          >
          <el-button
            v-if="buttonVisibility('User:delete')"
            plain
            type="danger"
            :icon="Delete"
            @click="btnCombind('批量删除')"
            >批量删除</el-button
          >
          <el-button
            v-if="buttonVisibility('User:add')"
            plain
            type="primary"
            :icon="Refresh"
            @click="btnCombind('密码重置')"
            >密码重置</el-button
          >
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
        @edit-column="editColumn"
      />
    </el-card>
    <formDialog ref="fmDialogRef" @close-reset="closeReset" />

    <!-- 重置密码弹框 -->
    <el-dialog v-model="dialogVisible" draggable title="密码重置" width="580" :close-on-click-modal="true">
      <div class="dialog-content">
        <el-form ref="formRef" :model="formModel" :validate-on-rule-change="false" label-width="126px">
          <el-col>
            <el-form-item prop="newPass" label="新密码" :rules="[{ required: true, message: '必填' }]">
              <el-input v-model="formModel.newPass" type="password" show-password placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.dialog-content {
  width: 84%;
  margin-left: 6%;
}
</style>
