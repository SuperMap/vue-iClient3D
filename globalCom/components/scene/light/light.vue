<template>
  <Panel :pWidth="200" :pHeight="200">
    <div>点光源，聚光灯，平行光</div>

    <div>
      扩散距离
      <div>
        <a-slider v-model:value="inputValue1" :min="1" :max="20" />
        <a-input-number
          v-model:value="inputValue1"
          :min="1"
          :max="20"
          style="margin-left: 16px"
        />
      </div>
    </div>

    <div>
      衰减因子
      <div>
        <a-slider v-model:value="inputValue1" :min="1" :max="20" />
        <a-input-number
          v-model:value="inputValue1"
          :min="1"
          :max="20"
          style="margin-left: 16px"
        />
      </div>
    </div>

    <div>
      光源强度
      <div>
        <a-slider v-model:value="inputValue1" :min="1" :max="20" />
        <a-input-number
          v-model:value="inputValue1"
          :min="1"
          :max="20"
          style="margin-left: 16px"
        />
      </div>
    </div>

    <div>
      <a-checkbox-group v-model:value="value" style="width: 100%">
        <a-checkbox value="A">光源模型</a-checkbox>
        <a-checkbox value="A">光源坐标</a-checkbox>
      </a-checkbox-group>
    </div>

    <a-input-number
      v-model:value="inputValue1"
      :min="1"
      :max="20"
      style="margin-left: 16px"
    />

    <div class="sm-global-button">
      <a-button size="small">添加</a-button>
      <a-button size="small">清除</a-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import {  ref } from "vue";
export default {
  components: {
    Panel,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>