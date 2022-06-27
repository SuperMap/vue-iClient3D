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
          暂无影像图层
        </a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>亮度</span>
      <a-slider
        v-model:value="brightness"
        :min="0"
        :max="3"
        :step="0.05"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>对比度</span>
      <a-slider
        v-model:value="contrast"
        :min="0"
        :max="3"
        :step="0.05"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>色调</span>
      <a-slider
        v-model:value="hue"
        :min="0"
        :max="3"
        :step="0.05"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>饱和度</span>
      <a-slider
        v-model:value="saturation"
        :min="0"
        :max="3"
        :step="0.05"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>伽马</span>
      <a-slider
        v-model:value="gamma"
        :min="0"
        :max="3"
        :step="0.05"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>透明度</span>
      <a-slider
        v-model:value="alpha"
        :min="0"
        :max="1"
        :step="0.01"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>透明色</span>
      <input
        type="color"
        class="sm-global-color"
        v-model="transparentBackColor"
      />
    </div>
    <div class="sm-global-row">
      <span>透明色容限</span>
      <a-slider
        v-model:value="transparentBackColorTolerance"
        :min="0"
        :max="1"
        :step="0.01"
        class="sm-global-slider"
      ></a-slider>
    </div>
  </Panel>
</template>

<script>
import layerAttribute from "./imglayer-attribute.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dImglayerAttribute",
  components: {
    Panel,
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String,
    },
    //默认亮度
    brightness: {
      type: Number,
    },
    //对比度
    contrast: {
      type: Number,
    },
    //色调
    hue: {
      type: Number,
    },
    //饱和度
    saturation: {
      type: Number,
    },
    //伽马
    gamma: {
      type: Number,
    },
    alpha: {
      type: Number,
    },
    transparentBackColor: {
      type: String,
    },
    transparentBackColorTolerance: {
      type: Number,
    },
  },
  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      alpha,
      transparentBackColor,
      transparentBackColorTolerance,
    } = layerAttribute(props);
    return {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      alpha,
      transparentBackColor,
      transparentBackColorTolerance,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>