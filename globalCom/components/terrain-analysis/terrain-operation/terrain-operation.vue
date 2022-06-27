<template>
  <Panel :pWidth="230" :pHeight="150">
    <a-radio-group v-model:value="operationType" class="sm-global-row">
      <a-radio value="dig">地形开挖</a-radio>
      <a-radio value="modify">地形修改</a-radio>
    </a-radio-group>
    <div class="sm-to-dig" v-show="operationType==='dig'">
      <span>开挖深度</span>
      <a-input-number
        class="sm-global-input-number"
        v-model:value="digDepth"
        :min="0"
      />
    </div>
    <!-- <a-checkbox v-model:checked="isEdit">编辑</a-checkbox>
    <a-checkbox v-model:checked="isEditZ" v-show="operationType === 'modify'"
      >编辑Z轴</a-checkbox
    > -->
    <div class="sm-global-button" v-show="operationType === 'modify'">
      <a-button size="small" @click="modifyTerrain">修改</a-button>
      <a-button size="small" @click="clearModify">清除</a-button>
    </div>
    <div class="sm-global-button" v-show="operationType === 'dig'">
      <a-button size="small" @click="digTerrain">开挖</a-button>
      <a-button size="small" @click="clearDig">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import terrainOperation from "./terrain-operation.js";
import { ref } from "vue";

export default {
  name: "Sm3dTerrainOperation",
  components: {
    Panel,
  },
  props: {
    //挖掘深度
    digDepth: {
      type: Number,
      default: 500,
    },
    //初始化传入挖掘区域
    digPositions: {
      type: Array,
    },
    //初始化传入修改区域
    modifyPositions: {
      type: Array,
    },
    //是否编辑
    isEdit: {
      type: Boolean,
      default: false,
    },
    //是否编辑Z轴
    isEditZ: {
      type: Boolean,
      default: false,
    },
    //是否显示绘制后的线
    lineVisible: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    let {
      digDepth,
      isEdit,
      isEditZ,
      terrainVisible,
      digTerrain,
      clearDig,
      modifyTerrain,
      clearModify,
      operationType,
    } = terrainOperation(props);
    return {
      digDepth,
      isEdit,
      isEditZ,
      terrainVisible,
      digTerrain,
      clearDig,
      modifyTerrain,
      clearModify,
      operationType,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-radio-group {
  display: flex;
  justify-content: space-between;
}
.sm-to-dig {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 16px;
}
.sm-to-button {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>