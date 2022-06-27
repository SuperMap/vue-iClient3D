<template>
  <Panel :pWidth="200">
    <a-tree :tree-data="TreeDatas" ref="tree" @check="checkNode"></a-tree>
  </Panel>
  <div id="contextmenu" ref="domContextmenu">
    <!-- <span>图层属性</span><br>
          <span>图层风格</span><br>
    <span>图层操作</span><br>-->
    <span @click="deleteLayer" style="color: red">清除</span>
  </div>
</template>

<script>
import Panel from "../../../common/panel/panel.vue";
import management from "./layer-manage.js";
export default {
  name: "Sm3dLayerManage",
  components: {
    Panel,
  },
  props: {
    //删除图层回调，返回删除的树节点
    deleteCallback: {
      type: Function,
    },
  },
  setup(props) {
    let {
      nodeContextmenu, //节点右键点击事件
      nodeClick, //节点左键点击事件
      TreeDatas, //树数据
      tree, //树节点
      domContextmenu, //右键弹出操作框节点
      checkNode, //勾选事件
      deleteLayer, //删除事件
      expandedKeys, //默认展开keys数组
    } = management(props);
    return {
      nodeContextmenu,
      nodeClick,
      TreeDatas,
      tree,
      domContextmenu,
      checkNode,
      deleteLayer,
      expandedKeys,
    };
  },
};
</script>

