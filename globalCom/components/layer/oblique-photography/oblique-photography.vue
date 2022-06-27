<template>
  <Panel :pWidth="250">
    <div class="sm-global-row">
      <span>选择图层</span>
      <a-select v-model:value="selectedLayerName">
        <a-select-option
          v-for="(layer, index) in layerNames"
          :key="index"
          :value="layer"
        >
          {{ layer }}
        </a-select-option>
        <a-select-option v-show="layerNames.length == 0" value="none">
          暂无s3m图层
        </a-select-option>
      </a-select>
    </div>
    <a-radio-group v-model:value="operationType" class="sm-global-row">
      <a-radio value="Excavation">开挖</a-radio>
      <a-radio value="Flatten">压平</a-radio>a-
    </a-radio-group>
    <!-- 开挖 -->
    <div class="sm-global-button" v-show="operationType === 'Excavation'">
      <a-button @click="startExcavation">开挖</a-button>
      <a-button @click="clearExcavation">清除</a-button>
    </div>
    <!-- 压平 -->
    <div class="sm-global-button" v-show="operationType === 'Flatten'">
      <a-button @click="startFlatten"> 压平 </a-button>
      <a-button @click="clearFlatten">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import photography from "./oblique-photography.js";
import { ref } from "vue";
export default {
  name: "Sm3dObliquePhotography",
  components: {
    Panel,
  },
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String,
    },
    //操作类型
    operationType: {
      type: String,
    },
    //初始化传入挖掘区域
    excavationPositions: {
      type: Array,
    },
    //初始化传入压平区域
    flattenPositions: {
      type: Array,
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    let {
      layerNames,
      selectedLayerName,
      operationType,
      startExcavation, //开始挖掘
      clearExcavation,
      startFlatten, //开始压平
      clearFlatten, //清除压平
    } = photography(props);
    return {
      layerNames,
      selectedLayerName,
      operationType,
      startExcavation, //开始挖掘
      clearExcavation,
      startFlatten, //开始压平
      clearFlatten, //清除压平
    };
  },
};
</script>

<style lang="scss" scoped>
</style>