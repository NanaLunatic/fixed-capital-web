<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits, nextTick } from "vue"
import { genFileId, ElMessage } from "element-plus"
import type { UploadInstance, UploadProps, FormRules, FormInstance } from "element-plus"
import PublicDialog from "@/components/PublicDialog/index.vue"
import DeptSelect from "@/components/DeptSelect/index.vue"
import RoleSelect from "@/components/RoleSelect/index.vue"
import { addUsers, editUsers, getJob } from "@/api/permission"
import { AddUsers } from "@/api/permission/types/permission"
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue"
import { verifyEmail, verifyPhone } from "@/filter/verify"

const plcDialogRef = ref()
const upload = ref<UploadInstance>()
const jobOptions = ref<[]>([])
const multipleVal = ref([])
const userformRef = ref<FormInstance | null>(null)

const emits = defineEmits(["closeReset"])

const userformData = reactive({
  username: "",
  nickName: "",
  email: "",
  eName: "",
  dept: null,
  depts: [],
  jobs: [],
  roles: [],
  telephone: "",
  userFax: "",
  phone: "",
  enabled: true,
  isSupervisor: false,
  id: null
})
const userformRules = reactive<FormRules<AddUsers>>({
  username: { required: true, message: "工号不能为空", trigger: "blur" },
  nickName: { required: true, message: "姓名不能为空", trigger: "blur" },
  email: { required: true, validator: verifyEmail, trigger: "blur" },
  dept: { required: true, message: "请选择所属部门", trigger: "change" },
  roles: { required: true, message: "请选择角色", trigger: "change" },
  phone: { required: true, validator: verifyPhone, trigger: "blur" }
})

// 打开弹窗
const onOpenAddDialog = (type: string, row: any) => {
  plcDialogRef.value.openDialog(`${type}用户`)
  nextTick(() => {
    if (row) {
      ;({
        username: userformData.username,
        nickName: userformData.nickName,
        email: userformData.email,
        eName: userformData.eName,
        telephone: userformData.telephone,
        userFax: userformData.userFax,
        phone: userformData.phone,
        enabled: userformData.enabled,
        isSupervisor: userformData.isSupervisor,
        id: userformData.id
      } = row)
      userformData.roles = row.roles.map((num) => num.id)
      userformData.dept = row.dept.id
      userformData.depts = row.depts.map((item) => item.id)
      multipleVal.value = row.depts.map((item) => ({ value: item.id, label: item.name }))
      userformData.jobs = row.jobs.map((num) => num.id)
    } else {
      userformRef.value?.resetFields()
      userformData.dept = null
      userformData.depts = []
      userformData.id = null
    }
  })
}

const dialogImageUrl = ref("")
const dialogVisible = ref(false)

// 表单提交
const dialogSubmit = (type: String) => {
  if (type == "exit") {
    //取消
    plcDialogRef.value.closeDialog()
  } else {
    userformRef.value?.validate((valid: boolean, fields) => {
      if (valid) {
        userformData.jobs = userformData.jobs.map((num) => ({ id: num }))
        userformData.roles = userformData.roles.map((num) => ({ id: num }))
        userformData.dept = { id: userformData.dept }
        userformData.depts = userformData.depts.map((num) => ({ id: num }))

        if (userformData.id) {
          // 修改接口
          editUsers(userformData).then((res) => {
            ElMessage.success("角色修改成功！")
            plcDialogRef.value.closeDialog()
            emits("closeReset")
          })
        } else {
          addUsers(userformData).then((res) => {
            plcDialogRef.value.closeDialog()
            emits("closeReset")
          })
        }
      }
    })
  }
}

//#region  子组件传值
//---所属部门下拉框
const deptSelectVal = (val: Number) => {
  userformData.dept = val
}
const deptsSelectVal = (val: Number) => {
  userformData.depts = val
}
const roleSelectVal = (val: Number[]) => {
  userformData.roles = val
}

// 查询签核权限
const queryJob = () => {
  getJob().then((res) => {
    jobOptions.value = res.content
  })
}

onMounted(() => {
  queryJob()
})

// 暴露变量
defineExpose({
  onOpenAddDialog
})
</script>

<template>
  <PublicDialog ref="plcDialogRef">
    <template v-slot:content>
      <el-form
        class="permission-form"
        :inline="true"
        ref="userformRef"
        :model="userformData"
        :rules="userformRules"
        status-icon
        label-width="126px"
      >
        <el-form-item prop="username" label="工号">
          <el-input v-model="userformData.username" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item prop="nickName" label="姓名">
          <el-input v-model="userformData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱">
          <el-input v-model="userformData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="eName" label="英文名称">
          <el-input v-model="userformData.eName" placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item prop="dept" label="所属部门">
          <DeptSelect :deptval="userformData.dept" width="260px" @dept-select-val="deptSelectVal" :multiple="false" />
        </el-form-item>
        <el-form-item prop="depts" label="负责部门">
          <DeptSelect
            :deptIds="userformData.depts"
            width="260px"
            :multipleVal="multipleVal"
            @dept-select-val="deptsSelectVal"
            :multiple="true"
          />
        </el-form-item>
        <el-form-item prop="roles" label="角色">
          <RoleSelect :roleval="userformData.roles" @role-select-val="roleSelectVal" />
        </el-form-item>
        <el-form-item prop="telephone" label="电话">
          <el-input v-model="userformData.telephone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item prop="userFax" label="传真">
          <el-input v-model="userformData.userFax" placeholder="请输入传真" />
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="userformData.phone" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item prop="enabled" label="状态">
          <el-radio-group v-model="userformData.enabled" class="ml-4">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="isSupervisor" label="主管">
          <el-radio-group v-model="userformData.isSupervisor" class="ml-4">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:footer>
      <el-button @click="dialogSubmit('exit')"> 取消 </el-button>
      <el-button type="primary" @click="dialogSubmit('confirm')"> 确认 </el-button>
    </template>
  </PublicDialog>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  width: 50%;
  margin-right: 0;
}
</style>
<style lang="scss">
.permission-form {
  .el-input,
  .el-select {
    width: 260px;
  }
}
</style>
