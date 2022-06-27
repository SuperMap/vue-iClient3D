<template>
  <Panel :pWidth="300">
    <div class="sm-global-row">
      <span>选择图层</span>
      <a-select v-model:value="selectedLayerName">
        <a-select-option
          v-for="(layer, index) in layerNames"
          :key="index"
          :value="layer"
        >
          {{ layer }}
        </a-select-option>
        <a-select-option value="none">暂无s3m图层</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>亮度</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="brightness"
        :min="0"
        :max="3"
        :step="0.05"
      />
    </div>
    <div class="sm-global-row">
      <span>对比度</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="contrast"
        :min="0"
        :max="3"
        :step="0.05"
        input-size="mini"
      />
    </div>
    <div class="sm-global-row">
      <span>色调</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="hue"
        :min="0"
        :max="3"
        :step="0.05"
        input-size="mini"
      />
    </div>
    <div class="sm-global-row">
      <span>饱和度</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="saturation"
        :min="0"
        :max="3"
        :step="0.05"
        input-size="mini"
      />
    </div>
    <div class="sm-global-row">
      <span>伽马</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="gamma"
        :min="0"
        :max="3"
        :step="0.05"
        input-size="mini"
      />
    </div>
    <a-radio-group v-model:value="shadowMode" class="sm-global-row">
      <a-radio value="noShadow">关闭阴影</a-radio>
      <a-radio value="allShadow">开启阴影</a-radio>
    </a-radio-group>
    <div class="sm-global-row">
      <span>阴影明暗度</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="shadowDarkness"
        :min="0"
        :max="1"
        :step="0.05"
        input-size="mini"
      />
    </div>

    <!-- <a-checkbox-group v-model:value="selectEnabled" class="sm-global-row">
      <a-checkbox value="selectEnabled" v-show="selectEnabled"
        >是否可选</a-checkbox
      >
      <a-checkbox value="multiChoose">多选</a-checkbox>
      <a-checkbox value="cullEnabled">双面渲染</a-checkbox>
    </a-checkbox-group> -->

    <div class="sm-global-row">
      <span>可见性</span>
      <a-select v-model:value="visibility" style="width: 150px">
        <a-select-option value="onlyShowSlection"
          >仅选中对象可见</a-select-option
        >
        <a-select-option value="onlyHideSlection"
          >仅选中对象隐藏</a-select-option
        >
        <a-select-option value="showAll">显示全部</a-select-option>
      </a-select>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import layerAttribute from "./s3mlayer-attribute.js";
import { ref } from "vue";
export default {
  components: {
    Panel,
  },
  name: "Sm3dS3mlayerAttribute",
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
    //阴影模式
    shadowMode: {
      type: String,
    },
    //阴影明暗度
    shadowDarkness: {
      type: Number,
    },
    //多选
    multiChoose: {
      type: Boolean,
    },
    //双面渲染
    cullEnabled: {
      type: Boolean,
    },
    //图层可见性
    visibility: {
      type: String,
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
      shadowMode,
      shadowDarkness,
      selectEnabled,
      multiChoose,
      cullEnabled,
      visibility,
    } = layerAttribute(props);
    return {
      layerNames,
      selectedLayerName,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      shadowMode,
      shadowDarkness,
      selectEnabled,
      multiChoose,
      cullEnabled,
      visibility,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>