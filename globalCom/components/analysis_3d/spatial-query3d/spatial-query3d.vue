<template>
  <Panel :pWidth="300">
    <div class="sm-global-row">
      <span>缩放</span>
      <a-slider
        v-model:value="scale"
        :min="0.2"
        :max="10"
        :step="0.2"
        class="sm-global-slider"
      />
    </div>
    <div class="sm-global-row">
      <span>查询图层</span>
      <a-select v-model:value="selectedLayerName" class="sm-global-select">
        <a-select-option
          v-for="(layer, index) in layerNames"
          :key="index"
          :value="layer"
        >
          {{ layer }}
        </a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>位置模式</span>
      <a-select v-model:value="positionMode" class="sm-global-select">
        <a-select-option value="intersects">相交</a-select-option>
        <a-select-option value="disjoint">相离</a-select-option>
        <a-select-option value="contains">包含</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <span>Box填充颜色</span>
      <input type="color" v-model="FillColor" class="sm-global-color" />
    </div>
    <div class="sm-global-row">
      <span>Box线框颜色</span>
      <input type="color" v-model="WireFrameColor" class="sm-global-color" />
    </div>
    <div class="sm-global-row">
      <span>查询结果颜色</span>
      <input type="color" v-model="searchColor" class="sm-global-color" />
    </div>
    <div class="sm-global-button">
      <a-button size="small" @click="analysis">查询</a-button>
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import spatialQuery3d from "./spatial-query3d.js";
export default {
  name: "Sm3dSpatialQuery3d",
  props: {
    //默认选择图层名称
    selectedLayerName: {
      type: String,
    },
    //x旋转
    Xpitch: {
      type: Number,
    },
    //y旋转
    Yroll: {
      type: Number,
    },
    //z旋转
    Zheading: {
      type: Number,
    },
    //缩放
    scale: {
      type: Number,
    },
    //位置模式
    positionMode: {
      type: String,
    },
    //选择模型类型
    geometryType: {
      type: String,
    },
    //模型显示类型
    drawType: {
      type: String,
    },
    //模型填充颜色
    FillColor: {
      type: String,
    },
    //模型线框颜色
    WireFrameColor: {
      type: String,
    },
    //查询结果颜色
    searchColor: {
      type: String,
    },
    //设置长方体类型参数
    boxParameters: {
      type: Array,
    },
    //设置球体类型参数
    sphereParameters: {
      type: Array,
    },
    //设置圆锥类型参数
    coneParameters: {
      type: Array,
    },
    //设置圆柱类型参数
    cylinderParameters: {
      type: Array,
    },
    //设置椭圆类型参数
    ellicpseParameters: {
      type: Array,
    },
    //圆锥绕点旋转方式
    rotateOrigin: {
      type: String,
    },
    //表格选中id
    selectIds: {
      type: Array,
    },
  },
  components: {
    Panel,
  },
  setup(props) {
    let {
      scale,
      selectedLayerName,
      layerNames,
      positionMode,
      GeometryBodyNames,
      geometryType,
      analysis,
      clear,
      FillColor,
      WireFrameColor,
      searchColor,
      showTable,
      atributesData,
      selectIds,
    } = spatialQuery3d(props);

    function getIDs(ids) {
      selectIds.value = ids;
    }

    return {
      scale,
      selectedLayerName,
      layerNames,
      positionMode,
      GeometryBodyNames,
      geometryType,
      analysis,
      clear,
      FillColor,
      WireFrameColor,
      searchColor,
      showTable,
      atributesData,
      getIDs,
    };
  },
};
</script>



