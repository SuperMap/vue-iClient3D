import { createApp } from 'vue'
// 注册antd
import { registerApp } from './registerCom'
import App from './App.vue'

// 引入组件  sm3dComponents 为一个对象，所有的组件都挂载这个上面
import sm3dComponents from 'components-npm-vue3-test'
import 'components-npm-vue3-test/lib/webgl3d.css'
const app = createApp(App)
// 注册antd
registerApp(app)
app.use(sm3dComponents)
console.log('sm3dComponents', sm3dComponents);
app.mount('#app')
// createApp(App).mount('#app')
