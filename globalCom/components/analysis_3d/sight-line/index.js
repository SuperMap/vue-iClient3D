// 导入组件，组件必须声明 name
import sightLine from './sight-line.vue'

// 为组件添加 install 方法，用于按需引入
sightLine.install = function (app) {
  app.component(sightLine.name, sightLine)
}

export default sightLine