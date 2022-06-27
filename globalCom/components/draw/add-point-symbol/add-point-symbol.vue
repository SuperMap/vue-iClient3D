<template>
  <Panel :pWidth="290" >
    <div class="sm-global-row">
      <span>符号类型</span>
      <a-select v-model:value="selectedTypeId" class="sm-global-select">
        <a-select-option
          v-for="model in s3mModels"
          :key="model.id"
          :value="model.id"
        >
          {{ model.name }}
        </a-select-option>
      </a-select>
    </div>

    <div class="sm-aps-box">
      <div
        v-for="(model, index) in s3mModels[selectedTypeId].data"
        :key="model.id"
        :title="model.name"
        class="sm-aps-box-item"
        :class="{ 'sm-aps-theme-border-color': model.id === selectedSymbolId }"
        @click="changeSelect(index)"
      >
        <img :src="model.thumbnail" alt v-show="model.name" />
      </div>
    </div>
    <div class="sm-global-row">
      <span>符号颜色</span>
      <input type="color" v-model="symbolColor" class="sm-global-color" />
    </div>
    <div class="sm-global-row">
      <span>添加模式</span>
      <a-select v-model:value="addType" class="sm-global-select">
        <a-select-option value="single">单个添加</a-select-option>
        <a-select-option value="line">沿线添加</a-select-option>
        <a-select-option value="face">区域添加</a-select-option>
      </a-select>
    </div>

    <div class="sm-global-button">
      <a-button size="small" @click="statrtAdd">添加</a-button>
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import addPointSymbol from "./add-point-symbol.js";
import Panel from "../../../common/panel/panel.vue";
import { ref } from "vue";
export default {
  name: "Sm3dPointSymbol",
  components: {
    Panel,
  },
  props: {
    // 选中符号类型id
    selectedTypeId: {
      type: Number,
    },
    // 符号颜色
    symbolColor: {
      type: String,
    },
    // 直线种树间距
    space: {
      type: Number,
    },
    // 区域种树总数
    density: {
      type: Number,
    },
  },
  setup(props) {
    let {
      s3mModels,
      selectedTypeId,
      selectedSymbolId,
      symbolColor,
      changeSelect,
      space,
      density,
      clear,
      statrtAdd,
      addType,
    } = addPointSymbol(props);
    return {
      s3mModels,
      selectedTypeId,
      selectedSymbolId,
      symbolColor,
      changeSelect,
      space,
      density,
      clear,
      statrtAdd,
      addType,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-aps-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
  .sm-aps-box-item {
    width: 20%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.sm-aps-theme-border-color {
  border: 1px solid #3499e5;
  border-radius: 4px;
}
</style>