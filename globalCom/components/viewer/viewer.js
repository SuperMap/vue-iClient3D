import { actions, storeDate } from "../../js/store/store.js"; //局部状态管理
import ScreenEventManage from "../../js/common/eventManager/EventManager.js";
function initGlobe(SuperMap3D, props) {
  const viewer = new SuperMap3D.Viewer("Container");
  let scene = viewer.scene;
  // 挂载注册屏幕事件
  scene.eventManager = new ScreenEventManage(
    scene,
    SuperMap3D.ScreenSpaceEventHandler,
    SuperMap3D.ScreenSpaceEventType
  );
  // 挂载_element
  scene._element = document.body;
  window.scene = scene;

  actions.setIsViewer(true); //初始化viewer标志

  // 添加图层
  try {
    if (props && props.afterInitviewer) {
      props.afterInitviewer();
    }
    if (props && props.sceneUrl) {
      scene.open(props.sceneUrl)
    }
    if (props && props.s3mScps) {
      // addS3mLayers(props.s3mScps, props.addLayerCallback);
      // scene.addS3MTilesLayerByScp(props.s3mScps[0].url, props.s3mScps[0].options.name)
      scene.addS3MTilesLayerByScp(props.s3mScps[0].url)
    }
  } catch (e) {
    console.log('错误信息', e);
  }
}

export default initGlobe