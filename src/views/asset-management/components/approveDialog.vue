<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { approveNodes } from "@/api/public/index"
import PublicTable from "@/components/PublicTable/index.vue"

const dialogVisible = ref(false)
const tableData = ref([])

const columns = reactive([
  {
    prop: "nodeName",
    label: "步骤",
  },{
    prop: "uplike",
    label: "签核人",
  },{
    prop: "nodeTime",
    label: "签核时间",
    width: 160,
  },{
    prop: "nodeStatus",
    label: "状态",
    width: 100,
  },{
    prop: "nodeComment",
    label: "意见",
  }
])

// 打开弹窗
const openDialog = async (row: Object) => {
  tableData.value = await approveNodes(row.id)
  dialogVisible.value = true
}

// 暴露变量
defineExpose({
  openDialog
})
</script>
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="签核流程"
      width="860"
    >
      <PublicTable
        ref="publicTableRef"
        :showSelection="false"
        :showPagination="false"
        :data="tableData"
        :columns="columns"
        :maxHeight="480"
      />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
