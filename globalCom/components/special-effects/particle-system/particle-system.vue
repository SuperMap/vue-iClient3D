<template>
  <Panel :pWidth="200" :pHeight="200">
    <div>火焰 水 烟花</div>
    <div>
      类型
      <a-select
        
        v-model:value="seletValue"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option value="spatial">空间量算</a-select-option>
        <a-select-option value="stick">贴地量算</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-button">
      <a-button  size="small">开挖</a-button>
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