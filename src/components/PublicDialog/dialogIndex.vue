<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits, nextTick } from "vue"
import { type FormInstance, ElMessage } from "element-plus"
import dayjs from "dayjs"
import { request } from "@/utils/service"
import { useFetchSelect } from "@/hooks/useFetchSelect"

const formRef = ref<FormInstance>()
const dialogVisible = ref(false)
let formModel = reactive({})
let pathRows = reactive({})

const props = defineProps({
  currDialogObj: {
    type: Object,
    default: () => ({})
  },
  currForm: {
    type: Array,
    default: () => []
  },
  currOptionType: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(["query-search"])

const openSet = (type: string, rows: object[] | null) => {
  dialogVisible.value = true

  nextTick(() => {
    Object.keys(formModel).forEach((key) => delete formModel[key]) // 清空现有的属性，但保持响应式

    if (rows?.length) {
      pathRows = rows
    }

    // 编辑弹框
    if (props.currDialogObj.type === "edit" || props.currDialogObj.type === "outbound") {
      Object.keys(pathRows[0]).forEach((k: any) => {
        if (props.currOptionType.includes(k)) {
          formModel[k] = pathRows[0][k]?.id
        } else {
          formModel[k] = pathRows[0][k]
        }
      })
    } else {
      resetForm(formRef.value)
    }

    // 如果form有默认值，则塞入
    for (const item of props.currForm) {
      if (item.default) {
        formModel[item.prop] = item.default
      }
      if (item.type === "number") {
        formModel[item.prop] = "1"
      }
    }

    if (props.currDialogObj.formType === "outbound") {
      // 出库弹框
      formModel.inventory = pathRows[0].amount
    }
  })
}

// 确认
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      // 设置传参
      let data = {}
      // 当formModel为空, 塞入默认值
      if (Object.keys(formModel).length === 0) {
        data = props.currForm.reduce((acc: any, cur: any) => {
          acc[cur.prop] = ""
          return acc
        }, {})
      } else {
        data = { ...formModel }
      }

      // 将当前输入数据进行匹配
      Object.keys(formModel).forEach((k: any) => {
        if (props.currOptionType.includes(k) && typeof formModel[k] !== "object") {
          data[k] = { id: formModel[k] }
        }
        // 格式化所有的日期类型
        if (formModel[k] && (k.includes("Time") || k.includes("Date"))) {
          data[k] = dayjs(data[k]).format("YYYY-MM-DD HH:mm:ss")
        }
      })

      // 过滤掉不用传的参数
      Object.keys(data).forEach((k: any) => {
        const find = props.currForm.find((obj: any) => obj.prop === k)
        if (!find) {
          delete data[k]
        }
      })

      // 如果有传id过来
      if (pathRows?.length) {
        if (props.currDialogObj.isIds) {
          const ids = pathRows.map((item: any) => item.id)
          data.ids = ids
        } else {
          data.id = pathRows[0].id
        }
      }

      const api = { url: props.currDialogObj.url, method: props.currDialogObj.method, data }
      // 服务请求
      request(api).then(() => {
        ElMessage.success("操作成功！")
        emits("query-search", 0, 20)
        dialogVisible.value = false
      })
    }
  })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 暴露变量
defineExpose({
  openSet
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    draggable
    :title="currDialogObj?.title"
    :close-on-click-modal="true"
    :width="currForm.length > 9 ? '860' : '580'"
  >
    <el-scrollbar max-height="calc(100vh - 348px)">
      <div class="dialog-content" v-if="currForm.length">
        <el-form ref="formRef" :model="formModel" :validate-on-rule-change="false" label-width="126px">
          <el-col :span="currForm.length > 9 ? 12 : 24" v-for="item in currForm" :key="item.prop">
            <el-form-item :prop="item.prop" v-if="!item.hidden" :label="item.label" :rules="item.rules">
              <el-select v-if="item.type === 'select'" filterable v-model="formModel[item.prop]" placeholder="请选择">
                <el-option v-for="tmp in item.options" :key="tmp.value" :label="tmp.label" :value="tmp.value" />
              </el-select>

              <el-radio-group
                v-else-if="item.type === 'radio'"
                v-model="formModel[item.prop]"
                :disabled="item.disabled"
                placeholder="请选择"
              >
                <el-radio v-for="tmp in item.options" :key="tmp.value" :label="tmp.label" :value="tmp.value" />
              </el-radio-group>

              <el-date-picker
                v-else-if="item.type === 'date' || item.type === 'datetime'"
                v-model="formModel[item.prop]"
                :disabled="item.disabled"
                :type="item.type"
                placeholder="请选择"
              />

              <el-switch
                v-else-if="item.type === 'switch'"
                v-model="formModel[item.prop]"
                :disabled="item.disabled"
                inline-prompt
                active-text="Y"
                inactive-text="N"
              />

              <el-input-number
                v-else-if="item.type === 'number'"
                v-model="formModel[item.prop]"
                :disabled="item.disabled"
                :precision="item.precision"
                :min="0"
              />

              <el-input
                v-else-if="item.type === 'textarea'"
                v-model="formModel[item.prop]"
                placeholder="请输入"
                :disabled="item.disabled"
                :rows="item.rows || 2"
                type="textarea"
              />

              <el-input v-else v-model="formModel[item.prop]" placeholder="请输入" :disabled="item.disabled" />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.dialog-content {
  width: 84%;
  margin-left: 6%;
}
.dialog-content .el-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
