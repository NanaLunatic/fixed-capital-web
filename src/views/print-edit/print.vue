<script setup>
import { ref, onMounted, computed, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import PublicDialog from "@/components/PublicDialog/dialogIndex.vue"
import { disAutoConnect, hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint"
import { searchModel, searchPrintModel } from "@/api/assetManagement/printModule/index"
import { View, DocumentChecked } from "@element-plus/icons-vue"
import helper from "./provider-helper"
import printPreview from "./preview.vue"
import pubDialogMock from "./components/mock.ts"
disAutoConnect()

const route = useRoute()
const router = useRouter()
const publicDialogRef = ref()
let hiprintTemplate
const paperPopVisible = ref(Boolean | null)
const paperWidth = ref("210")
const paperHeight = ref("296.6")
const preViewRef = ref()
const detailRow = ref({})
let printData = {}

// 弹框的定义
const currDialogObj = ref() // 对应的弹框是哪个,比如新增,修改
const currForm = ref([]) // 当前弹框的formitem

// 当前纸张
const curPaper = ref({
  type: "A4",
  width: 210,
  height: 296.6
})

// 纸张类型
const paperTypes = ref({
  A3: {
    width: 420,
    height: 296.6
  },
  A4: {
    width: 210,
    height: 296.6
  },
  A5: {
    width: 210,
    height: 147.6
  },
  B3: {
    width: 500,
    height: 352.6
  },
  B4: {
    width: 250,
    height: 352.6
  },
  B5: {
    width: 250,
    height: 175.6
  }
})

// mock左侧数据
let optionsLeft = {
  key: "providerModule",
  options: {
    groupName: "基础元素",
    printElements: []
  }
}

// mock详情数据
const customTemplate = [
  {
    title: "标题",
    customText: "标题",
    custom: true,
    type: "text",
    options: [],
    height: 19,
    width: 213
  },
  {
    title: "自定义文本",
    customText: "自定义文本",
    custom: true,
    type: "text",
    options: [],
    height: 19,
    width: 213
  }
]

const curPaperType = computed(() => {
  let type = "A4"
  for (const key in paperTypes.value) {
    let item = paperTypes.value[key]
    let { width, height } = curPaper.value
    if (item.width === width && item.height === height) {
      type = key
    }
  }
  return type
})

/**
 * 设置纸张大小
 * @param type [A3, A4, A5, B3, B4, B5, other]
 * @param value {width,height} mm
 */
const setPaper = (type, value) => {
  try {
    if (Object.keys(paperTypes.value).includes(type)) {
      curPaper.value = { type: type, width: value.width, height: value.height }
      hiprintTemplate.setPaper(value.width, value.height)
    } else {
      curPaper.value = { type: "other", width: value.width, height: value.height }
      hiprintTemplate.setPaper(value.width, value.height)
    }
  } catch (error) {
    ElMessage.error(`操作失败: ${error}`)
  }
}

const otherPaper = () => {
  let value = {}
  value.width = paperWidth.value
  value.height = paperHeight.value
  paperPopVisible.value = false
  setPaper("other", value)
}

// 预览
const preView = () => {
  let html = hiprintTemplate.getHtml(printData)
  preViewRef.value.showModal(html)
}

// 提交
const handelSubmit = () => {
  let type = "add"
  let dialogOption = pubDialogMock?.typeList[0]
  // 判断有无id，有id的编辑，无则新增
  if (route.query.id) {
    type = "edit"
    dialogOption = pubDialogMock?.typeList[1]
  }

  // 获取当前是哪个弹框以及对应的form内容
  currDialogObj.value = dialogOption
  currForm.value = pubDialogMock.editFormOptions

  nextTick(() => {
    let json = hiprintTemplate.getJson()
    let pathObj = {
      modelContent: JSON.stringify(json, null, 2),
      printWidth: paperTypes.value[curPaperType.value].width
    }
    // 编辑
    if (route.query.id) {
      pathObj = {
        ...pathObj,
        id: detailRow.value.id,
        printCode: detailRow.value.printCode,
        printName: detailRow.value.printName,
        printWidth: detailRow.value.printWidth
      }
    }
    publicDialogRef.value?.openSet(type, [pathObj])
  })
}

// 返回
const handelBack = () => {
  router.push({ name: "printModel" })
}

// 清空
const clearPaper = () => {
  try {
    hiprintTemplate.clear()
  } catch (error) {
    ElMessage.error(`操作失败: ${error}`)
  }
}

// 初始化 provider
hiprint.init({
  providers: [defaultElementTypeProvider()]
})

/**
 * 这里必须要在 onMounted 中去构建 左侧可拖拽元素 或者 设计器
 * 因为都是把元素挂载到对应容器中, 必须要先找到该容器
 */
onMounted(async () => {
  await buildLeftElement()
  await buildDesigner()
  await otherPaper()
})
/**
 * 构建左侧可拖拽元素
 * 注意: 可拖拽元素必须在 hiprint.init() 之后调用
 * 而且 必须包含 class="ep-draggable-item" 否则无法拖拽进设计器
 */
const buildLeftElement = async () => {
  let modelData = await searchModel()
  modelData = [...modelData, ...customTemplate]
  modelData = modelData.map((e) => {
    if (e.type === "text") {
      e.options.lineHeight = 18
    }
    if (e.type === "qrcode") {
      e.options.hideTitle = true
    }
    return e
  })
  optionsLeft.options.printElements = modelData
  let provider = helper.createProvider(optionsLeft.key, optionsLeft.options)
  hiprint.init({ providers: [provider] })

  $("#provider-container").empty()
  hiprint.PrintElementTypeManager.build($("#provider-container"), optionsLeft.key)
}

/**
 * 构建设计器
 * 注意: 必须要在 onMounted 中去构建
 * 因为都是把元素挂载到对应容器中, 必须要先找到该容器
 */
const templateRef = ref({})
const buildDesigner = async () => {
  // 判断有无id，有id的编辑，无则新增
  if (route.query.id) {
    // 显示中间详情数据
    const resData = await searchPrintModel({ id: route.query.id })
    detailRow.value = resData.content[0]
    templateRef.value = JSON.parse(detailRow.value.modelContent)
  }
  $("#hiprint-printTemplate").empty() // 先清空, 避免重复构建
  hiprintTemplate = new hiprint.PrintTemplate({
    template: templateRef.value,
    settingContainer: "#PrintElementOptionSetting" // 元素参数容器
  })
  // 构建 并填充到 容器中
  hiprintTemplate.design("#hiprint-printTemplate")
}
</script>

<template>
  <div class="main-content">
    <el-card shadow="never">
      <div class="flex-col">
        <div class="nav-top">
          <el-space>
            <!-- 纸张设置 -->
            <el-button-group>
              <template v-for="(value, type) in paperTypes" :key="type">
                <el-button :type="curPaperType === type ? 'primary' : ''" @click="setPaper(type, value)">
                  {{ type }}
                </el-button>
              </template>
              <el-popover v-model="paperPopVisible" title="设置纸张宽高(mm)" width="280" trigger="click">
                <template #reference>
                  <el-button :type="'other' == curPaperType ? 'primary' : ''">自定义纸张</el-button>
                </template>
                <template #default>
                  <el-input-group compact style="margin: 10px 10px">
                    <el-input
                      type="number"
                      v-model="paperWidth"
                      style=" width: 100px text-align: center"
                      placeholder="宽(mm)"
                    />
                    <span class="and-block"> ~ </span>
                    <el-input
                      type="number"
                      v-model="paperHeight"
                      style="width: 100px text-align: center border-left: 0"
                      placeholder="高(mm)"
                    />
                  </el-input-group>
                  <el-button type="primary" style="width: 100%margin-top: 16px" @click="otherPaper">确定</el-button>
                </template>
              </el-popover>
            </el-button-group>
            <!-- 预览/打印 -->
            <el-button-group>
              <el-button type="primary" :icon="View" @click="preView"> 预览 </el-button>
            </el-button-group>
            <!-- 保存/清空 -->
            <el-button-group>
              <el-button type="primary" :icon="DocumentChecked" @click="handelSubmit"> 提交 </el-button>
              <el-popconfirm title="是否确认清空?" okType="danger" okText="确定清空" @confirm="clearPaper">
                <template #reference>
                  <el-button type="danger"
                    >清空<el-icon><Close /></el-icon
                  ></el-button>
                </template>
              </el-popconfirm>
            </el-button-group>
            <el-button @click="handelBack">返回</el-button>
          </el-space>
        </div>
        <div class="flex-row" style="height: 74vh">
          <div class="flex-2 left">
            <div class="flex-row justify-center flex-wrap">
              <div id="provider-container" class="container"></div>
              <div class="title">辅助元素</div>
              <div class="ep-draggable-item item" tid="defaultModule.hline">
                <span>横线</span>
              </div>
              <div class="ep-draggable-item item" tid="defaultModule.vline">
                <span>竖线</span>
              </div>
              <div class="ep-draggable-item item" tid="defaultModule.rect">
                <span>矩形</span>
              </div>
              <div class="ep-draggable-item item" tid="defaultModule.oval">
                <span>圆形</span>
              </div>
            </div>
          </div>
          <div class="flex-5 center">
            <!-- 设计器的 容器 -->
            <div id="hiprint-printTemplate"></div>
          </div>
          <div class="flex-2 right">
            <!-- 元素参数的 容器 -->
            <div id="PrintElementOptionSetting"></div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 预览 -->
    <print-preview ref="preViewRef" />

    <!-- 模板新增编辑 -->
    <PublicDialog
      ref="publicDialogRef"
      :currDialogObj="currDialogObj"
      :currForm="currForm"
      @query-search="handelBack"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "./style.css";

.flex-row {
  .title {
    color: #fff;
  }
  .ep-draggable-item {
    background: #00bb99;
    color: #fff;
  }
}
</style>

<style lang="scss">
#provider-container {
  .hiprint-printElement-type {
    padding: 0;
    margin: 0;
    margin-top: 12px;
    ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      width: 86%;
      margin: 0 auto;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #00bb99;
        padding: 4px 10px;
        margin: 10px 3% 4px 3%;
        width: 44%;
        font-size: 12px;
        line-height: 28px;
        color: #fff;
        border: 1px solid rgba(171, 171, 171, 0.2);
        border-radius: 4px;
        box-shadow: 2px 2px 6px 0px rgba(171, 171, 171, 0.2);
      }
    }
  }
  .title {
    font-size: 14px;
    color: #fff;
    width: 100%;
    margin: 24px 0 0 24px;
  }
  li {
    list-style-type: none;
  }
}
#PrintElementOptionSetting {
  font-size: 14px;
  .prop-tabs {
    background-color: transparent;
    .prop-tab-item,
    .hiprint-option-items {
      background-color: transparent;
    }
  }
}
</style>
