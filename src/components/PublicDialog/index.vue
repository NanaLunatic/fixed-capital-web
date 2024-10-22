<script lang="ts" setup>
import { reactive } from "vue"

const props = defineProps({
  width: Number,
  closeModal: {
    type: Boolean,
    default: () => true
  },
  showClose: {
    type: Boolean,
    default: () => true
  },
  escapeClose: {
    type: Boolean,
    default: () => true
  }
})

const state = reactive({
  isShowDialog: false,
  title: ""
})
// 打开弹窗
const openDialog = (title: string, row: any) => {
  state.title = title
  state.isShowDialog = true
}

// 关闭弹窗
const closeDialog = () => {
  state.isShowDialog = false
}

// 暴露变量
defineExpose({
  openDialog,
  closeDialog
})
</script>
<template>
  <div>
    <el-dialog
      v-model="state.isShowDialog"
      :title="state.title ? state.title : ''"
      :width="props.width"
      draggable
      :close-on-click-modal="closeModal"
      :show-close="showClose"
      :close-on-press-escape="escapeClose"
    >
      <slot name="content" />
      <template #footer>
        <slot name="footer" />
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
