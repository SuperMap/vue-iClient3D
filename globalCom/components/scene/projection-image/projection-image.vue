<template>
  <Panel :pWidth="200" :pHeight="200">
    <div>视频路径</div>
    <div>
      水平视角
      <a-slider v-model:value="inputValue1" :min="1" :max="20" />
    </div>
    <div>
      垂直视角
      <a-slider v-model:value="inputValue1" :min="1" :max="20" />
    </div>
    <div>
      投放距离
      <a-slider v-model:value="inputValue1" :min="1" :max="20" />
    </div>
    <div>
      裁剪模式
      <a-radio-group v-model:value="clipValue" name="radioGroup">
        <a-radio value="ClipInside">裁剪内部</a-radio>
        <a-radio value="ClipOutside">裁剪外部</a-radio>
      </a-radio-group>
    </div>
    <div>
      <a-checkbox v-model:checked="checked">显示投放线和模型</a-checkbox>
    </div>
    <div class="sm-global-button">
      <a-button size="small">投放</a-button>
      <a-button size="small">裁剪</a-button>
      <a-button size="small">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import {  ref } from "vue";
export default {
  components: {
    Panel,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>