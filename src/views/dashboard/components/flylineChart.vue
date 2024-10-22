<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue"
import { biDistribution } from "@/api/dashboard/index"
import mapPoint from "@/assets/images/mapPoint.png"
import mapCenterPoint from "@/assets/images/mapCenterPoint.png"

const config = reactive({
  centerPoint: [],
  points: [],
  bgImgUrl: "",
  centerPointImg: {
    url: mapCenterPoint
  },
  pointsImg: {
    url: mapPoint
  }
})

const biDistributionInit = () => {
  biDistribution().then((res) => {
    config.centerPoint = res.centerPoint
    config.points = res.points
  })
}

onMounted(() => {
  biDistributionInit()
})
</script>

<template>
  <div class="flyline-chart">
    <div class="title">资产分布</div>
    <dv-flyline-chart :config="config" style="width: 100%; height: 100%" />
  </div>
</template>

<style lang="scss" scoped>
@import "../style.css";
</style>
