<template>
  <Panel :pWidth="250">
    <a-radio-group v-model:value="drawType" class="sm-global-row">
      <a-radio value="polyline">绘制线</a-radio>
      <a-radio value="polygon">绘制面</a-radio>
    </a-radio-group>
    <div class="sm-global-row">
      <span>绘制模式</span>
      <a-select v-model:value="drawModle" style="width: 120px">
        <a-select-option value="space">空间模式</a-select-option>
        <a-select-option value="stick">贴地模式</a-select-option>
        <a-select-option value="postObject">贴对象模式</a-select-option>
      </a-select>
    </div>
    <div class="sm-global-row">
      <a-checkbox v-model:checked="isEdit">编辑</a-checkbox>
      <a-checkbox v-model:checked="isEditZ">编辑Z轴</a-checkbox>
    </div>
    <!-- 线整体 -->
    <div v-show="drawType === 'polyline'">
      <div class="sm-dl-box">
        <div
          v-for="line in config.polyline"
          :key="line.id"
          class="sm-dl-line-item"
          :class="{ 'sm-dl-theme-color': line.id === currentId }"
          @click="changeSelect(line.id)"
        >
          <span class="iconfont" :class="line.iconfont"></span>
          <span>{{ line.lineName }}</span>
        </div>
      </div>
      <div class="sm-global-row">
        <span>线颜色</span>
        <input type="color" v-model="lineColor" class="sm-global-color" />
      </div>
      <div class="sm-global-row">
        <span>线宽</span>
        <a-input-number
          v-model:value="lineWidth"
          :min="1"
          class="sm-global-input-number"
        />
      </div>
      <!-- 虚线 -->
      <div v-show="currentId === '2'">
        <div class="sm-global-row">
          <span>间隔颜色</span>
          <input type="color" v-model="dottedColor" class="sm-global-input-number" />
        </div>
        <div class="sm-global-row">
          <span>分量长度</span>
          <a-input-number v-model:value="dottedLength" :min="1"  class="sm-global-input-number"/>
        </div>
      </div>
      <!-- 轮廓线 -->
      <div v-show="currentId === '3'">
        <div class="sm-global-row">
          <span>轮廓颜色</span>
          <input type="color" v-model="outLineColor" class="sm-global-input-number" />
        </div>
        <div class="sm-global-row">
          <span>轮廓宽度</span>
          <a-input-number v-model:value="outLineWidth" :min="0" class="sm-global-input-number" />
        </div>
      </div>
      <!-- 光晕线 -->
      <div v-show="currentId === '5'" class="sm-global-row">
        <span>光晕强度</span>
        <a-input-number v-model:value="glowStrength" min="0" step="0.1" class="sm-global-input-number" />
      </div>
      <!-- 尾迹线 -->
      <div v-show="currentId === '6'" class="sm-global-row">
        <span>尾迹占比</span>
        <a-input-number v-model:value="trailPercentage" min="0" step="0.1" class="sm-global-input-number" />
      </div>
    </div>
    <!-- 面整体 -->
    <div v-show="drawType === 'polygon'">
      <div class="sm-dl-box">
        <div
          v-for="polygon in config.polygon"
          :key="polygon.id"
          class="sm-dl-line-item"
          :class="{ 'theme-color': polygon.id === currentId }"
          @click="changeSelect(polygon.id)"
        >
          <i class="iconfont" :class="polygon.iconfont"></i>
          <label>{{ polygon.faceName }}</label>
        </div>
      </div>

      <!-- 纯色 -->
      <div class="sm-global-row">
        <span>面颜色</span> 
        <input type="color" v-model="solidColor" class="sm-global-input-number" />
      </div>
      <!-- 网格 底层不支持 -->
      <!-- <div v-show="currentId === '2'">
        <div class="sm-global-row">
          <span>网格线宽</span>
          <a-input-number v-model:value="gridWidth" :min="1" class="sm-global-input-number" />
        </div>
        <div class="sm-global-row">
          <span>网格线数</span>
          <a-input-number v-model:value="gridWidth" :min="1"  class="sm-global-input-number"/>
        </div>
        <div class="sm-global-row">
          <span>网格线数</span>
          <a-input-number v-model:value="gridCellAlpha" :min="1" class="sm-global-input-number" />
        </div>
      </div> -->
      <!-- 条纹 底层不支持 -->
      <!-- <div v-show="currentId === '3'">
        <div class="sm-global-row">
          <span>偶数带颜色</span>
          <input type="color" v-model="stripeEvenColor" class="sm-global-color" />
        </div>
        <div class="sm-global-row">
          <span>基数带颜色</span>
          <input type="color" v-model="stripeOddColor" class="sm-global-color" />
        </div>
        <div class="sm-global-row">
          <span>带条重复数</span>
          <a-input-number v-model:value="stripeRepeat" :min="1" class="sm-global-input-number" />
        </div>
        <div class="sm-global-row">
          <span>带条偏移量</span>
          <a-input-number v-model:value="stripeOffset" :min="1" class="sm-global-input-number" />
        </div>
        <a-radio-group v-model:value="stripeOrientation" class="sm-global-row">
          <a-radio value="horizontal">裁剪内部</a-radio>
          <a-radio value="vertical">裁剪外部</a-radio>
        </a-radio-group>
      </div> -->
    </div>

    <div class="sm-global-button">
      <a-button size="small" @click="draw">绘制</a-button>
      <a-button size="small" @click="clear">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import drawline from "./draw-line-surface.js";
import { ref, watch } from "vue";
export default {
  name: "Sm3dDrawLinePolygon",
  components: {
    Panel,
  },
  setup(props) {
    let {
      drawModle,
      currentId,
      lineColor,
      lineWidth,
      config,
      draw,
      changeSelect,
      clear,
      isEdit,
      isEditZ,
      dottedColor, //间隔颜色
      dottedLength,
      outLineColor,
      outLineWidth,
      glowStrength,
      trailPercentage,
      drawType,
      solidColor,
      gridColor,
      gridWidth,
      gridCount,
      gridCellAlpha,
      stripeEvenColor,
      stripeOddColor,
      stripeRepeat,
      stripeOffset,
      stripeOrientation,
    } = drawline(props);


    return {
      drawModle,
      currentId,
      lineColor,
      lineWidth,
      config,
      draw,
      changeSelect,
      clear,
      isEdit,
      isEditZ,
      dottedColor, //间隔颜色
      dottedLength,
      outLineColor,
      outLineWidth,
      glowStrength,
      trailPercentage,
      drawType,
      solidColor,
      gridColor,
      gridWidth,
      gridCount,
      gridCellAlpha,
      stripeEvenColor,
      stripeOddColor,
      stripeRepeat,
      stripeOffset,
      stripeOrientation,
    };
  },
};
</script>

<style lang="scss" scoped>
.sm-dl-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid #999;
  border-radius: 4px;
  .sm-dl-line-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span:nth-child(1) {
      font-size: 24px;
    }
  }
}
.sm-global-color {
  margin-top: 10px;
}
.iconfont {
  cursor: pointer;
}
.sm-dl-theme-color {
  color: #3499e5;
}
</style>