<script lang="ts" setup>
import { ref, provide } from "vue"
import { type FormInstance } from "element-plus"
import { Search, Refresh } from "@element-plus/icons-vue"
import DeptSelect from "@/components/DeptSelect/index.vue"

const searchFormRef = ref<FormInstance | null>(null)
const search = ref({})
const deptId = ref()

const emits = defineEmits(["handleSearch", "resetSearch"])

const props = defineProps({
  formItem: {
    type: Object,
    default: () => {}
  }
})

//#region 增

//#region 删

//#region 改

//#region 查
// 查询
const handleSearch = () => {
  if (deptId.value) {
    search.value.dept = deptId.value
  }
  emits("handleSearch", search.value)
}
// 重置
const resetSearch = () => {
  search.value = {}
  emits("resetSearch")
}
const deptSelectVal = (val: Number) => {
  deptId.value = val
}
</script>
<template>
  <el-form class="public-search" ref="searchFormRef" :inline="true" :model="search" label-width="120px">
    <template v-for="item in props.formItem" :key="item.prop">
      <el-form-item :prop="item.prop" :label="item.label">
        <el-date-picker
          v-if="item.type == 'date'"
          v-model="search[item.prop]"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
        <DeptSelect
          v-else-if="item.type == 'DeptSelect'"
          :deptval="search[item.prop]"
          @dept-select-val="deptSelectVal"
        />
        <el-select v-else-if="item.type == 'select'" v-model="search[item.prop]" :placeholder="item.placeholder">
          <el-option v-for="tmp in item.options" :key="tmp.value" :label="tmp.label" :value="tmp.value" />
        </el-select>
        <el-input v-else v-model="search[item.prop]" :placeholder="item.placeholder" />
      </el-form-item>
    </template>
    <div class="search-btns">
      <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
      <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
    </div>
  </el-form>
</template>
<style lang="scss">
.public-search {
  .el-input, .el-select{
    width: 230px;
  }
  .el-date-editor{
    width: 280px;
  }
  .search-btns{
    text-align: center;
  }
}
</style>
