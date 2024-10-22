<script lang="ts" setup>
import { toRaw, ref, reactive, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { type FormInstance } from "element-plus"
import { CirclePlus, Delete } from "@element-plus/icons-vue"
import { usePermissionButton } from "@/hooks/usePermissionButton"
import SearchVue from "@/components/PublicTable/search.vue"
import { formData } from "./mock"
import PublicDialog from "@/components/PublicDialog/index.vue"
import { getDept, addDept, editDept, deleteDept, searchDept } from "@/api/permission"

const plcDialogRef = ref()
const loading = ref<boolean>(false)
const search = ref()
const formItem = toRaw(formData)
const tableData = ref<[]>([])
const orgformRef = ref<FormInstance | null>(null)
const selectIds = ref()

// 按钮权限
const { buttonVisibility } = usePermissionButton()

const treeLoad = async (row, treeNode: unknown, resolve: (date) => void) => {
  // 重新调用 resolve 方法，刷新树组件的数据
  getDept({ pid: row.id }).then((res) => {
    resolve(res.content)
  })
}

//#region 增
// 打开新增菜单
const onOpenAddDialog = (row, type: string) => {
  if (type == "add") {
    orgformData.pid = row.id ? row.id : null
    const title = row.id ? "新增当前子级部门" : "新增一级部门"
    plcDialogRef.value.openDialog(title)
    nextTick(() => {
      orgformRef.value?.resetFields()
      orgformData.id = null
      orgformData.pid = null
      orgformData.name = ''
      orgformData.enabled = true
    })
  } else {
    orgformData.id = row.id
    orgformData.pid = row.pid ? row.pid : null
    orgformData.name = row.name
    orgformData.enabled = row.enabled
    plcDialogRef.value.openDialog("编辑部门")
  }
}
//#region 删
const handleDelete = (row) => {
  const ids = row.id ? [row.id] : selectIds.value
  ElMessageBox.confirm(`确定删除${ids.length}条数据？`, "注意", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  }).then(() => {
    deleteDept(ids).then(() => {
      ElMessage.success("删除成功！")
      queryDept()
    })
  })
}
// 多选
// 多选
const selectCertId = (val) => {
  selectIds.value = []
  val.forEach((item) => {
    selectIds.value.push(item.id)
  })
}

//#region 查
const orgformData = reactive({
  id: null,
  pid: null,
  name: "", //部门名称
  deptSort: 999, //排序
  enabled: true //状态
})
// 查询接口
const queryDept = () => {
  getDept().then((res) => {
    tableData.value = res.content
  })
}

// 搜索查询
const handleSearch = (search) => {
  searchDept(search).then((res) => {
    tableData.value = res.content
  })
  console.log("搜索查询", search)
  queryDept()
}
// 重置
const resetSearch = () => {
  queryDept()
}

//新增修改提交
const dialogSubmit = (type: String) => {
  if (type == "exit") {
    plcDialogRef.value.closeDialog()
  } else {
    //新增
    if (orgformData.id) {
      // 修改接口
      editDept(orgformData).then((res) => {
        ElMessage.success("部门修改成功！")
        queryDept()
        plcDialogRef.value.closeDialog()
      })
    } else {
      addDept(orgformData).then((res) => {
        ElMessage.success("部门新增成功！")
        queryDept()
        plcDialogRef.value.closeDialog()
      })
    }
  }
}

onMounted(() => {
  queryDept()
})
</script>

<template>
  <div class="main-content">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <SearchVue :form-item="formItem" @handle-search="handleSearch" @reset-search="resetSearch" :search="search" />
    </el-card>
    <el-card v-loading="loading" shadow="never" style="height: 100%">
      <div style="margin-bottom: 20px">
        <el-button type="primary" v-show="buttonVisibility('Organization:add')" plain :icon="CirclePlus" @click="onOpenAddDialog('', 'add')">新增一级部门</el-button>
        <el-button type="danger" v-show="buttonVisibility('Organization:delete')" plain :icon="Delete" @click="handleDelete">批量删除</el-button>
      </div>
      <el-table
        :data="tableData"
        lazy
        :load="treeLoad"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :border="true"
        stripe
        @selection-change="selectCertId"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="deptSort" label="排序" align="center" />
        <el-table-column prop="enabled" label="状态" align="center">
          <template v-slot="{ row }">
            <el-switch v-model="row.enabled" disabled inline-prompt active-text="Y" inactive-text="N" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center" />
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template v-slot="{ row }">
            <el-button type="primary" link @click="onOpenAddDialog(row, 'add')">新增</el-button>
            <el-button type="primary" link @click="onOpenAddDialog(row, 'edit')">修改</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <PublicDialog ref="plcDialogRef" width="540">
      <template v-slot:content>
        <el-form ref="orgformRef" :model="orgformData" class="permission-form" label-width="126px">
          <el-form-item prop="name" label="部门名称">
            <el-input v-model="orgformData.name" placeholder="部门名称" style="width: 280px;"/>
          </el-form-item>
          <el-form-item prop="routeName" label="部门排序">
            <el-input-number v-model="orgformData.deptSort" :max="999" :min="1" controls-position="right" style="width: 280px;"/>
          </el-form-item>

          <el-form-item prop="enabled" label="状态">
            <el-radio-group v-model="orgformData.enabled" class="ml-4">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">停用</el-radio>
            </el-radio-group>
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
<style lang="scss" scoped>
.el-input-number {
  width: 100%;
  :deep(.el-input__inner) {
    text-align: left;
  }
}
.permission-form{
  margin-top: 12px;
}
</style>
