<template>
  <Panel :pWidth="270" :pHeight="140">
    <div class="sm-global-row">
      <span>分析区域</span>
      <a-select v-model:value="analysisArea" style="width: 170px">
        <a-select-option value="ARM_REGION">指定多边形区域</a-select-option>
        <a-select-option value="ARM_ALL">全部区域参与分析</a-select-option>
        <a-select-option value="ARM_NONE">全部区域不参与分析</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>坡度区间</span>
      <a-slider
        v-model:value="slopeInterval"
        :min="0"
        :max="90"
        range
        :step="1"
      />
    </div>
    <div class="sm-global-button">
      <a-button size="small" @click="startSlope">分析</a-button>
      <a-button size="small" @click="clearSlope">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import terrainSlope from "./terrain-slope.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  components: {
    Panel,
  },
  name: "Sm3dTerrainSlope",
  props: {
    //分析区域
    analysisArea: {
      type: String,
      default: "ARM_REGION",
    },
    //显示模式
    displayMode: {
      type: String,
      default: "FACE_AND_ARROW",
    },
    //最大坡度
    wideMaxR: {
      type: Number,
      default: 90,
    },
    //最小坡度
    wideMinR: {
      type: Number,
      default: 0,
    },
    //透明度
    trans: {
      type: Number,
      default: 0.8,
    },
    //是否编辑
    isEdit: {
      type: Boolean,
      default: false,
    },
    //初始化传入分析区域
    slopePositions: {
      type: Array,
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
  setup(props) {
    let {
      analysisArea,
      displayMode,
      wideMaxR,
      wideMinR,
      trans,
      isEdit,
      slopeInterval,
      startSlope,
      clearSlope,
    } = terrainSlope(props);

    function formatTooltip(val) {
      return Resource.slope + val + "°";
    }

    return {
      analysisArea,
      displayMode,
      wideMaxR,
      wideMinR,
      trans,
      isEdit,
      slopeInterval,
      startSlope,
      clearSlope,
      formatTooltip,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-slider {
  width: 160px;
}
</style>