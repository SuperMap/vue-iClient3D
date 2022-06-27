# <center>vue-iClient3D</center>

# Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

```

注：项目存放文件夹路径中不能有中文字符，否则启动会有异常报错。


# 简介
### 特点：
- 采用当前Vue3升级组件，相比原来有更快的速度和更好的性能
- 实现了界面与功能分离，可以更灵活的适用于各种应用场景
- 全面的开源组件源码，可以更容易的理解和修改等二次开发，轻松实现自定义组件。

### 示例：https://www.supermapol.com/earth/vue-iClient3D/index.html


# 开发
#### Vue工程，NPM 安装：

``` bash
npm install vue-iclient3d --save-d
```

##### 1、修改main.js文件：

``` bash

import { createApp } from 'vue'
import App from './App.vue'

// 注册antd 需要映入的antd组件 请查看registerCom文件夹下的register-antdv.js
import { registerApp } from './registerCom'

// 引入打包之后的组件
import sm3dComponents from 'vue-iclient3d'
import 'vue-iclient3d/index.css'

const app = createApp(App)
// 注册antd
registerApp(app)
// 三维组件
app.use(sm3dComponents)
app.mount('#app')


```

##### 2、修改index.html文件：

- 在index.html里引入SuperMap3D等资源文件。

``` bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://www.supermapol.com/earth/SuperMap3D/SuperMap3D.js"></script>
  <title>vue-iclient3d</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

##### 3、在App.vue里测试使用量算功能组件：

``` bash
<template>
  <sm3d-viewer scene-url="http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace">
    <sm3d-measure></sm3d-measure>
  </sm3d-viewer>
</template>
<script>
```




