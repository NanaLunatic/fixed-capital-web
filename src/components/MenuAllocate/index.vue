<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps, watchEffect, nextTick } from "vue"
import { ElTree } from "element-plus"
import { Refresh } from "@element-plus/icons-vue"
import { getMenus } from "@/api/permission"
import { type RouteRecordRaw } from "vue-router"

const menusProps = defineProps({
  menus: Array
})
const menuTree = ref<[]>([])
const menusIds = ref(menusProps.menus)
const treeRef = ref<InstanceType<typeof ElTree>>()
const filterText = ref("")

const emits = defineEmits(["checkedKeys"])

interface Tree {
  [key: string]: any
}

const filterAsyncRoutes = (routes: RouteRecordRaw[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    route.title = route.meta.title
    if (tempRoute.children) {
      tempRoute.children = filterAsyncRoutes(tempRoute.children)
    }
    res.push(tempRoute)
  })
  return res
}

//获取菜单数据
getMenus().then((res) => {
  filterAsyncRoutes(res)
  menuTree.value = res
})
//重置勾选
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
}
const props = {
  label: "title",
  children: "children"
}

// 节点选中
const nodeclick = (data: any) => {
  const curCheckedKeys = treeRef.value!.getHalfCheckedKeys()
  emits("checkedKeys", curCheckedKeys, treeRef.value!.getCheckedKeys())
}

// el-tree控件-筛选
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

watch(
  () => menusProps.menus,
  (newMenus) => {
    menusIds.value = JSON.parse(JSON.stringify(newMenus))
    nextTick(() => {
      if (treeRef.value && !menusIds.value.length) {
        treeRef.value.setCheckedKeys(menusIds.value, false)
      }
    })
  },
  { deep: true }
)

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.title.includes(value)
}
</script>
<template>
  <div class="header">
    <el-input v-model="filterText" placeholder="搜索" clearable />
    <el-button style="margin-left: 10px; padding: 7px" :icon="Refresh" @click="resetChecked()" circle />
  </div>
  <el-tree
    ref="treeRef"
    :data="menuTree"
    show-checkbox
    node-key="id"
    :expand-on-click-node="false"
    :props="props"
    :default-expanded-keys="menusIds"
    :default-checked-keys="menusIds"
    :filter-node-method="filterNode"
    @check-change="nodeclick"
  />
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  :deep(.el-input__inner) {
    height: 29px;
  }
}
</style>
