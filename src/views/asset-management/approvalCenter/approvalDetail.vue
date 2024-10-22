<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { searchSign, deliveryAuditList } from "@/api/assetManagement/approvalCenter/index"
import { TypeListOption, restitutionFormOptions, releaseFormOptions, applicationFormOptions, transferFormOptions, typeList } from './components/mock'

const route = useRoute()
const router = useRouter()
const currDialogObj = ref<TypeListOption | null>()  // 对应的form
let formModel = reactive({})
let currForm = reactive({})
let approvalForm = reactive({})
const pathId = ref(null)


const detailFun = () => {
  pathId.value = route.query.id
  searchSign({id: pathId.value}).then((res) => {
    formModel = res.content[0]
    currFormInit()
  })
}

// 整理详情模块
const currFormInit = () => {
  const dialogOption = typeList.find((item: any) => item.title === formModel?.type)
  if(!dialogOption) return
  currDialogObj.value = dialogOption
  const formOption = dialogOption["optionMap"]
  for(const item of formOption){
    // 如果是对象结构取值
    if(item.parentProp){
      const prorVal = (item.parentProp + '.' + item.prop).split('.').reduce((o, p) => o[p] ? o[p] : '', formModel)
      formModel[item.prop] = prorVal
    }
  }
  currForm = formOption
}

// 审批
const handleApproval = () => {
  const params = {...approvalForm, ids: [pathId.value]}
  deliveryAuditList(params).then((res) => {
    ElMessage.success("操作成功！")
    handleBack()
  })
}


const handleBack = () => {
  router.push({ name: 'approvalCenter' })
}

onMounted(() => {
  detailFun()
  approvalForm.isEnabled = true
})
</script>

<template>
<div class="main-content approval-detail">
  <el-card shadow="never">
    <div>
      <div class="nav-title">
        <p>{{currDialogObj?.title}}详情</p>
        <el-divider />
      </div>
      <el-form :inline="true" :model="formModel" class="form-model"  label-width="126px">
        <el-col :md="12" :xl="8" v-for="item in currForm" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input v-model="formModel[item.prop]" placeholder="-" :disabled="item.disabled" />
          </el-form-item>
        </el-col>
      </el-form>
      <el-divider border-style="dotted" class="dotted-line" />
      <el-form :model="approvalForm" class="approval-form"  label-width="126px">
          <el-form-item label="审批意见" prop="isEnabled">
            <el-radio-group v-model="approvalForm.isEnabled">
              <el-radio :value="true">同意</el-radio>
              <el-radio :value="false">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="批注" prop="suggestion">
            <el-input v-model="approvalForm.suggestion" placeholder="请输入" rows="2" type="textarea" style="width: 420px;"/>
          </el-form-item>
      </el-form>
    </div>
    <div class="bottom-btn">
      <el-button type="primary" @click="handleApproval">审批</el-button>
      <el-button  @click="handleBack">返回</el-button>
    </div>
  </el-card>
</div>
</template>
<style lang="scss" scoped>
.nav-title p{
  font-weight: bold;
}
.form-model{
  display: flex;
  flex-wrap: wrap;
  margin-top: 48px;
}
.bottom-btn{
  text-align: center;
}
.dotted-line{
  width: calc(100% - 92px);
  margin: 0 auto;
}
.approval-form{
  margin-top: 24px;
}
</style>
<style lang="scss">
.approval-detail{
  position: relative;
  .el-card__body{
    display: grid;
    grid-template-rows: auto 48px;
    height: 100%;
  }
  .el-card{
    min-height: calc(100vh - 148px);
  }
  .el-form-item{
    margin-bottom: 28px;
  }
  .el-input{
    width: 260px;
  }
}
</style>
