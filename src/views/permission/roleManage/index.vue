<script lang="ts" setup>
import { toRaw, reactive, ref, onMounted, nextTick } from "vue"
import { useRoute } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"
import { type FormInstance } from "element-plus"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import SearchVue from "@/components/PublicTable/search.vue"
import PublicTable from "@/components/PublicTable/index.vue"
import { formData, columns, options } from "./mock"
import { getRoles, addRoles, editRoles, deleteRoles, searchRoles, exportRoles } from "@/api/permission"
import { CirclePlus, Delete, Download, Promotion, Connection } from "@element-plus/icons-vue"
import PublicDialog from "@/components/PublicDialog/index.vue"
import MenuAllocate from "@/components/MenuAllocate/index.vue"
import { exportLogs } from "@/utils/exportUtils"

const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const tableData = ref<[]>([])
const publicTableRef = ref()
const plcDialogRef = ref()
const dialog_title = ref()
const roleFormRef = ref<FormInstance | null>(null)
const checkIds = ref<[]>([])
const menuIds = ref()
const searchData = ref()
const route = useRoute()
const roleRow = ref()
const menuAllocateShow = ref(false)
const leftMenu = ref()

// 按钮权限
const { buttonVisibility } = usePermissionButton()

//新增修改表单
const roleData = reactive({
  id: null, //新增id为空
  roleName: "", //角色名称
  roleSort: 999,
  menu: [], //数组
  enabled: true, //角色状态
  description: "" //描述
})

//#region 增
const btnCombind = (type: string) => {
  if (type === "新增") {
    plcDialogRef.value.openDialog()
    menuAllocateShow.value = true
    nextTick(() => {
      roleFormRef.value?.resetFields()
      roleData.id = null
      roleData.roleName = ""
      roleData.roleSort = 999
      roleData.menu = []
      roleData.enabled = true
      roleData.description = ""
      dialog_title.value = "新增"
    })
  } else if (type === "批量删除") {
    rowDel()
  } else if (type === "导出") {
    const formData = searchData.value ? JSON.parse(searchData.value) : ""
    delete formData.page
    delete formData.size
    exportLogs(exportRoles, formData)
  }
}
//新增修改提交
const dialogSubmit = (type: String) => {
  if (type == "exit") {
    //取消
    plcDialogRef.value.closeDialog()
    menuAllocateShow.value = false
  } else {
    //新增
    roleData.menu = menuIds.value
    roleData.leftMenu = leftMenu.value
    if (roleData.id) {
      // 修改接口
      if (!menuIds.value) {
        roleData.menu = roleRow.value.menu
      }
      if (!leftMenu.value) {
        roleData.leftMenu = roleRow.value.leftMenu
      }
      editRoles(roleData).then((res) => {
        ElMessage.success("角色修改成功！")
        plcDialogRef.value.closeDialog()
        menuAllocateShow.value = false
      })
    } else {
      addRoles(roleData).then((res) => {
        ElMessage.success("角色新增成功！")
        plcDialogRef.value.closeDialog()
        menuAllocateShow.value = false
      })
    }
    setTimeout(() => {
      queryRoles()
    }, 1000)
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
  })
    .then(() => {
      deleteRoles(ids).then(() => {
        ElMessage.success("删除成功！")
        queryRoles()
      })
    })
    .catch(() => {
      ElMessage.info("用户已取消")
    })
}

// 改变了分页
const handlePageChange = (name: string, val: number) => {
  options[name] = val
  const { currentPage, pageSize } = options
  //查询时--根据后端返回的页面-1
  if (searchData.value) {
    handleSearch(JSON.parse(searchData.value), currentPage - 1, pageSize)
  } else {
    queryRoles(currentPage - 1, pageSize)
  }
}

/** 操作列按钮 */
const actions = ref([
  {
    label: "修改",
    type: "primary",
    handler: (row: any) => {
      Object.keys(roleData).forEach((key) => {
        roleData[key] = row[key]
      })
      roleRow.value = row
      dialog_title.value = "修改"
      plcDialogRef.value.openDialog()
      menuAllocateShow.value = true
    },
    condition: (row: any) => buttonVisibility("Role:edit") // 设置当前按钮显示隐藏
  }
])

// 查询接口
// 获取列表
const queryRoles = (page = 0, size = 10) => {
  loading.value = true
  const params = {
    page,
    size
  }
  getRoles(params).then((res) => {
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
  searchRoles(search).then((res) => {
    tableData.value = res.content
    loading.value = false
  })
}

const checkedKeys = (curCheckedIds: Array, ids: Array) => {
  leftMenu.value = [...curCheckedIds, ...ids]
  menuIds.value = ids
}
// 重置
const resetSearch = () => {
  searchData.value = null
  queryRoles()
}

onMounted(() => {
  queryRoles()
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
            v-show="buttonVisibility('Role:add')"
            plain
            type="primary"
            :icon="CirclePlus"
            @click="btnCombind('新增')"
            >新增</el-button
          >
          <el-button
            v-show="buttonVisibility('Role:delete')"
            plain
            type="danger"
            :icon="Delete"
            @click="btnCombind('批量删除')"
            >批量删除</el-button
          >
          <el-button
            type="warning"
            v-show="buttonVisibility('Role:export')"
            plain
            :icon="Download"
            @click="btnCombind('导出')"
            >导出</el-button
          >
        </div>
      </div>
      <PublicTable
        ref="publicTableRef"
        :data="tableData"
        :columns="columns"
        :options="options"
        :actions="actions"
        @page-change="handlePageChange"
      />
    </el-card>
    <PublicDialog ref="plcDialogRef" :width="800">
      <template v-slot:content>
        <el-row :gutter="15">
          <el-col :span="12">
            <div class="grid-content">
              <el-scrollbar height="500px">
                <div class="title">{{ dialog_title }}角色</div>
                <el-form ref="roleFormRef" :model="roleData" style="padding: 25px">
                  <el-form-item prop="roleName" label="角色名称">
                    <el-input v-model="roleData.roleName" />
                  </el-form-item>
                  <el-form-item prop="roleSort" label="角色排序">
                    <el-input-number v-model="roleData.roleSort" :max="999" :min="1" controls-position="right" />
                  </el-form-item>
                  <el-form-item prop="enabled" label="角色状态">
                    <el-switch v-model="roleData.enabled" />
                  </el-form-item>
                  <el-form-item prop="description" label="角色描述">
                    <el-input v-model="roleData.description" :rows="4" type="textarea" />
                  </el-form-item>
                </el-form>
              </el-scrollbar>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-scrollbar height="500px">
                <div class="title">菜单分配</div>
                <div class="grid-body">
                  <MenuAllocate v-if="menuAllocateShow" :menus="roleData.menu" @checkedKeys="checkedKeys" />
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-slot:footer>
        <el-button @click="dialogSubmit('exit')"> 取消 </el-button>
        <el-button type="primary" @click="dialogSubmit('confirm')"> 确认 </el-button>
      </template>
    </PublicDialog>
  </div>
</template>

<style lang="scss" scoped>
.grid-content {
  border: 1px solid #ebeef5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .title {
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px solid #ebeef5;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button-wrap {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }
  .el-button {
    width: 80%;
  }
}
.grid-body {
  padding: 10px;
}
.el-row {
  height: 500px;
  .el-col {
    height: 100%;
  }
}
.el-input-number {
  width: 100%;
  :deep(.el-input__inner) {
    text-align: left;
  }
}
</style>
