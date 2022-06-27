<template>
  <Panel :pWidth="230" :pHeight="200">
    <div class="sm-global-row">
      <span>卷帘模式</span>
      <a-select  v-model:value="rollerMode" style="width: 120px">
        <a-select-option value="lrRoller">左右卷帘</a-select-option>
        <a-select-option value="tbRoller">上下卷帘</a-select-option>
        <a-select-option value="customRoller">自定义卷帘</a-select-option>
      </a-select>
    </div>

    <a-checkbox v-model:checked="useRoller">使用卷帘</a-checkbox>
    <!-- <div v-show="useRoller" :tree-data="treeDatas"></div> -->
    <div id="verticalSliderLeft" ref="verticalSliderLeft"></div>
    <div id="verticalSliderRight" ref="verticalSliderRight"></div>
    <div id="horizontalSliderTop" ref="horizontalSliderTop"></div>
    <div id="horizontalSliderBottom" ref="horizontalSliderBottom"></div>
  </Panel>
</template>

<script>
import roller from "./roller.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dRoller",
  components: {
    Panel,
  },
  props: {
    //卷帘模式
    rollerMode: {
      type: String,
    },
  },
  setup(props) {
    let {
      useRoller,
      rollerMode,
      lrRoller,
      tbRoller,
      TreeDatas,
      tree,
      checkNode,
      verticalSliderLeft,
      verticalSliderRight,
      horizontalSliderTop,
      horizontalSliderBottom,
    } = roller(props);
    return {
      useRoller,
      rollerMode,
      lrRoller,
      tbRoller,
      TreeDatas,
      tree,
      checkNode,
      verticalSliderLeft,
      verticalSliderRight,
      horizontalSliderTop,
      horizontalSliderBottom,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>