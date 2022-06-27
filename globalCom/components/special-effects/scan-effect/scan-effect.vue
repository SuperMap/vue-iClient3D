<template>
  <Panel :pWidth="300" :pHeight="130">
    <div class="sm-global-row">
      <span>扫描模式</span>
      <a-radio-group v-model:value="scanMode" name="radioGroup">
        <a-radio value="lineMode">现状扫描</a-radio>
        <a-radio value="ringMode">环状扫描</a-radio>
      </a-radio-group>
    </div>
    <div class="sm-global-row">
      <span>扫描纹理</span>
      <a-select v-model:value="selectedTextureIndex" class="sm-sc-select">
        <a-select-option
          :value="index"
          :key="index"
          v-for="(texture, index) in scanTextures"
        >
          {{ texture.name }}
        </a-select-option>
      </a-select>
    </div>
    <div class="sm-global-button">
      <a-button size="small" @click="addScans"
        >添加</a-button
      >
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import scanEffect from "./scan-effect";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  components: {
    Panel,
  },
  name: "Sm3dScanEffect",
  props: {
    //扫描线模式lineMode/ringMode
    scanMode: {
      type: String,
    },
    scanColor: {
      type: String,
    },
    selectedTextureIndex: {
      type: Number,
    },
    //开启反光
    bloomShow: {
      type: Boolean,
    },
    //开启HDR
    openHDR: {
      type: Boolean,
    },
    //亮度阈值
    threshold: {
      type: Number,
    },
    //泛光强度
    intensity: {
      type: Number,
    },
    //获取或设置线状扫描线的宽度，单位：米。
    lineWidth: {
      type: Number,
    },
    //获取或设置扫描线的运行周期，单位：秒。
    period: {
      type: Number,
    },
    //获取或设置扫描线的运行速度，单位：米/秒。
    speed: {
      type: Number,
    },
    //添加纹理[{name:纹理1,type:'line / ring',url:xxx}]
    addTextures: {
      type: Object,
    },
    scanShow: {
      type: Boolean,
    },
  },
  setup(props) {
    let { scanMode, scanTextures, selectedTextureIndex, addScans, clear } =
      scanEffect(props);

    return { scanMode, scanTextures, selectedTextureIndex, addScans, clear };
  },
};
</script>

<style lang="scss" scoped>
.sm-sc-select {
  width: 190px;
}
</style>