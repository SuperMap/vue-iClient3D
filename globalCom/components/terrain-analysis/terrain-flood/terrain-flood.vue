<template>
  <Panel :pWidth="230" :pHeight="180">
    <div>
      <div class="sm-global-row">
        <span>可见高度</span>
        <a-slider
          v-model:value="floodHeight"
          :min="0"
          :max="9000"
          range
          :step="1"
        />
      </div>
      <div class="sm-global-row">
        <span>当前高程</span>
        <a-input-number
          class="sm-global-input-number"
          v-model:value="currentHeight"
          :min="0"
          disabled
        />
      </div>
      <div class="sm-global-row">
        <span>淹没速度</span>
        <a-slider v-model:value="floodSpeed" :max="1000" :min="1" />
      </div>
      <div class="sm-global-button">
        <a-button size="small" @click="floodBegin">分析</a-button>
        <a-button size="small" @click="floodClear">清除</a-button>
      </div>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import terrainFlood from "./terrain-flood.js";
export default {
  name: "Sm3dTerrainFlood",
  components: {
    Panel,
  },
  props: {
    //最大可见高层
    maxHeight: {
      type: Number,
      default: 8000,
    },
    //最小可见高程
    minHeight: {
      type: Number,
      default: 1000,
    },
    //选择颜色
    cheackedBand: {
      type: String,
      default: "band1",
    },
    //淹没速度
    floodSpeed: {
      type: Number,
      default: 800,
    },
    //透明度
    floodTrans: {
      type: Number,
      default: 0.8,
    },
    //初始化传入分析区域
    floodPositions: {
      type: Array,
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let { floodHeight, currentHeight, floodSpeed, floodBegin, floodClear } =
      terrainFlood(props);

    function formatTooltip(val) {
      return val + "米";
    }
    function formatTooltip2(val) {
      return val + "米/秒";
    }

    return {
      floodHeight,
      currentHeight,
      floodSpeed,
      floodBegin,
      floodClear,
      formatTooltip,
      formatTooltip2,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm3d-tf-container {
  font-size: 16px;

  .sm-tf-button {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
.ant-slider {
  width: 130px;
}
</style>