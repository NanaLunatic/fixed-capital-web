<script lang="ts" setup>
import { ref, reactive, toRaw, onMounted, nextTick } from "vue"
import { type FormInstance } from "element-plus"
import { getMenus, addMenus, deleteMenus, editMenus, searchMenus } from "@/api/permission"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import PublicDialog from "../../../components/PublicDialog/index.vue"
import { CirclePlus, Delete } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import SearchVue from "../../../components/PublicTable/search.vue"

const loading = ref<boolean>(false)
const plcDialogRef = ref()
const menuFormRef = ref<FormInstance | null>(null)
const menuTree = ref<[]>([])
const rowData = ref<{}>({})
const search = ref()
const buttonText = ref()
const addORedit = ref()
const selectIds = ref()

// 按钮权限
const { buttonVisibility } = usePermissionButton()

const searchData = [
  {
    label: "菜单名称",
    prop: "title",
    placeholder: "请输入菜单名称",
    type: "input"
  }
]
const formItem = toRaw(searchData)

const menuData = reactive({
  id: null,
  name: "",
  title: "",
  path: "",
  pid: 0,
  type: 0
  // assembly: ""
})
//#region 增
const dialogSubmit = (type: String) => {
  if (type == "exit") {
    plcDialogRef.value.closeDialog()
  } else {
    //新增
    console.log("rowData", menuData)
    if (menuData.id) {
      menuData.pid = rowData.value.pid ? rowData.value.pid : 0
      editMenus(menuData).then((res) => {
        menuTree.value = res
        ElMessage.success("菜单修改成功！")
        queryMenus()
        plcDialogRef.value.closeDialog()
      })
    } else {
      menuData.pid = rowData.value.id ? rowData.value.id : 0
      menuData.type = rowData.value.id ? rowData.value.type + 1 : 0
      addMenus(menuData).then((res) => {
        menuTree.value = res
        ElMessage.success("菜单新增成功！")
        queryMenus()
        plcDialogRef.value.closeDialog()
      })
    }
  }
}

//#region 删
const handleDelete = (row) => {
  const ids = row.id ? [row.id] : selectIds.value
  ElMessageBox.confirm("确定删除这条数据？", "注意", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  })
    .then(() => {
      deleteMenus(ids).then(() => {
        ElMessage.success("删除成功！")
        queryMenus()
      })
    })
    .catch(() => {
      ElMessage.info("用户已取消")
    })
}
// 多选
const selectCertId = (val) => {
  selectIds.value = []
  val.forEach((item) => {
    selectIds.value.push(item.id)
  })
  console.log("val", selectIds)
}

//#region 改
//#region 查
// 获取列表
const queryMenus = () => {
  getMenus().then((res) => {
    menuTree.value = res
  })
}

// 搜索查询
const handleSearch = (search) => {
  searchMenus({ blurry: search.title }).then((res) => {
    menuTree.value = res
  })
}
// 重置
const resetSearch = () => {
  queryMenus()
}

// 打开新增菜单
const onOpenAddDialog = (row, type: string) => {
  rowData.value = row
  buttonText.value = row.type == 1 ? "按钮" : "菜单"
  addORedit.value = type
  if (type == "add") {
    const title = row.id && row.type !== 1 ? "新增当前子级菜单" : row.type == 1 ? "新增权限按钮" : "新增一级菜单"
    plcDialogRef.value.openDialog(title)
    nextTick(() => {
      menuFormRef.value?.resetFields()
      menuData.id = null
      menuData.name = ''
      menuData.title = ''
      menuData.path = ''
      menuData.pid = 0
      menuData.type = 0
    })
  } else {
    const title = row.type !== 1 ? "修改菜单" : "修改按钮"
    plcDialogRef.value.openDialog(title)
    menuData.id = row.id
    menuData.name = row.name
    menuData.title = row.meta.title
    menuData.path = row.path
    menuData.type = row.type
  }
}

onMounted(() => {
  queryMenus()
})

// 暴露变量
defineExpose({
  resetSearch
})
</script>

<template>
  <div class="main-content">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <SearchVue :form-item="formItem" @handle-search="handleSearch" @reset-search="resetSearch" :search="search" />
    </el-card>
    <el-card class="card-table" v-loading="loading" shadow="never">
      <div style="margin-bottom: 20px">
        <el-button type="primary" v-show="buttonVisibility('Menu:add')" plain :icon="CirclePlus" @click="onOpenAddDialog('', 'add')">新增一级菜单</el-button>
        <el-button type="danger" v-show="buttonVisibility('Menu:delete')" plain :icon="Delete" @click="handleDelete">批量删除</el-button>
      </div>
      <el-table :data="menuTree" :border="true" stripe style="width: 100%; margin-bottom: 20px" row-key="id" @selection-change="selectCertId">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" label="菜单名称" width="150" align="center">
          <template v-slot="{ row }">
            <span>{{ row.meta.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="路由名称" align="center" />
        <el-table-column prop="path" label="路由路径" align="center" />
        <el-table-column prop="component" label="组件路径" align="center" />
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template v-slot="{ row }">
            <el-button v-if="row.type !== 2" type="primary" link @click="onOpenAddDialog(row, 'add')">新增</el-button>
            <el-button type="primary" link @click="onOpenAddDialog(row, 'edit')">修改</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <PublicDialog ref="plcDialogRef" width="680">
      <template v-slot:content>
        <el-form ref="menuFormRef" :model="menuData" label-width="126px" style="margin-right: 48px;">
          <el-form-item prop="title" :label="`${buttonText}名称`">
            <el-input v-model="menuData.title" :placeholder="`${buttonText}名称`" />
          </el-form-item>
          <el-form-item prop="name" label="路由名称">
            <el-input v-model="menuData.name" placeholder="路由中的 name 值" />
          </el-form-item>
          <el-form-item prop="path" label="路由路径">
            <el-input v-model="menuData.path" placeholder="路由中的 path 值" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="dialogSubmit('exit')"> 取消 </el-button>
        <el-button type="primary" @click="dialogSubmit('confirm')"> 确认 </el-button>
      </template>
    </PublicDialog>
  </div>
</template>
