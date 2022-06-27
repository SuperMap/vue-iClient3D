<template>
  <Panel :pWidth="220" :pHeight="170">
    <div class="sm-global-row">
      <span>操作类型</span>
      <a-select v-model:value="operationType" class="sm-global-select">
        <a-select-option value="stretch_cut">拉伸与剖切</a-select-option>
        <a-select-option value="dig">开挖</a-select-option>
        <a-select-option value="drilling">转孔</a-select-option>
        <a-select-option value="clip">裁剪</a-select-option>
      </a-select>
    </div>
    <!-- 拉伸与剖切 -->
    <div v-show="operationType === 'stretch_cut'">
      <div class="sm-global-row">
        <span>拉伸系数</span>
        <a-input-number
          v-model:value="stretchHeight"
          :min="1"
          class="sm-global-input-number"
        />
      </div>
      <div class="sm-gb-button">
        <a-button  size="small" @click="drawLine"
          >画线</a-button
        >
        <a-button  size="small" @click="startCut"
          >剖切</a-button
        >
        <a-button size="small" @click="clearCut">清除</a-button>
      </div>
    </div>
    <!-- 开挖 -->
    <div v-show="operationType === 'dig'">
      <div class="sm-global-row">
        <span>开挖深度</span>
        <a-input-number
          v-model:value="digHeight"
          :min="1"
          class="sm-global-input-number"
        />
      </div>
      <div class="sm-gb-button">
        <a-button  size="small" @click="startDig"
          >开挖</a-button
        >
        <a-button size="small" @click="clearDig">清除</a-button>
      </div>
    </div>
    <!-- 钻孔 -->
    <div v-show="operationType === 'drilling'">
      <div class="sm-global-row">
        <span>钻孔半径</span>
        <a-input-number
          v-model:value="drillRadius"
          :min="1"
          class="sm-global-input-number"
        />
      </div>
      <div class="sm-global-row">
        <span>钻孔深度</span>
        <a-input-number
          v-model:value="drillHeight"
          :min="1"
          class="sm-global-input-number"
        />
      </div>
      <div class="sm-gb-button">
        <a-button  size="small" @click="startDrilling"
          >钻孔</a-button
        >
        <a-button size="small" @click="clearDrilling">清除</a-button>
      </div>
    </div>
    <!-- 裁剪 -->
    <div v-show="operationType === 'clip'">
      <!-- <a-radio-group v-model:value="clipType" name="radioGroup">
        <a-radio value="drawClip">绘制裁剪</a-radio>
        <a-radio value="boxClip">Box裁剪</a-radio>
      </a-radio-group> -->
      <div class="sm-global-row">
        <span>裁剪模式</span>
        <a-select ref="select" v-model:value="drawClipMode">
          <a-select-option value="KeepInside">裁剪外部</a-select-option>
          <a-select-option value="KeepOutside">裁剪内部</a-select-option>
        </a-select>
      </div>
      <div class="sm-gb-button">
        <a-button  size="small" @click="startClip"
          >裁剪</a-button
        >
        <a-button size="small" @click="clearClip">清除</a-button>
      </div>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import geologicalBody from "./geological-body.js";
export default {
  name: "Sm3dGeologicalBody",
  components: {
    Panel,
  },
  setup(props) {
    let {
      operationType,
      stretchHeight,
      drawLine,
      startCut,
      clearCut,
      digHeight,
      startDig,
      clearDig,
      startDrilling,
      clearDrilling,
      drillHeight,
      drillRadius,
      startClip,
      clearClip,
      clipType,
      drawClipMode,
    } = geologicalBody(props);
    return {
      operationType,
      stretchHeight,
      drawLine,
      startCut,
      clearCut,
      digHeight,
      startDig,
      clearDig,
      startDrilling,
      clearDrilling,
      drillHeight,
      drillRadius,
      startClip,
      clearClip,
      clipType,
      drawClipMode,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-gb-button {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>