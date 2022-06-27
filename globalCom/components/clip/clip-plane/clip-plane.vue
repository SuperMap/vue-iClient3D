<template>
  <Panel :pWidth="220" :pHeight="140">
    <div class="sm-global-row">
      <span>平面方向</span>
      <a-select v-model:value="planeDirection">
        <a-select-option value="vertical">竖直方向</a-select-option>
        <a-select-option value="parallel">水平方向</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>裁剪模式</span>
      <a-select v-model:value="clipMode">
        <a-select-option value="ClipInside">裁剪内部</a-select-option>
        <a-select-option value="ClipOutside">裁剪外部</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-button">
      <a-button size="small" @click="clipPlaneStart">裁剪</a-button>
      <a-button size="small" @click="clearClipPlane">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import clipPlane from "./clip-plane.js";
import { ref } from "vue";
export default {
  name: "Sm3dClipPlane",
  components: {
    Panel,
  },
  setup(props) {
    let { clipPlaneStart, clearClipPlane, clipMode, planeDirection } =
      clipPlane(props);
    return {
      clipPlaneStart,
      clearClipPlane,
      clipMode,
      planeDirection,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>