<template>
  <Panel :pWidth="200" :pHeight="200">
    <div>一堆多选框，有些是否支持</div>
    <div>
      视图模式
      <a-select
        v-model:value="seletValue"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option value="spatial">3D</a-select-option>
        <a-select-option value="stick">2.5D</a-select-option>
        <a-select-option value="stick">2D</a-select-option>
      </a-select>
    </div>
    <div>
      地表透明度
      <a-slider v-model:value="inputValue1" :min="1" :max="20" />
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