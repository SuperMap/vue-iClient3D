<template>
  <Panel :pWidth="300" >
    <div class="sm-global-row">
      <span>裁剪宽度</span>
      <div class="sm-cc-slider-input">
        <a-slider
          class="sm-cc-slider"
          v-model:value="clipWidth"
          :min="1"
          :step="1"
        />
        <a-input-number v-model:value="clipWidth" :min="1"  />
      </div>
    </div>
    <div class="sm-global-row">
      <span>裁剪高度</span>
      <div class="sm-cc-slider-input">
        <a-slider class="sm-cc-slider" v-model:value="clipHeight" :min="1" />
        <a-input-number v-model:value="clipHeight" :min="1"  />
      </div>
    </div>
    <div class="sm-global-row">
      <span>绕X轴旋转</span>
      <div class="sm-cc-slider-input">
        <a-slider class="sm-cc-slider" v-model:value="pitch" :min="1" :step="1" :max="360" />
        <a-input-number v-model:value="pitch" :min="0" :max="360" />
      </div>
    </div>
    <div class="sm-global-row">
      <span>绕Y轴旋转</span>
      <div class="sm-cc-slider-input">
        <a-slider
          class="sm-cc-slider"
          v-model:value="roll"
          :min="0"
          :step="1"
          :max="360"
        />
        <a-input-number v-model:value="roll" :min="0" :max="360" />
      </div>
    </div>
    <div class="sm-global-row">
      <span>绕Z轴旋转</span>
      <div class="sm-cc-slider-input">
        <a-slider
          class="sm-cc-slider"
          v-model:value="heading"
          :min="0"
          :step="1"
          :max="360"
        />
        <a-input-number v-model:value="heading" :min="0" :max="360" />
      </div>
    </div>
    <div class="sm-global-row">
      <span>拉伸高度</span>
      <div class="sm-cc-slider-input">
        <a-slider class="sm-cc-slider" v-model:value="extrude" :min="1" :step="1" />
        <a-input-number v-model:value="extrude" :min="1" />
      </div>
    </div>
    <div class="sm-global-button">
      <a-button  size="small" @click="startCross">裁剪</a-button>
      <a-button size="small" @click="clearCross">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import clipCrossAnalysis from "./clip-cross.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  components: {
    Panel,
  },
  name: "Sm3dClipCross",
  props: {
    //宽度
    clipWidth: {
      type: Number,
      default: 5,
    },
    //高度
    clipHeight: {
      type: Number,
      default: 5,
    },
    //绕X选转
    heading: {
      type: Number,
      default: 0,
    },
    //绕Y
    pitch: {
      type: Number,
      default: 0,
    },
    //绕Z
    roll: {
      type: Number,
      default: 0,
    },
    //拉伸
    extrude: {
      type: Number,
      default: 1,
    },
  },

  setup(props) {
    let {
      clipWidth,
      clipHeight,
      heading,
      pitch,
      roll,
      extrude,
      startCross,
      clearCross,
    } = clipCrossAnalysis(props);

    return {
      clipWidth,
      clipHeight,
      heading,
      pitch,
      roll,
      extrude,
      startCross,
      clearCross,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-cc-slider-input {
  display: flex;
  .sm-cc-slider {
    width: 100px;
  }
}
</style>