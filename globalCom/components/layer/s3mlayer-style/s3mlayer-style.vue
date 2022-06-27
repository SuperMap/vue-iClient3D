<template>
  <Panel :pWidth="300">
    <div class="sm-global-row">
      <span>选择图层</span>
      <a-select  v-model:value="selectedLayerName" class="sm-global-select" >
        <a-select-option
          v-for="(layer, index) in layerNames"
          :key="index"
          :value="layer"
          >{{ layer }}</a-select-option
        >
        <a-select-option v-show="layerNames.length == 0" value="none"
          >暂无s3图层</a-select-option
        >
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>前景色</span>
      <input type="color" v-model="foreColor" class="sm-global-color" />
    </div>
    <div class="sm-global-row">
      <span>线颜色</span>
      <input type="color" v-model="lineColor" class="sm-global-color" />
    </div>
    <div class="sm-global-row">
      <span>选中色</span>
      <input type="color" v-model="selectedColor" class="sm-global-color" />
    </div>
    <div class="sm-global-row">
      <span>选中色模式</span>
      <a-radio-group v-model:value="selectColorMode" class="sm-global-row">
        <a-radio value="mix">混合</a-radio>
        <a-radio value="replace">替换</a-radio>
      </a-radio-group>
    </div>
    <div class="sm-global-row">
      <span>底部高层</span>
      <a-slider
        v-model:value="bottomAltitude"
        :min="0"
        :step="1"
        :max="1000"
        class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>LOD</span>
      <a-slider
        v-model:value="LODScale"
        :min="0"
        :max="10"
        :step="0.5"
         class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>图层透明度</span>
      <a-slider
        v-model:value="layerTrans"
        :min="0"
        :max="1"
        :step="0.1"
         class="sm-global-slider"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>填充风格</span>
      <a-select
        v-model:value="fillStyle"
        class="sm-global-select"
      >
        <a-select-option value="fill">填充模式</a-select-option>
        <a-select-option value="wireframe">线框模式</a-select-option>
        <a-select-option value="fill-and-wireframe">填充和线框模式</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>最小可见距离</span>
      <a-input-number
        v-model:value="visibleDistanceMin"
        :min="0"
        class="sm-global-input-number"
      />
    </div>
    <div class="sm-global-row">
      <span>最大可见距离</span>
      <a-input-number
        v-model:value="visibleDistanceMax"
        :min="0"
         class="sm-global-input-number"
      />
    </div>
  </Panel>
</template>

<script>
import s3mlayerStyle from "./s3mlayer-style.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dS3mlayerStyle",
  components: {
    Panel,
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String,
    },
    //前景色
    foreColor: {
      type: String,
    },
    //线颜色
    lineColor: {
      type: String,
    },
    //选中色
    selectedColor: {
      type: String,
    },
    //选中模式
    selectColorMode: {
      type: String,
    },
    //底部高层
    bottomAltitude: {
      type: Number,
    },
    //lod
    LODScale: {
      type: Number,
    },
    //图层透明度
    layerTrans: {
      type: Number,
    },
    //填充风格
    fillStyle: {
      type: String,
    },
    //最小可见高度
    visibleDistanceMin: {
      type: Number,
    },
    //最大可见高度
    visibleDistanceMax: {
      type: Number,
    },
  },
  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      foreColor,
      lineColor,
      selectedColor,
      selectColorMode,
      bottomAltitude,
      LODScale,
      layerTrans,
      fillStyle,
      visibleDistanceMin,
      visibleDistanceMax,
    } = s3mlayerStyle(props);
    return {
      layerNames,
      selectedLayerName,
      foreColor,
      lineColor,
      selectedColor,
      selectColorMode,
      bottomAltitude,
      LODScale,
      layerTrans,
      fillStyle,
      visibleDistanceMin,
      visibleDistanceMax,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>