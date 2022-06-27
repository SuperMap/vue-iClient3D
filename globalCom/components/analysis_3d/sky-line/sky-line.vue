<template>
  <Panel :pWidth="250" >
    <div class="sm-global-row">
      <span class="sm-global-row-title">显示模式</span>
      <a-select class="sm-global-select" v-model:value="skylineMode">
        <a-select-option value="line">线显示</a-select-option>
        <a-select-option value="area">面显示</a-select-option>
        <a-select-option value="volume">体显示</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>分析半径</span>
      <a-input-number
        class="sm-global-input-number"
        v-model:value="skylineRadius"
        :min="1"
      />
    </div>
    <div class="sm-global-row">
      <span>线宽度</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="lineWidth"
        :min="1"
        :max="10"
      />
    </div>
    <div class="sm-global-row">
      <span>天际线颜色</span>
      <input class="sm-global-color" type="color" v-model="skylineColor" />
    </div>
    <div class="sm-global-row">
      <span>天际体颜色</span>
      <input class="sm-global-color" type="color" v-model="skyBodyColor" />
    </div>
    <div class="sm-global-row">
      <span>障碍物颜色</span>
      <input class="sm-global-color" type="color" v-model="barrierColor" />
    </div>
    <!-- <div class="sm-global-row">
      <a-checkbox v-model:checked="getSkyline2d">二维显示</a-checkbox>
      <a-checkbox v-model:checked="ignoreGlobe">地表不参与分析</a-checkbox>
      <a-checkbox v-model:checked="highlightBarrier">高亮障碍物</a-checkbox>
    </div> -->

    <div class="sm-global-button">
      <a-button  @click="skyLineAnalysis"
        >分析</a-button
      >
      <!-- <a-button  @click="setLimitBody">限高</a-button> -->
      <a-button @click="clear">清除</a-button>
    </div>
    <div ref="echarts_box" id="echarts_box" v-show="getSkyline2d">echarts</div>
  </Panel>
</template>

<script>
import skyLine from "./sky-line.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dSkyline",
  components: {
    Panel,
  },
  // props: {
  //   //分析服务地址
  //   skylineSpatialAnalysisUrl: {
  //     type: String,
  //   },
  //   //观察者信息：查看或设置观察者信息
  //   observerInformation: {
  //     type: Object,
  //   },
  //   //天际线分析半径
  //   skylineRadius: {
  //     type: Number,
  //   },
  //   //天际线宽度
  //   lineWidth: {
  //     type: Number,
  //   },
  //   //天际线颜色
  //   skylineColor: {
  //     type: String,
  //   },
  //   //天际体颜色
  //   skyBodyColor: {
  //     type: String,
  //   },
  //   //高亮障碍物颜色
  //   barrierColor: {
  //     type: String,
  //   },
  //   //显示高亮障碍物
  //   highlightBarrier: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   //天际线分析模式：线，面，体
  //   skylineMode: {
  //     type: String,
  //   },
  //   //显示二维分析结果
  //   getSkyline2d: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   //忽略地表参与分析
  //   ignoreGlobe: {
  //     type: Boolean,
  //     default: true,
  //   },
  // },

  setup(props) {
    let {
      skylineRadius,
      lineWidth,
      skylineColor,
      skyBodyColor,
      barrierColor,
      highlightBarrier,
      getSkyline2d,
      skyLineAnalysis,
      setLimitBody,
      clear,
      echarts_box,
      skylineMode,
      ignoreGlobe,
    } = skyLine(props);

    return {
      skylineRadius,
      lineWidth,
      skylineColor,
      skyBodyColor,
      barrierColor,
      highlightBarrier,
      getSkyline2d,
      skyLineAnalysis,
      setLimitBody,
      clear,
      echarts_box,
      skylineMode,
      ignoreGlobe,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-title {
  font-size: 14px;
}
</style>