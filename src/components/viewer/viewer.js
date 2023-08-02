
import { addScene, addS3mLayers } from "../../js/common/layerManagement.js"
import { actions, storeDate } from '../../js/store/store.js'   //局部状态管理
import EventManager from '../../js/common/eventManager/EventManager.js'   //事件管理
import { onBeforeUnmount } from 'vue'
import createTooltip from '../../js/tool/tooltip2.js'
import resource from '../../js/local/lang.js'  //语言资源
//初始化地球 
function initViewer(props, callback) {
  //初始化viewer
  if (window.viewer) {
    // window.viewer.destroy();
    window.viewer = null;
    // return;
  }
  let viewer;
  let isPCBroswer = (window.isPCBroswer = SuperMap3D.FeatureDetection.isPCBroswer());
  if (isPCBroswer) {
    viewer = new SuperMap3D.Viewer("SuperMap3DContainer", {
      timeline: true,
      baseLayerPicker: false,
      imageryProvider: false, //必须为false - 关闭默认球皮（影像图层）
      navigation: false,
      animation: false, // 动画小组件
      infoBox: false, // 信息框
      //开启Webgl2.0
      contextOptions: {
        //硬件反走样，1-8，默认值为1
        msaaLevel: 8,
        requestWebgl2: true
      },
      //不能开启
      shadows: false,
      // timeline: true,
      //  UE阴影 设置为false，使用原来的软阴影效果；设置为true，实现了新的阴影算法，可以大幅度提升阴影边界的质量，看起来会非常柔和，没有锯齿。这个设置webgl2.0默认开启了。
      pcss: true,
      shadowQuality: 0,
  
      creditContainer: document.createElement('div'), //去掉底部logo
    });
    // 太阳光默认打开
    // viewer.scene.globe.enableLighting = true;
    //隐藏时间线控件
  // 隐藏时间线控件
  let timelineDom = document.getElementsByClassName(
    "supermap3d-viewer-timelineContainer"
  )[0];
  timelineDom.style.visibility = "hidden";
  } else {
    // 手机端
    viewer = new SuperMap3D.Viewer("SuperMap3DContainer", {
      selectionIndicator: false,
      infoBox: false,
      skyBox: false,
      navigation: false,
      contextOptions: {
        requestWebgl2: true
      }
    });
    let scene = viewer.scene;
    if (SuperMap3D.defined(scene.sun)) {
      scene.globe.enableLighting = false;
    }
    if (SuperMap3D.defined(scene.moon)) {
      scene.moon.show = false;
    }
    document.documentElement.style.height = window.innerHeight + "px";
    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }

  viewer.scene.debugShowFramesPerSecond = true; //帧率
  viewer.scene.globe.baseColor = SuperMap3D.Color.BLACK; // 没有影像图层时地球的底色
  // viewer.scene.globe.depthTestAgainstTerrain = false; //地形深度
  window.viewer = viewer;
  window.scene = viewer.scene;
  scene.moon.show = false;
  viewer.eventManager = new EventManager(viewer);  //添加事件管理派发
  let widget = viewer.SuperMap3DWidget;
  actions.setIsViewer(true);  //初始化viewer标志 
  if (viewer.geocoder) {
    // 请开发者自行到supermap online官网（http://www.supermapol.com/）申请key
    viewer.geocoder.viewModel.geoKey = "fvV2osxwuZWlY0wJb8FEb2i5";
    // document.querySelector(".SuperMap3D-geocoder-input").placeholder =
    //   Resource.searchPlaceHolder;  //语言配置，后面维护
  }
  if (!window.tooltip) {
    window.tooltip = createTooltip(viewer._element);
  }

  function openingAnimation() {
    viewer.camera.flyTo({
      destination: new SuperMap3D.Cartesian3(
        6788287.844465209,
        -41980756.10214644,
        29619220.04004376
      ),
      duration: 0,
      complete: function () {
        viewer.camera.flyTo({
          destination: new SuperMap3D.Cartesian3.fromDegrees(
            110.60396458865515,
            34.54408834959379,
            30644793.325518917
          ),
          duration: 5,
        });

      },
    });
  }

  // 添加图层
  try {
    if (props && props.openingAnimation) {
      openingAnimation();
    }
    if (props && props.afterInitviewer) {
      props.afterInitviewer();
    }
    if (props && props.sceneUrl) {
      addScene(props.sceneUrl, {}, (layer) => {
       
      });
    }
    if (props && props.s3mScps) {
      addS3mLayers(props.s3mScps);
    }
  } catch (e) {
    if (widget._showRenderLoopErrors) {
      let title = resource.showRenderLoopErrors;
      widget.showErrorPanel(title, undefined, e);
    }
  };

  // 销毁
  onBeforeUnmount(() => {
    viewer.destroy();
    window.viewer = undefined;
    window.scene = undefined;
  })
};

export default initViewer;