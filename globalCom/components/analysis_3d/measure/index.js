// 导入组件，组件必须声明 name
import measure from './measure.vue'

// 为组件添加 install 方法，用于按需引入
measure.install = function (app) {
  app.component(measure.name, measure)
}

export default measure