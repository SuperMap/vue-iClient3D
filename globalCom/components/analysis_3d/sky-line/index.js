// 导入组件，组件必须声明 name
import skyLine from './sky-line.vue'

// 为组件添加 install 方法，用于按需引入
skyLine.install = function (app) {
  app.component(skyLine.name, skyLine)
}

export default skyLine