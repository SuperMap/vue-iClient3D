<template>
  <Panel :pWidth="240" :pHeight="180">
    <div class="sm-global-row">
      <span>可见高度</span>
      <a-slider
        v-model:value="fillHeight"
        :min="0"
        :max="9000"
        range
        :step="1"
        input-size="mini"
        :debounce="500"
        tooltip-class="tooltip-class"
        :format-tooltip="formatTooltip"
      ></a-slider>
    </div>
    <div class="sm-global-row sm-il-margin">
      <span>等值距(米)</span>
      <a-input-number
        v-model:value="equivalentIsoline"
        :min="0"
        placeholder="深度"
        style="width: 140px"
      />
    </div>
    <div class="sm-global-row sm-il-margin">
      <span>显示模式</span>
      <a-select
        v-model:value="fillOptionsSelected"
        style="width: 140px"
      >
        <a-select-option value="Line">等高线填充</a-select-option>
        <a-select-option value="Region">等高面填充</a-select-option>
        <a-select-option value="Line_Region">等高线面填充</a-select-option>
        <a-select-option value="None">无颜色表</a-select-option>
      </a-select>
    </div>
    <div class="sm-ti-button">
      <a-button  size="small" @click="isoLineAnalysis"
        >分析</a-button
      >
      <a-button size="small" @click="clearIsoLine">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import terrainIsoline from "./terrain-isoline.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  components: {
    Panel,
  },
  name: "Sm3dTerrainIsoline",
  props: {
    //最大可见高层
    fillMaxHeight: {
      type: Number,
    },
    //最小可见高程
    fillMinHeight: {
      type: Number,
    },
    //等值距
    equivalentIsoline: {
      type: Number,
    },
    //颜色
    lineColor: {
      type: String,
    },
    //显示模式
    fillOptionsSelected: {
      type: String,
    },
    //是否编辑
    isEdit: {
      type: Boolean,
    },
    //初始化传入分析区域
    isolinePositions: {
      type: Array,
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let {
      fillMaxHeight,
      fillMinHeight,
      fillHeight,
      equivalentIsoline,
      lineColor,
      fillOptionsSelected,
      isEdit,
      isoLineAnalysis,
      clearIsoLine,
    } = terrainIsoline(props);

    return {
      fillMaxHeight,
      fillMinHeight,
      fillHeight,
      equivalentIsoline,
      lineColor,
      fillOptionsSelected,
      isEdit,
      isoLineAnalysis,
      clearIsoLine,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-ti-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.ant-slider {
  width: 130px;
}
.sm-il-margin {
  margin-top: 10px;
}
</style>