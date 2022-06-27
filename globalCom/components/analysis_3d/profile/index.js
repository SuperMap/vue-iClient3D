// 导入组件，组件必须声明 name
import profile from './profile.vue'

// 为组件添加 install 方法，用于按需引入
profile.install = function (app) {
  app.component(profile.name, profile)
}

export default profile