// 导入组件，组件必须声明 name
import openness from './openness.vue'

// 为组件添加 install 方法，用于按需引入
openness.install = function (app) {
  app.component(openness.name, openness)
}

export default openness