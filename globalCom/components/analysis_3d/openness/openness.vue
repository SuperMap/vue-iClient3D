<template>
  <Panel :pWidth="200" >
    <div class="sm-global-row">
      <span>附加高度</span>
      <a-slider v-model:value="addHeight" :min="0" :step="0.1" :max="10" />
    </div>
    <div class="sm-global-row">
      <span>开始角度</span>
      <a-slider v-model:value="startAngle" :min="0" :max="360" />
    </div>
    <div class="sm-global-row">
      <span>终止角度</span>
      <a-slider v-model:value="endAngle" :min="0" :max="360" />
    </div>
    <div class="sm-global-row">
      <span>观察半径</span>
      <a-slider v-model:value="endAngle" :min="0" :max="360" />
    </div>
    <div class="sm-global-row">
      <span>可视区颜色</span>
      <input class="sm-global-color" type="color" v-model="skylineColor" />
    </div>
    <div class="sm-global-row">
      <span>不可视颜色</span>
      <input class="sm-global-color" type="color" v-model="skylineColor" />
    </div>
    <div class="sm-global-row">
      <span>显示模式</span>
      <a-select class="sm-global-select" v-model:value="measureMode">
        <a-select-option value="Space">全部显示</a-select-option>
        <a-select-option value="Ground">可视部分</a-select-option>
        <a-select-option value="CGCS2000">不可视部分</a-select-option>
      </a-select>
    </div>

    <div class="sm-global-row">
      <a-checkbox v-model:checked="ignoreGlobe">是否封口</a-checkbox>
    </div>
    <div class="sm-global-button">
      <a-button  @click="analysis"
        >分析</a-button
      >
      <a-button @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
import openness from "./openness.js";
export default {
  name: "Sm3dOpenness",
  components: {
    Panel,
  },
  props: {
    //附加高度
    addHeight: {
      type: Number,
      default: 1,
    },
    //分析位置
    viewPosition: {
      type: Array,
    },
    //分析半径
    viewDomeRadius: {
      type: Number,
      default: 100,
    },
    //分析类型
    domeType: {
      type: String,
      default: "ALLDOME",
    },
    //是否封口
    isClosed: {
      type: Boolean,
      default: false,
    },
    //可见区颜色
    visibleAreaColor: {
      type: String,
      default: "rgba(9,199,112,0.5)",
    },
    //不可见颜色
    hiddenAreaColor: {
      type: String,
      default: "rgba(238,114,22,0.5)",
    },
    //开始角度
    startAngle: {
      type: Number,
      default: 10,
    },
    //终止角度
    endAngle: {
      type: Number,
      default: 360,
    },
  },
  setup(props) {
    let {
      addHeight, //附加高度
      viewDomeRadius, //分析半径
      domeType, //分析类型
      isClosed, //是否封口
      visibleAreaColor, //可见区颜色
      hiddenAreaColor, //不可见颜色
      startAngle, //开始角度
      endAngle, //终止角度
      analysis,
      clear,
    } = openness(props);

    // 滑块提示函数
    function formatTooltip(val) {
      return val + "米";
    }

    return {
      addHeight, //附加高度
      viewDomeRadius, //分析半径
      domeType, //分析类型
      isClosed, //是否封口
      visibleAreaColor, //可见区颜色
      hiddenAreaColor, //不可见颜色
      startAngle, //开始角度
      endAngle, //终止角度
      analysis,
      clear,
      formatTooltip,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>