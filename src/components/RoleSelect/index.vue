<script lang="ts" setup>
import { ref, onMounted, defineEmits, watch } from "vue"
import { allRoles } from "@/api/permission"

const props = defineProps({
  roleval: Array
})

const options = ref()
const value = ref()
const emits = defineEmits(["roleSelectVal"])

const queryRoles = () => {
  allRoles().then((res) => {
    options.value = res
  })
}

const selectChange = (val) => {
  emits("roleSelectVal", val)
}
watch(
  () => props.roleval,
  (val) => {
    value.value = val ? val : ""
  }
)

onMounted(() => {
  queryRoles()
})
</script>

<template>
  <el-select
    v-model="value"
    multiple
    collapse-tags
    collapse-tags-tooltip
    clearable
    placeholder="请选择角色"
    @change="selectChange"
  >
    <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id" />
  </el-select>
</template>
<style lang="scss" scoped>
:deep(.el-input__validateIcon) {
  display: none;
}
</style>
