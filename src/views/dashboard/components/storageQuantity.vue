<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { biStorageAmount } from "@/api/dashboard/index"

interface BiStorage {
  assemblyCount: Number
  currentCount: Number
  dayCunt: Number
  desktopCount: Number
  notebookCount: Number
  printerCount: Number
}

const biStorage = ref<BiStorage>({
  assemblyCount: 0,
  currentCount: 0,
  dayCunt: 0,
  desktopCount: 0,
  notebookCount: 0,
  printerCount: 0
})

const biStorageAmountInit = () => {
  biStorageAmount().then((res) => {
    biStorage.value = res
  })
}

onMounted(() => {
  biStorageAmountInit()
})
</script>

<template>
  <div class="box-item storage-quantity">
    <div class="top-nav">
      <img src="@/assets/images/item-box-title-icon.png" alt="" />
      <div class="title gradient-regular">入库货量</div>
      <dv-decoration-3 class="line-decoration3" />
    </div>
    <dv-border-box8 :dur="5" class="content box-content">
      <div class="library-content">
        <div class="left-con">
          <div class="tit">今日入库</div>
          <div class="num">{{ biStorage.dayCunt }}</div>
        </div>
        <div class="line"></div>
        <div class="right-con">
          <div class="tit">当前库存</div>
          <div class="num">{{ biStorage.currentCount }}</div>
        </div>
      </div>
      <div class="other-content">
        <div class="item">
          <div>笔记本</div>
          <span>{{ biStorage.notebookCount }}</span>
        </div>
        <div class="item">
          <div>组装机</div>
          <span>{{ biStorage.assemblyCount }}</span>
        </div>
        <div class="item">
          <div>普通台式机</div>
          <span>{{ biStorage.desktopCount }}</span>
        </div>
        <div class="item">
          <div>打印机</div>
          <span>{{ biStorage.printerCount }}</span>
        </div>
      </div>
    </dv-border-box8>
  </div>
</template>

<style lang="scss" scoped>
@import "../style.css";
</style>

<style lang="scss">
.storage-quantity {
  height: calc(100% - 4px) !important;
  .box-content {
    height: 314px;
  }
  .border-box-content {
    display: grid;
    grid-template-rows: 1fr auto;
  }
}

@media screen and (max-width: 1680px) {
  .storage-quantity {
    .box-content {
      height: 274px;
    }
  }
}
</style>
