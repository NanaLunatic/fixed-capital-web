<script lang="ts" setup>
import { ref, computed, PropType, defineProps, defineEmits } from "vue"

interface Column {
  label: string
  prop: string
  width?: string
  type?: string // 新增 type 属性，用于标识操作列
}

interface Action {
  label: string
  type?: string
  handler: (row: any) => void
  disabled?: (row: any) => boolean // 是否可编辑
  condition?: (row: any) => boolean // 新增 condition 属性，用于条件渲染
}

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  columns: {
    type: Array as PropType<Column[]>,
    required: true
  },
  options: {
    type: Object,
    default: () => {}
  },
  actions: {
    type: Array as PropType<Action[]>,
    default: () => []
  },
  showSelection: {
    type: Boolean,
    default: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  maxHeight: {
    type: String,
    default: "400"
  }
})

const tableRef = ref()

const emits = defineEmits(["page-change", "row-click"])

// 改变了分页条数
const handleSizeChange = (val: number) => {
  emits("page-change", "pageSize", val)
}

const handlePageChange = (val: number) => {
  emits("page-change", "currentPage", val)
}

const handleActionClick = (action: Action, row: any) => {
  if (action && typeof action.handler === "function") {
    action.handler(row)
  }
}

const handleRowClick = (row: any) => {
  emits("row-click", row)
}

const shouldShowAction = (action: Action, row: any) => {
  return action && typeof action.condition === "function" ? action.condition(row) : true
}

// 获取勾选数据
const handleSelectionChange = () => {
  const selData = tableRef.value.getSelectionRows()
  return selData
}

// 处理多层对象包裹的
const getNestedProperty = (obj: object, prop: string) => {
  return prop.split(".").reduce((o, p) => (o[p] ? o[p] : "-"), obj)
}

// 暴露变量
defineExpose({
  handleSelectionChange
})
</script>

<template>
  <div>
    <el-table
      ref="tableRef"
      :border="true"
      stripe
      :data="data"
      @selection-change="handleSelectionChange"
      :max-height="maxHeight"
      style="width: 100%"
    >
      <el-table-column v-if="showSelection" fixed="left" type="selection" width="50" align="center" />
      <el-table-column label="序号" type="index" fixed="left" width="80" align="center" />
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        :min-width="column.minWidth"
        :resizable="true"
        :sortable="column.type !== 'operation'"
        show-overflow-tooltip
        v-slot="scope"
      >
        <template v-if="column.type === 'operation'">
          <el-button
            v-for="action in actions"
            :key="action.label"
            :type="action.type ? action.type : 'primary'"
            :disabled="action.disabled ? action.disabled(scope.row) : false"
            link
            v-show="shouldShowAction(action, scope.row)"
            @click="handleActionClick(action, scope.row)"
          >
            {{ action.label }}
          </el-button>
        </template>
        <template v-else-if="column.type === 'switch'">
          <el-switch v-model="scope.row[column.prop]" inline-prompt active-text="Y" inactive-text="N" disabled />
        </template>
        <template v-else-if="column.type === 'object'">
          <div>
            {{ getNestedProperty(scope.row, column.parentProp + "." + column.prop) }}
          </div>
        </template>
        <template v-else-if="column.type === 'link'">
          <el-button type="primary" link @click="handleRowClick(scope.row)">
            {{ scope.row[column.prop] || "-" }}
          </el-button>
        </template>
        <template v-else>
          {{ scope.row[column.prop] || "-" }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-wrapper">
      <el-pagination
        background
        v-if="showPagination"
        v-model:current-page="options.currentPage"
        v-model:page-size="options.pageSize"
        :layout="options.layout"
        :page-sizes="options.pageSizes"
        :total="options.total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pager-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  align-self: end;
}
</style>
