// 导入组件，组件必须声明 name
import clipPolygon from './clip-polygon.vue'

// 为组件添加 install 方法，用于按需引入
clipPolygon.install = function (app) {
  app.component(clipPolygon.name, clipPolygon)
}

export default clipPolygon