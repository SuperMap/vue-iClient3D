// 引入iconfont
import './assets/iconfont/iconfont.css'
// 引入全局样式
import './css/global.scss'
// 引入拖拽
import initDrag from "./js/drag/drag.js"
// 通用组件
import Panel from './common/panel/index.js'
// 引入
import store from './js/store/store.js'
// 导入组件
import viewer from './components/viewer/index.js' // 球
// // 三维工具
import measure from './components/analysis_3d/measure/index.js' //量算
import openness from './components/analysis_3d/openness/index.js' // 通视分析
import sightLine from './components/analysis_3d/sight-line/index.js' // 通视分析
// import skyLine from './components/analysis_3d/sky-line/index.js' // 天际线
import profile from './components/analysis_3d/profile/index.js' // 剖面
import spatialQuery3d from './components/analysis_3d/spatial-query3d/index.js' // 三维空间查询
import viewshed from './components/analysis_3d/viewshed/index.js' // 可视域分析
// 地形分析
import terrainOperation from './components/terrain-analysis/terrain-operation/index.js' // 地形开挖
import terrainIsoline from './components/terrain-analysis/terrain-isoline/index.js' // 等值线
import terrainSlope from './components/terrain-analysis/terrain-slope/index.js' // 坡度坡向分析
import terrainFlood from './components/terrain-analysis/terrain-flood/index.js' // 淹没分析
// 裁剪
import clipBox from './components/clip/clip-box/index.js' // box裁剪
import clipCross from './components/clip/clip-cross/index.js' // cross裁剪
import clipPlane from './components/clip/clip-plane/index.js' // 平面裁剪
import clipPolygon from './components/clip/clip-polygon/index.js' // 多裁剪
// 图层
import s3mlayerAttribute from './components/layer/s3mlayer-attribute/index.js' // S3M图层属性设置
import s3mlayerStyle from './components/layer/s3mlayer-style/index.js' // S3M图层风格设置
import s3mlayerOperation from './components/layer/s3mlayer-operation/index.js' // S3M图层操作
import layerManage from './components/layer/layer-manage/index.js'
import imglayerAttribute from './components/layer/imglayer-attribute/index.js' // 
import obliquePhotography from './components/layer/oblique-photography/index.js' // 倾斜摄影模型操作
import pbrMaterial from './components/layer/pbr-material/index.js' // 倾斜摄影模型操作
// 场景
import splitScreen from './components/scene/split-screen/index.js' // 分屏
import roller from './components/scene/roller/index.js' // 卷帘
// 绘制
import drawLineSurface from './components/draw/draw-line-surface/index' // 绘制线面
// import addPointSymbol from './components/draw/add-point-symbol/index' // 添加小品
// 特效
import scanEffect from './components/special-effects/scan-effect/index.js' // 扫描
// 模型
import geologicalBody from './components/model/geological-body/index' // 模型 地质体
// 以数组的结构保存组件，便于遍历
const components = [
  Panel,
  viewer,
  measure,
  openness,
  sightLine,
  // skyLine,
  profile,
  spatialQuery3d,
  viewshed,
  terrainOperation,
  terrainIsoline,
  terrainSlope,
  terrainFlood,
  clipBox,
  clipCross,
  clipPlane,
  clipPolygon,
  s3mlayerAttribute,
  s3mlayerStyle,
  s3mlayerOperation,
  layerManage,
  imglayerAttribute,
  obliquePhotography,
  pbrMaterial,
  splitScreen,
  roller,
  drawLineSurface,
  // addPointSymbol,
  scanEffect,
  geologicalBody
]

// 定义 install 方法
const install = function (app) {
  initDrag(app)   //默认可拖拽
  console.log('组件中的app', app);
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => {
    app.component(component.name, component)
  })
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  // install(window.Vue)
  window.webgl3d = install;
  console.log('打包之前的window.webgl3d', window.webgl3d);
}

window.store = store;
export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components
}