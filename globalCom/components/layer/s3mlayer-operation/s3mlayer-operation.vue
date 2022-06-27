<template>
  <Panel :pWidth="300">
    <div class="sm-global-row">
      <span>选择图层</span>
      <a-select v-model:value="selectedLayerName" class="sm-global-select">
        <a-select-option
          v-for="(layer, index) in layerNames"
          :key="index"
          :value="layer"
        >
          {{ layer }}
        </a-select-option>
        <a-select-option v-show="layerNames.length == 0" value="none">
          暂无s3m图层
        </a-select-option>
      </a-select>
    </div>
    <div>
      <a-checkbox v-model:checked="selectedoffset">选择偏移</a-checkbox>
    </div>
    <div class="sm-global-row">
      <span>沿X轴偏移</span>
      <a-slider
        class="sm-global-slider"
        v-model="offsetX"
        :min="-50"
        :max="50"
        :step="1"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>沿Y轴偏移</span>
      <a-slider
        class="sm-global-slider"
        v-model="offsetY"
        :min="-50"
        :max="50"
        :step="1"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>沿Z轴偏移</span>
      <a-slider
        class="sm-global-slider"
        v-model="offsetZ"
        :min="-50"
        :max="50"
        :step="1"
      ></a-slider>
    </div>
    <div>
      <a-checkbox v-model:checked="polygonOffset">多边形偏移</a-checkbox>
    </div>
    <div class="sm-global-row">
      <span>偏移因子</span>
      <a-slider
        class="sm-global-slider"
        v-model="polygonOffsetFactor"
        :min="-50"
        :max="50"
        :step="1"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>偏移量</span>
      <a-slider
        class="sm-global-slider"
        v-model="polygonOffsetUnit"
        :min="-50"
        :max="50"
        :step="1"
      ></a-slider>
    </div>
  </Panel>
</template>

<script>
import s3mlayerOperation from "./s3mlayer-operation.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dS3mlayerOperation",
  components: {
    Panel,
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String,
    },
    //选中偏移
    selectedoffset: {
      type: Boolean,
    },
    //沿X轴偏移
    offsetX: {
      type: Number,
    },
    //沿Y轴偏移
    offsetY: {
      type: Number,
    },
    //沿Z轴偏移
    offsetZ: {
      type: Number,
    },
    //多边形偏移
    polygonOffset: {
      type: Boolean,
    },
    //偏移因子
    polygonOffsetFactor: {
      type: Number,
    },
    //偏移单位
    polygonOffsetUnit: {
      type: Number,
    },
  },
  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      selectedoffset,
      offsetX, //沿X轴偏移
      offsetY, //沿X轴偏移
      offsetZ, //沿Z轴偏移
      polygonOffset, //多边形偏移
      polygonOffsetFactor, //偏移因子
      polygonOffsetUnit, //偏移单位
    } = s3mlayerOperation(props);
    return {
      layerNames,
      selectedLayerName,
      selectedoffset,
      offsetX, //沿X轴偏移
      offsetY, //沿X轴偏移
      offsetZ, //沿Z轴偏移
      polygonOffset, //多边形偏移
      polygonOffsetFactor, //偏移因子
      polygonOffsetUnit, //偏移单位
    };
  },
};
</script>

<style lang="scss" scoped>
</style>