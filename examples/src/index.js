// 范例打包入口文件

import App from './App.vue'
const app = Vue.createApp(App);
app.config.productionTip = false;

// 第三方库ui：CDN全局引入
app.use(ElementPlus);

// 引入样式
import './style/css/example.scss'


// 判断访问协议解决跨域问题（支持网站http和https访问）
var ishttps = 'https:' == document.location.protocol ? true: false;
if(ishttps){
    addMeta("Content-Security-Policy","upgrade-insecure-requests")
}


// CDN引入组件库注册
let dom = document.getElementById('loadSuperMap3D');
dom.onload  = ()=>{
    app.use(webgl3d)
}

app.mount('#app')


function addMeta(http_equiv,content){//手动添加mate标签
    let meta = document.createElement('meta');
    meta.httpEquiv=http_equiv;
    meta.content=content;
    document.getElementsByTagName('head')[0].appendChild(meta);
}