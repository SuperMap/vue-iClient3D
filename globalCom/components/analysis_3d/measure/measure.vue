<template>
  <Panel :pWidth="200">
    <div class="sm-global-row">
      <span class="sm-global-row-title">模式</span>
      <a-select class="sm-global-select" v-model:value="measureMode">
        <a-select-option value="Space">空间量算</a-select-option>
        <a-select-option value="Ground">贴地量算</a-select-option>
        <a-select-option value="CGCS2000">CGCS2000</a-select-option>
        <a-select-option value="XIAN80">XIAN80</a-select-option>
        <a-select-option value="WGS84">WGS84</a-select-option>
        <a-select-option value="null">平面投影</a-select-option>
      </a-select>
    </div>
    <div class="sm-measure-tool">
      <button
        @click="distanceClk"
        :disabled="measureMode === 'null'"
        :class="measureMode === 'null' ? 'sm-measure-disabled-color' : ''"
      >
        <i class="iconfont iconkongjianjuli" title="测距"></i>
      </button>
      <button
        @click="heightClk"
        :disabled="measureMode != 'Space' && measureMode != 'Ground'"
        :class="
          measureMode != 'Space' && measureMode != 'Ground'
            ? 'sm-measure-disabled-color'
            : ''
        "
      >
        <i class="iconfont icongaoduceliang" title="测高"></i>
      </button>
      <button @click="areaClk">
        <i class="iconfont iconkongjianmianji" title="测面"> </i>
      </button>
      <button @click="clear">
        <i class="iconfont iconqingchu" title="清除"></i>
      </button>
    </div>
  </Panel>
</template>

<script>
import measure from "./measure.js";
import Panel from "../../../common/panel/panel.vue";
export default {
  name: "Sm3dMeasure",
  components: {
    Panel,
  },
  setup(props) {
    let {
      measureMode, //测量模式
      isShowDVH, //显示勾选界面
      interval, //等值线距
      isShowLine, //显示等高线
      distanceClk, //点击测距函数
      areaClk, //点击测面
      heightClk, //点击测高
      clear, //清除
    } = measure(props);

    return {
      measureMode, //测量模式
      isShowDVH, //显示勾选界面
      interval, //等值线距
      isShowLine, //显示等高线
      distanceClk,
      areaClk,
      heightClk,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  border-radius: 4px;
  box-sizing: border-box;
  background: 0 0;
  border: 1px solid #9999;
  border: none;
  margin-top: 6px;
}
i {
  font-size: 26px;
}
.sm-measure-disabled-color {
  color: #d4d4d4;
  cursor: none;
}
.sm-measure-tool {
  display: flex;
  justify-content: space-between;
}
</style>