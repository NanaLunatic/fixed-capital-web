<template>
  <el-dialog v-model="show" title="预览" width="860">
    <div class="preview-body">
      <div class="preview-con"></div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from "vue"
export default {
  name: "start-preview",
  setup() {
    const show = ref(false)
    const close = () => {
      show.value = false
    }
    const showModal = (...html) => {
      show.value = true
      do {
        setTimeout(() => {
          $(".preview-con").empty()
          $(".preview-con").html(html)
        }, 200)
        return
      } while ($(".preview-con").length <= 0)
    }
    return {
      show,
      close,
      showModal
    }
  }
}
</script>

<style>
/* 不同模板 间隙 */
.preview-con .hiprint-printTemplate {
  border-top: 1px solid #003380;
  border-bottom: 1px solid #003380;
}
/* 批量打印 间隙 */
.preview-con .hiprint-printTemplate .hiprint-printPanel:not(:last-of-type) {
  border-bottom: 1px solid #ccc;
}
</style>
<style scoped>
.preview-body {
  min-height: 100px;
}
</style>
