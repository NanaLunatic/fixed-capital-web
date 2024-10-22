<script lang="ts" setup>
import { ref, defineEmits, watch } from "vue"
import { ElTree } from "element-plus"
import { getDept } from "@/api/permission"

const define_props = defineProps({
  deptval: Object,
  deptIds: Array,
  multipleVal: Array,
  multiple: Boolean,
  width: {
    type: String,
    default: '100%'
  }
})

const value = ref()
const multiple_val = ref([36, 56, 6, 19, 60, 55, 46, 42, 37])
const loading = ref(false)
const emits = defineEmits(["deptSelectVal"])

const props = {
  label: "label",
  isLeaf: "hasChildren"
}

const cacheData = [
  { label: "交管课", value: 36 },
  { label: "工务规划课", value: 56 },
  { label: "测试部", value: 6 },
  { label: "11111", value: 19 },
  { label: "载治具加工课", value: 60 },
  { label: "经管管理科", value: 55 },
  { label: "行政管理", value: 46 },
  { label: "品保部", value: 42 },
  { label: "物流课", value: 37 }
]
const treeLoad = (node, resolve) => {
  if (node && node.level == 0) {
    queryDept("", resolve)
  } else {
    queryDept(node.data.id, resolve)
  }
}

function queryDept(id, resolve) {
  getDept({ pid: id }).then((res) => {
    const nodes = res.content
    nodes.forEach((item) => {
      item.value = item.id
      item.hasChildren = !item.hasChildren
    })
    return resolve(res.content)
  })
}
const selectChange = (val) => {
  console.log("val", val)
  emits("deptSelectVal", val)
}
watch(
  () => define_props.deptval,
  (val) => {
    value.value = val
  }
)
</script>

<template>
  <el-tree-select
    v-if="multiple"
    :style="{width: define_props.width}"
    multiple
    v-model="define_props.deptIds"
    lazy
    :load="treeLoad"
    :props="props"
    check-strictly
    :cache-data="define_props.multipleVal"
    @change="selectChange"
  />
  <el-tree-select
    v-else
    :style="{width: define_props.width}"
    v-model="value"
    lazy
    :load="treeLoad"
    :props="props"
    node-key="id"
    filterable
    check-strictly
    clearable
    :loading="loading"
    @change="selectChange"
  />
</template>
<style lang="scss" scoped>
:deep(.el-input__validateIcon) {
  display: none;
}
</style>
