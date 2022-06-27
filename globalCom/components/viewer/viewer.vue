<template>
  <div id="Container">
    <slot></slot>
  </div>
</template>

<script >
import initGlobe from "./viewer.js";
import { ref, onMounted } from "vue";

export default {
  name: "Sm3dViewer",
  props: {
    sceneUrl: {
      //场景接口
      type: String,
    },
    s3mScps: {
      //s3m图层接口
      type: Array,
    },
    afterInitviewer: {
      //初始化viewer后回调函数
      type: Function,
    },
    addLayerCallback: {
      //默认添加图层回调函数
      type: Function,
    },
    // openingAnimation: {
    //   //开场动画
    //   type: Boolean,
    //   default: false,
    // },
  },
  setup(props) {
    onMounted(() => {
      // console.log('SuperMap3D viewer', SuperMap3D.Viewer());
      initGlobe(SuperMap3D, props);
      openingAnimation();
      // 加载影像
      // scene.imageryLayers.addImageryProvider(
      //   new SuperMap3D.SuperMapImageryProvider({
      //     // url: "./images/GlobalBkLayer.jpg",
      //     url: "http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google",
      //   })
      // );
      // scene.imageryLayers.addImageryProvider(
      //   new SuperMap3D.BingMapsImageryProvider({
      //     key: 'AuY224ZCXZhjQ17Ywh2M7-5RhjJg2bEFEzIho3vWtxEDfXFshZsq4_FFJ2m1s1I3', //可至官网（https://www.bingmapsportal.com/）申请key,
      //     url: '//dev.virtualearth.net',
      //   })
      // );

      // 加载模式数据
      // scene.open(
      //   "http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace"
      // );
      // scene.terrainProvider = new SuperMap3D.SuperMapTerrainProvider({
      //   url: "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
      //   requestWaterMask: true,
      //   requestVertexNormals: true,
      //   isSct: false,
      // });
      // 设置相机视角
      // scene.camera.setView({
      //   destination: SuperMap3D.Cartesian3.fromDegrees(88.3648, 29.0946, 90000),
      //   orientation: {
      //     heading: 6.10547067016156,
      //     pitch: -0.8475077031996778,
      //     roll: 6.2831853016686185,
      //   },
      // });
      // BIM
      // scene.open('http://www.supermapol.com/realspace/services/3D-BIMbuilding/rest/realspace')
    });
    const openingAnimation = () => {
      scene.camera.flyTo({
        destination: new SuperMap3D.Cartesian3(
          6788287.844465209,
          -41980756.10214644,
          29619220.04004376
        ),
        duration: 0,
        complete: function () {
          scene.camera.flyTo({
            destination: new SuperMap3D.Cartesian3.fromDegrees(
              110.60396458865515,
              34.54408834959379,
              30644793.325518917
            ),
            duration: 5,
          });
        },
      });
    };
  },
};
</script>

<style lang="scss">
#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.widget {
  canvas {
    width: calc(100% - 0px) !important;
    height: calc(100vh - 60px) !important;
    overflow: hidden;
  }
}
</style>