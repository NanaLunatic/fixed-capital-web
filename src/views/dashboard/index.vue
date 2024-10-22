<script lang="ts" setup>
import { onMounted, onUnmounted, defineAsyncComponent, ref, watch, computed, watchEffect, nextTick } from "vue"
import dayjs from "dayjs"
import { getIsContentLarge } from "@/utils/cache/local-storage"
import { useAppStore } from "@/store/modules/app"
import screenfull from "screenfull"
// 使用异步组件减少初始加载时间
const StorageQuantity = defineAsyncComponent(() => import("./components/storageQuantity.vue"))
const FlylineChart = defineAsyncComponent(() => import("./components/flylineChart.vue"))
const ExportImportSituation = defineAsyncComponent(() => import("./components/exportImportSituation.vue"))
const AssetStatus = defineAsyncComponent(() => import("./components/assetStatus.vue"))
const AssetDetails = defineAsyncComponent(() => import("./components/assetDetails.vue"))

const currentTime = ref(dayjs().format("HH:mm:ss"))
const currentDate = ref(dayjs().format("YYYY-MM-DD"))

const isFullscreen = ref(null)
const isContentLarge = ref(null)
const reloadComponents = ref(true)
const appStore = useAppStore()

// 设置一个定时器
let intervalTime = null

// 获取当前星期
const getCurrentWeek = () => {
  const curWeek = dayjs().day()
  const weekArr = ["日", "一", "二", "三", "四", "五", "六"]
  return "星期" + weekArr[curWeek]
}

// 全屏变化操作
const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 监听各种屏幕缩放
watch([isContentLarge, isFullscreen, () => appStore.sidebar.opened], () => {
  reloadComponents.value = false
  setTimeout(() => {
    reloadComponents.value = true
  }, 500)
})

watchEffect((onCleanup) => {
  // 挂载组件时自动执行
  screenfull.isEnabled && screenfull.on("change", handleFullscreenChange)
  // 卸载组件时自动执行
  onCleanup(() => {
    screenfull.isEnabled && screenfull.off("change", handleFullscreenChange)
  })
})

onMounted(() => {
  // 每隔一秒更新一次
  intervalTime = setInterval(() => {
    currentTime.value = dayjs().format("HH:mm:ss")
  }, 1000)

  // 监听大屏localStorage变化
  window.addEventListener("isContentLargeChanged", () => {
    isContentLarge.value = getIsContentLarge()
  })
})

// 清除定时器，防止内存泄漏
onUnmounted(() => {
  if (!intervalTime) return
  clearInterval(intervalTime)
})
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-top">
      <div class="title">固资BI看板</div>
      <div class="format-date">
        <span class="time">{{ currentTime }}</span>
        <span class="date">{{ currentDate }} {{ getCurrentWeek() }}</span>
      </div>
    </div>
    <div class="dashboard-container">
      <el-row class="top-rows">
        <!-- 入库货量 -->
        <el-col :span="7">
          <StorageQuantity v-if="reloadComponents" />
        </el-col>
        <!-- 地图 -->
        <el-col :span="10">
          <FlylineChart v-if="reloadComponents" />
        </el-col>
        <!-- 资产状态 -->
        <el-col :span="7">
          <AssetStatus v-if="reloadComponents" />
        </el-col>
      </el-row>
      <el-row :gutter="10" style="min-height: 320px; margin-top: 12px">
        <!-- 资产详情 -->
        <el-col :span="12">
          <AssetDetails v-if="reloadComponents" />
        </el-col>
        <!-- 近一年出/入库情况 -->
        <el-col :span="12">
          <ExportImportSituation v-if="reloadComponents" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.css";
</style>
