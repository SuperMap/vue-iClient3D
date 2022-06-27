// 导入组件，组件必须声明 name
import panel from './panel.vue'

// 为组件添加 install 方法，用于按需引入
panel.install = function (app) {
  app.component(panel.name, panel)
}

export default panel