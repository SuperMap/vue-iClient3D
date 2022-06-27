// 导入组件，组件必须声明 name
import clipBox from './clip-box.vue'

// 为组件添加 install 方法，用于按需引入
clipBox.install = function (app) {
  app.component(clipBox.name, clipBox)
}

export default clipBox