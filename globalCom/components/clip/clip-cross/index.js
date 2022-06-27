// 导入组件，组件必须声明 name
import clipCross from './clip-cross.vue'

// 为组件添加 install 方法，用于按需引入
clipCross.install = function (app) {
  app.component(clipCross.name, clipCross)
}

export default clipCross