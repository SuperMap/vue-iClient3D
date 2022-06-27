<template>
  <Panel :pWidth="150" >
    <a-checkbox v-model:checked="profile2d">剖面信息</a-checkbox>
    <div class="sm-global-button">
      <a-button size="small" @click="analysis" 
        >分析</a-button
      >
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
  <div ref="echarts_box" id="echarts_box" v-show="profile2d"></div>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
import profile from "./profile.js";
export default {
  name: "Sm3dProfile",
  components: {
    Panel,
  },
  props: {
    //显示剖面分析结果
    profile2d: {
      type: Boolean,
      default: false,
    },
    //贴线颜色
    polylineColor: {
      type: String,
      default: "rgb(250, 213, 6)",
    },
    //贴线宽度
    polylineWidth: {
      type: Number,
      default: 5,
    },
    //初始化自定义echarts配置对象
    initEchartsOption: {
      type: Object,
    },
    //自定义更新echarts配置对象
    updateEchartsOption: {
      type: Object,
    },
  },
  setup(props) {
    let { profile2d, analysis, clear, echarts_box } = profile(props);
    return {
      profile2d,
      analysis,
      clear,
      echarts_box,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-button {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>