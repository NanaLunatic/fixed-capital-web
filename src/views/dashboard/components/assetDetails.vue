<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { biAssetsDetails } from "@/api/dashboard/index"

const reloadScrollBoard = ref(true)

const config = reactive({
  header: ["名称", "编码", "类型", "配置", "使用人", "部门", "位置", "状态"],
  data: [],
  index: true,
  headerBGC: "#094d83",
  evenRowBGC: "rgba(0, 27, 68, 0.3)",
  oddRowBGC: "rgba(0, 59, 81, 0.4)",
  columnWidth: [50, 90, 120, 100, 100, 100, 80, 120, 80], // 为每一列设置适当的宽度
  align: ["center"]
})

const clickHandler = (e: any) => {
  console.log(e)
}

const biAssetsDetailsInit = () => {
  const dataArray = ["assetsName", "assetsNo", "type", "configuration", "createBy", "deptName", "locations", "status"]
  biAssetsDetails().then((res) => {
    config.data = res.map((item) => {
      let curArr = []
      for (let i of dataArray) {
        if (Object.keys(item).includes(i)) {
          if (item[i]) {
            if (typeof item[i] === "object") {
              curArr.push(item[i][`${i}Name`])
            } else {
              curArr.push(item[i])
            }
          } else {
            curArr.push("-")
          }
        }
      }
      return curArr
    })
    reloadScrollBoard.value = true
  })
}

onMounted(() => {
  reloadScrollBoard.value = false
  setTimeout(() => {
    biAssetsDetailsInit()
  }, 0)
})
</script>

<template>
  <div class="box-item asset-details">
    <div class="top-nav">
      <img src="@/assets/images/item-box-title-icon.png" alt="" />
      <div class="title gradient-regular">资产详情</div>
      <dv-decoration-3 class="line-decoration3" />
    </div>
    <dv-border-box8 :dur="5" class="content">
      <dv-scroll-board v-if="reloadScrollBoard" :config="config" class="asset-table" @click="clickHandler" />
    </dv-border-box8>
  </div>
</template>

<style lang="scss" scoped>
@import "../style.css";

.content {
  padding: 3px;
}
</style>

<style lang="scss">
.asset-details {
  width: 100%;
  height: 100%;
  overflow: hidden; // 确保内容不会溢出容器
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden; // 确保内容不会溢出容器
    .asset-table {
      width: 100%;
      height: 100%;
      max-width: 100%; // 强制最大宽度不超过100%
      max-height: 100%; // 强制最大高度不超过100%
      overflow: hidden; // 隐藏任何溢出部分
    }
  }
}
</style>
