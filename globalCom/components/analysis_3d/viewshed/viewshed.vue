<template>
  <Panel :pWidth="270" >
    <div class="sm-global-row">
      <span>附加高度</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="addheight"
        :min="1"
        :step="0.1"
        :max="10"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>垂直视角</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="verticalFov"
        :min="1"
        :max="179"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>水平视角</span>
      <a-slider
        class="sm-global-slider"
        v-model:value="horizontalFov"
        :min="1"
        :max="179"
      ></a-slider>
    </div>
    <div class="sm-global-row">
      <span>提示线颜色</span>
      <input class="sm-global-color" type="color" v-model="hintLineColor" />
    </div>
    <div class="sm-global-row" v-show="!visibleBody && !invisibleBody">
      <span>可视区颜色</span>
      <input class="sm-global-color" type="color" v-model="visibleAreaColor" />
    </div>
    <div class="sm-global-row" v-show="!visibleBody && !invisibleBody">
      <span>隐藏区颜色</span>
      <input class="sm-global-color" type="color" v-model="hiddenAreaColor" />
    </div>
    <div class="sm-global-row" v-show="visibleBody">
      <span>不可视体颜色</span>
      <input class="sm-global-color" type="color" v-model="visibleBodyColor" />
    </div>
    <div class="sm-global-row" v-show="invisibleBody">
      <span>不可视颜色</span>
      <input
        class="sm-global-color"
        type="color"
        v-model="invisibleBodyColor"
      />
    </div>
    <!-- <div class="sm-global-row">
      <a-checkbox v-model:checked="visibleBody">显示可视体</a-checkbox>
      <a-checkbox v-model:checked="invisibleBody">显示不可视体</a-checkbox>
    </div>
    <div class="sm-global-row">
      <a-checkbox v-model:checked="viewshedAnimation">动态可视域</a-checkbox>
    </div> -->
    <div class="sm-global-button">
      <a-button size="small" @click="analysis"
        >分析</a-button
      >
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import viewshed from "./viewshed.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  components: {
    Panel,
  },
  name: "Sm3dViewshed",
  props: {
    //可视域体数据服务
    viewshedSpatialUrl: {
      type: String,
    },
    //初始化观察者信息
    observerInformation: {
      type: Object,
    },
    //方向角
    direction: {
      type: Number,
    },
    //俯仰角
    pitch: {
      type: Number,
    },
    //附加高度
    addheight: {
      type: Number,
    },
    //可视域距离
    distance: {
      type: Number,
    },
    //水平视角
    verticalFov: {
      type: Number,
    },
    //垂直视角
    horizontalFov: {
      type: Number,
    },
    //可视线颜色
    hintLineColor: {
      type: String,
    },
    //可视区域颜色
    visibleAreaColor: {
      type: String,
    },
    //不可视域颜色
    hiddenAreaColor: {
      type: String,
    },
    //可视域体颜色
    visibleBodyColor: {
      type: String,
    },
    //不可视域体颜色
    invisibleBodyColor: {
      type: String,
    },
    //显示可视域体
    visibleBody: {
      type: Boolean,
    },
    //显示不可视域体
    invisibleBody: {
      type: Boolean,
    },
    //动态可视域设置
    viewshedAnimation: {
      type: Boolean,
    },
    //动态可视域路线点
    DynamicLine: {
      type: Array,
    },
    //动态分析行进速度
    DynamicSpeed: {
      type: Number,
    },
  },

  setup(props) {
    let {
      visibleBody,
      invisibleBody,
      viewshedAnimation,
      analysis,
      clear,
      addheight,
      verticalFov,
      horizontalFov,
      hintLineColor,
      visibleAreaColor,
      hiddenAreaColor,
      visibleBodyColor,
      invisibleBodyColor,
    } = viewshed(props);
    return {
      addheight,
      verticalFov,
      horizontalFov,
      hintLineColor,
      visibleAreaColor,
      hiddenAreaColor,
      visibleBodyColor,
      invisibleBodyColor,
      visibleBody,
      invisibleBody,
      viewshedAnimation,
      analysis,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>