<template>
  <Panel :pWidth="250" :pHeight="100">
    <a-radio-group v-model:value="clipModelPolygon" class="sm-global-row">
      <a-radio value="ClipInside">裁剪内部</a-radio>
      <a-radio value="ClipOutside">裁剪外部</a-radio>
    </a-radio-group>
    <div class="sm-global-button">
      <a-button  size="small" @click="clipPolygon"
        >裁剪</a-button
      >
      <a-button size="small" @click="clearClipPolygon">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import clipPolygonAnalysis from "./clip-polygon.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dClipPolygon",
  components: {
    Panel,
  },
  props: {
    //裁剪模式
    clipModelPolygon: {
      type: String,
      default: "ClipInside",
    },
    //是否编辑
    isEdit: {
      type: Boolean,
      default: false,
    },
    //是否编辑Z轴
    isEditZ: {
      type: Boolean,
      default: false,
    },
    //初始化传入分析区域
    polygonPositions: {
      type: Array,
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let { clipModelPolygon, isEdit, isEditZ, clipPolygon, clearClipPolygon } =
      clipPolygonAnalysis(props);

    return {
      clipModelPolygon,
      isEdit,
      isEditZ,
      clipPolygon,
      clearClipPolygon,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>