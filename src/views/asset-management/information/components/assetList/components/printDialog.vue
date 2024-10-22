<script setup>
import { ref, reactive } from "vue"
import $ from "jquery"
import { ElMessage, ElMessageBox } from "element-plus"
import { disAutoConnect, hiprint } from "vue-plugin-hiprint"
import { detailPrintModelPrint, printRecords } from "@/api/assetManagement/printModule/index"
disAutoConnect()

const show = ref(false)
const currForm = ref([])
let printData = null
let formModel = reactive({})
let hiprintTemplate = null
const assetsId = ref(null)

const close = () => {
  show.value = false
}

const showModal = async (row) => {
  assetsId.value = row.id
  const modelData = await detailPrintModelPrint({ id: assetsId.value })
  printData = JSON.parse(modelData.model.modelContent)
  currForm.value = printData?.panels[0].printElements
  // 展示默认数据
  currForm.value.forEach((e) => {
    formModel[e.options.field] = modelData.assets[e.options.field]
  })
  show.value = true
  // 初始化
  hiprintTemplate = new hiprint.PrintTemplate({
    template: printData
  })
}

const handelPrint = () => {
  ElMessageBox.confirm(`是否确定打印标签？`, "注意", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    // 参数: 打印时设置 左偏移量，上偏移量
    let options = { leftOffset: -1, topOffset: -1 }
    // 扩展
    let ext = {
      callback: () => {
        console.log("浏览器打印窗口已打开")
        printCallBack()
      },
      styleHandler: () => {
        // 重写 文本 打印样式
        return "<style>.hiprint-printElement-text{color:red !important;}</style>"
      }
    }
    // 调用浏览器打印
    hiprintTemplate.print(formModel, options, ext)
  })
}

// 打印按钮的回调
const printCallBack = () => {
  const params = { id: assetsId.value, assetsSnCode: formModel.assetsSnCode }
  printRecords(params)
}

const handelDowload = () => {
  hiprintTemplate.toPdf(formModel, "打印预览pdf")
}

defineExpose({
  showModal
})
</script>

<template>
  <el-dialog v-model="show" title="预览" width="780">
    <div class="preview-con">
      <el-scrollbar height="calc(100vh - 34vh)">
        <div class="preview-body" v-if="currForm.length">
          <el-form
            ref="formRef"
            class="form-transparent"
            model="{}"
            :validate-on-rule-change="false"
            label-width="98px"
          >
            <el-col :span="14" v-for="item in currForm" :key="item.options.field">
              <el-form-item
                v-if="item.options.textType !== 'qrcode' && item.printElementType.title !== '标题'"
                :prop="item.options.field"
                :label="item.options.title"
              >
                <el-input
                  v-if="item.printElementType.type === 'text'"
                  v-model="formModel[item.options.field]"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" plain @click="handelPrint">模板打印</el-button>
        <el-button type="warning" plain @click="handelDowload">pdf下载</el-button>
        <el-button @click="show = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
/* 不同模板 间隙 */
.preview-con {
  height: 100%;
}
/* 批量打印 间隙 */
.preview-body .hiprint-printTemplate .hiprint-printPanel:not(:last-of-type) {
  border-bottom: 1px solid #ccc;
}
</style>
<style scoped>
.preview-body {
  min-height: 100px;
  padding-top: 24px;
  padding-left: 86px;
}
</style>
