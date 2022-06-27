<template>
  <div
    v-drag
    class="sm-panel"
    :style="{ width: pWidth + 'px' }"
  >
    <div v-stopdrag>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {} from "vue";
export default {
  name: "Sm3dPanel",
  components: {},
  props: {
    // pHeight: {
    //   type: Number,
    //   default: 100,
    // },
    pWidth: {
      type: Number,
      default: 100,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sm-panel {
  border-radius: 4px;
  box-shadow: 2px 2px 6px rgb(26 26 26 / 50%);
  background-color: rgb(249, 249, 249);
  color: #000;
  padding: 15px;
  box-sizing: border-box;
  position: absolute;
  right: 50%;
  top: 10%;
  /* font-size: 14px; */
}
</style>