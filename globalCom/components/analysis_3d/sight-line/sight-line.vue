<template>
  <Panel :pWidth="250" >
    <div>
      <div class="sm-global-row">
        <span class="sm-title">线宽度</span>
        <a-slider
          class="sm-global-slider"
          v-model:value="lineWidth"
          :min="1"
          :step="1"
          :max="10"
        ></a-slider>
      </div>
      <div class="sm-global-row">
        <span>可视区颜色</span>
        <input class="sm-global-color" type="color" v-model="visibleColor" />
      </div>
      <div class="sm-global-row">
        <span>不可视颜色</span>
        <input class="sm-global-color" type="color" v-model="hiddenColor" />
      </div>
      <!-- <div class="sm-global-row">
        <span>障碍物颜色</span>
        <input class="sm-global-color" type="color" v-model="barrierColor" />
      </div> -->
      <!-- <div class="sm-global-row">
        <a-checkbox v-model:checked="showBarrierPoints">显示障碍点</a-checkbox>
        <a-checkbox v-model:checked="highlightBarrier">高亮障碍物</a-checkbox>
      </div> -->
      <div class="sm-global-button">
        <a-button   @click="analysis" size="small"
          >分析</a-button
        >
        <a-button  @click="clear" size="small">清除</a-button>
      </div>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import sightLine from "./sight-line.js";
import { ref } from "vue";
export default {
  name: "Sm3dSightline",
  components: {
    Panel,
  },
  props: {
    //s初始视点位置
    viewPosition: {
      type: Array,
    },
    //可见部分颜色
    visibleColor: {
      type: String,
      default: "#00C800",
    },
    //不可见颜色
    hiddenColor: {
      type: String,
      default: "#C80000",
    },
    //高亮障碍物颜色
    barrierColor: {
      type: String,
      default: "#FFBA01",
    },
    //是否显示高亮障碍物
    highlightBarrier: {
      type: Boolean,
      default: false,
    },
    //通视线宽
    lineWidth: {
      type: Number,
      default: 3,
    },
    showBarrierPoints: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let {
      lineWidth,
      visibleColor,
      hiddenColor,
      barrierColor,
      highlightBarrier,
      showBarrierPoints,
      analysis,
      clear,
    } = sightLine(props);
    return {
      lineWidth,
      visibleColor,
      hiddenColor,
      barrierColor,
      highlightBarrier,
      showBarrierPoints,
      analysis,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>


