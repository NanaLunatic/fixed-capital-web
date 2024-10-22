<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { biAssetsStatus } from "@/api/dashboard/index"

const conf = reactive({
  lineWidth: 32,
  showOriginValue: true,
  digitalFlopStyle: {
    fill: "pink"
  },
  data: []
})

const biAssetsStatusInit = () => {
  biAssetsStatus().then((res) => {
    conf.data = res.data
  })
}

onMounted(() => {
  biAssetsStatusInit()
})
</script>

<template>
  <div class="box-item asset-status">
    <div class="top-nav">
      <img src="@/assets/images/item-box-title-icon.png" alt="" />
      <div class="title gradient-regular">资产状态</div>
      <dv-decoration-3 class="line-decoration3" />
    </div>
    <dv-border-box8 :dur="5" class="content">
      <div style="width: 100%; height: 100%" flex="~ col" justify-center items-center>
        <dv-active-ring-chart :config="conf" style="width: 100%; height: 100%" />
      </div>
    </dv-border-box8>
  </div>
</template>

<style lang="scss" scoped>
@import "../style.css";
</style>
