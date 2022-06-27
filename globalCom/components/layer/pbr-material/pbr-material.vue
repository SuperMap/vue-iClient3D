<template>
  <Panel :pWidth="200" :pHeight="200">
    <div>
      <span>选择图层</span>
      <a-select
        v-model:value="selectedLayerName"
        style="width: 120px"
      >
        <option
          v-for="(layer, index) in layerNames"
          :key="index"
          :value="layer"
        >
          {{ layer }}
        </option>
        <option v-show="layerNames.length == 0" value="none">暂无图层</option>
      </a-select>
    </div>
    <div>
      <span>选择材质</span>
      <a-select  v-model:value="selectedPbr" style="width: 120px">
        <option
          v-for="(value, key, index) in pbrLibrary"
          :key="index"
          :value="key"
        >
          {{ value }}
        </option>
      </a-select>
    </div>
    <div class="sm-button-button">
      <a-button  size="small" @:click="addPBR"
        >开挖</a-button
      >
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import pbrMaterial from "./pbr-material.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dAddPbr",
  components: {
    Panel,
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String,
    },
  },
  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      pbrLibrary,
      selectedPbr,
      addPBR,
      clear,
    } = pbrMaterial(props);
    return {
      layerNames,
      selectedLayerName,
      pbrLibrary,
      selectedPbr,
      addPBR,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>