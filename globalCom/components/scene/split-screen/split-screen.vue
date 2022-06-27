<template>
  <Panel :pWidth="220">
    <div class="sm-global-row">
      <span>分屏显示</span>
      <a-select v-model:value="multiViewport" style="width: 120px">
        <a-select-option value="NONE">不使用分屏</a-select-option>
        <a-select-option value="HORIZONTAL">水平分屏</a-select-option>
        <a-select-option value="VERTICAL">垂直分屏</a-select-option>
        <a-select-option value="TRIPLE">三视口</a-select-option>
        <a-select-option value="QUAD">四视口</a-select-option>
      </a-select>
    </div>
    <!-- <a-radio-group v-model:value="selectedViewport" name="radioGroup">
      <a-radio value="0" v-show="multiViewport !== 'NONE'">视口一</a-radio>
      <a-radio value="1" v-show="multiViewport !== 'NONE'">视口二</a-radio>
      <a-radio
        value="2"
        v-show="multiViewport === 'TRIPLE' || multiViewport === 'QUAD'"
        >视口三</a-radio
      >
      <a-radio value="3" v-show="multiViewport === 'QUAD'">视口四</a-radio>
    </a-radio-group>
    <a-tree
      :data="TreeDatas"
      show-checkbox
      node-key="id"
      accordion
      ref="tree"
      @check="checkNode"
    ></a-tree> -->
  </Panel>
</template>

<script>
import splitScreen from "./split-screen.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dSplitScreen",
  components: {
    Panel,
  },
  setup(props) {
    let { multiViewport, selectedViewport, TreeDatas, tree, checkNode } =
      splitScreen(props);
    return { multiViewport, selectedViewport, TreeDatas, tree, checkNode };
  },
};
</script>

<style lang="scss" scoped>
</style>