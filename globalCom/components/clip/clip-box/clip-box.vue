<template>
  <Panel :pWidth="250" :pHeight="100">
    <a-radio-group v-model:value="clipModel" class="sm-global-row">
      <a-radio value="ClipInside">裁剪内部</a-radio>
      <a-radio value="ClipOutside">裁剪外部</a-radio>
    </a-radio-group>
    <div class="sm-global-button">
      <a-button size="small" @click="BoxClipByEitor"
        >裁剪</a-button
      >
      <a-button size="small" @click="clearBoxClipByEitor">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import clipBoxAnalysis from "./clip-box.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dClipBox",
  components: {
    Panel,
  },
  props: {
    //裁剪模式
    clipModel: {
      type: String,
      default: "ClipInside",
    },
  },
  setup(props) {
    let { clipModel, BoxClipByEitor, clearBoxClipByEitor } =
      clipBoxAnalysis(props);

    return {
      clipModel,
      BoxClipByEitor,
      clearBoxClipByEitor,
      clipBoxAnalysis,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>