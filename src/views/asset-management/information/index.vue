<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue"
const AssetList = defineAsyncComponent(() => import("./components/assetList/index.vue"))
const OutboundRecords = defineAsyncComponent(() => import("./components/outboundRecords/index.vue"))
const StorageRecords = defineAsyncComponent(() => import("./components/storageRecords/index.vue"))
const ScrapRecords = defineAsyncComponent(() => import("./components/scrapRecords/index.vue"))
const MaintenanceRecords = defineAsyncComponent(() => import("./components/maintenanceRecords/index.vue"))

const assetListRef = ref()
const outboundRecordsRef = ref()
const storageRecordsRef = ref()
const scrapRecordsRef = ref()
const maintenanceRecordsRef = ref()

const activeName = ref("assetList")

const loadedTabs = ref({
  assetList: true,
  outboundRecords: false,
  storageRecords: false,
  scrapRecords: false,
  maintenanceRecords: false
})

const handleTabClick = ({ paneName }) => {
  Object.keys(loadedTabs.value).forEach((k: any) => {
    if(k === paneName){
      loadedTabs.value[k] = true;
    }else{
      loadedTabs.value[k] = false
    }
  })
}
</script>

<template>
  <div class="tabs-content">
    <el-card  shadow="never">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="资产列表" name="assetList">
          <AssetList v-if="loadedTabs.assetList" ref="assetListRef" />
        </el-tab-pane>
        <el-tab-pane label="出库记录" name="outboundRecords">
          <OutboundRecords v-if="loadedTabs.outboundRecords" ref="outboundRecordsRef" />
        </el-tab-pane>
        <el-tab-pane label="入库记录" name="storageRecords">
          <StorageRecords v-if="loadedTabs.storageRecords" ref="storageRecordsRef" />
        </el-tab-pane>
        <el-tab-pane label="报废记录" name="scrapRecords">
          <ScrapRecords v-if="loadedTabs.scrapRecords" ref="scrapRecordsRef" />
        </el-tab-pane>
        <el-tab-pane label="维修记录" name="maintenanceRecords">
          <MaintenanceRecords v-if="loadedTabs.maintenanceRecords" ref="maintenanceRecordsRef" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<style lang="scss">
.tabs-content .public-search .search-btns{
  margin-bottom: 24px;
}
</style>
