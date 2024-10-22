<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue"
import * as echarts from "echarts"
import { biOutAndPutStorage } from "@/api/dashboard/index"

const barChartRef = ref()
let data1 = reactive([])
let data2 = reactive([])
let xAxisData = reactive([])
let legendData = reactive([])

const initChart = () => {
  const chart = echarts.init(barChartRef.value)
  var colors = [
    {
      type: "linear",
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: "rgba(65, 175, 250, 0.8)"
        },
        {
          offset: 0.5,
          color: "rgba(65, 175, 250, 0.8)"
        },
        {
          offset: 0.5,
          color: "#80d2fa"
        },
        {
          offset: 1,
          color: "#80d2fa"
        }
      ]
    },
    {
      type: "linear",
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: "rgba(39, 175, 199, 0.8)"
        },
        {
          offset: 0.5,
          color: "rgba(39, 175, 199, 0.8)"
        },
        {
          offset: 0.5,
          color: "#50d9cf"
        },
        {
          offset: 1,
          color: "#50d9cf"
        }
      ]
    }
  ]
  const barWidth = 15
  const constData1 = []
  const showData1 = []
  data1.filter(function (item) {
    if (item) {
      constData1.push(1)
      showData1.push(item)
    } else {
      constData1.push(0)
      showData1.push({
        value: 1,
        itemStyle: {
          normal: {
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 2,
            color: "rgba(0,0,0,0)"
          }
        }
      })
    }
  })
  const constData2 = []
  const showData2 = []
  data2.filter(function (item) {
    if (item) {
      constData2.push(1)
      showData2.push(item)
    } else {
      constData2.push(0)
      showData2.push({
        value: 1,
        itemStyle: {
          normal: {
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 2,
            color: "rgba(0,0,0,0)"
          }
        }
      })
    }
  })
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      top: "12px",
      itemGap: 36, // 调整图例项之间的距离
      selectedMode: false,
      data: legendData,
      textStyle: {
        padding: [0, 0, 0, 2], // 调整图例文本与图标之间的距离
        color: "#e7e7d8" // 将图例文本颜色修改为红色
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: "#c0eaff"
        }
      },
      axisLabel: {
        color: "#c0eaff"
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#c0eaff"
        }
      },
      axisLabel: {
        color: "#c0eaff"
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.15)"
        }
      }
    },
    series: [
      {
        z: 1,
        name: legendData[0],
        type: "bar",
        data: data1,
        barWidth: barWidth,
        barGap: "0%",
        itemStyle: {
          normal: {
            color: colors[0]
          }
        }
      },
      {
        z: 2,
        name: legendData[0],
        type: "pictorialBar",
        data: constData1,
        symbol: "diamond",
        symbolOffset: ["-75%", "50%"],
        symbolSize: [barWidth, 10],
        itemStyle: {
          normal: {
            color: colors[0]
          }
        },
        tooltip: {
          show: false
        }
      },
      {
        z: 3,
        name: legendData[0],
        type: "pictorialBar",
        symbolPosition: "end",
        data: showData1,
        symbol: "diamond",
        symbolOffset: ["-75%", "-50%"],
        symbolSize: [barWidth, (10 * barWidth) / barWidth],
        itemStyle: {
          normal: {
            borderColor: "#96dfff",
            borderWidth: 2,
            color: "#96dfff"
          }
        },
        tooltip: {
          show: false
        }
      },
      {
        z: 1,
        barGap: "50%",
        name: legendData[1],
        type: "bar",
        barWidth: barWidth,
        data: data2,
        itemStyle: {
          normal: {
            color: colors[1]
          }
        }
      },
      {
        z: 2,
        name: legendData[1],
        type: "pictorialBar",
        data: constData2,
        symbol: "diamond",
        symbolOffset: ["75%", "50%"],
        symbolSize: [barWidth, 10],
        itemStyle: {
          normal: {
            color: colors[1]
          }
        },
        tooltip: {
          show: false
        }
      },
      {
        z: 3,
        name: legendData[1],
        type: "pictorialBar",
        symbolPosition: "end",
        data: showData2,
        symbol: "diamond",
        symbolOffset: ["75%", "-50%"],
        symbolSize: [barWidth, (10 * barWidth) / barWidth],
        itemStyle: {
          normal: {
            borderColor: "#8bead4",
            borderWidth: 2,
            color: "#8bead4"
          }
        },
        tooltip: {
          show: false
        }
      }
    ]
  }
  chart.setOption(option)
}

const biOutAndPutStorageInit = async () => {
  await biOutAndPutStorage().then((res) => {
    if (res.length) {
      data1 = res[0].seriesData[0].data
      data2 = res[0].seriesData[1].data
      xAxisData = res[0].xAxisData
      legendData = res[0].seriesData.map((i) => i.name)
    }
  })
}

onMounted(async () => {
  await biOutAndPutStorageInit()
  await initChart()
})
</script>

<template>
  <div class="box-item export-import-situation">
    <div class="top-nav">
      <img src="@/assets/images/item-box-title-icon.png" alt="" />
      <div class="title gradient-regular">近一年出/入库情况</div>
      <dv-decoration-3 class="line-decoration3" />
    </div>
    <dv-border-box8 :dur="5" class="content">
      <div ref="barChartRef" style="width: 100%; height: 100%"></div>
    </dv-border-box8>
  </div>
</template>

<style lang="scss" scoped>
@import "../style.css";
</style>
