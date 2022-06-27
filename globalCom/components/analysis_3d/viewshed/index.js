// 导入组件，组件必须声明 name
import viewshed from './viewshed.vue'

// 为组件添加 install 方法，用于按需引入
viewshed.install = function (app) {
  app.component(viewshed.name, viewshed)
}

export default viewshed