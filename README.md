# <center>vue-iClient3D</center>

# 简介
### 特点：
- 采用当前Vue3升级组件，相比原来有更快的速度和更好的性能
- 实现了界面与功能分离，可以更灵活的适用于各种应用场景
- 全面的开源组件源码，可以更容易的理解和修改等二次开发，轻松实现自定义组件。

### 示例：https://www.supermapol.com/earth/vue-iClient3D/index.html

#### Vue目前提供的组件可以参考示例项目中，如您在使用过程中遇到问题，或更好的使用建议，欢迎提issues，开发人员看到会及时给予处理

# 快速使用
#### Vue工程，NPM 安装：

``` bash
npm install vue-iclient3d --save
```

##### 1、修改index.html文件：

- 在index.html里引入SuperMap3D等资源文件。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://www.supermapol.com/earth/SuperMap3D/SuperMap3D.js"></script>
  <title>webgl3d</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

##### 2、修改main.js文件：

``` js

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
 
// 引入ui依赖
import {
  Button,
  Layout,
  Checkbox,
  Switch,
  Radio,
  Spin,
  Menu,
  Dropdown,
  Input,
  Select,
  Timeline,
  InputNumber,
  Slider
} from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';
app.use(Button)
    .use(Timeline)
    .use(Layout)
    .use(Radio)
    .use(Menu)
    .use(Input)
    .use(Spin)
    .use(Select)
    .use(Dropdown)
    .use(Switch)
    .use(Checkbox)
    .use(InputNumber)
    .use(Slider);
    
// 引入vue-iclient3d组件包
import webgl3d from 'vue-iclient3d'
import 'vue-iclient3d/lib/index.css'
app.use(webgl3d)  
app.mount('#app')

```

##### 3、在App.vue里测试使用量算功能组件：

``` vue
<template>
  <sm3d-viewer scene-url="http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace">
    <sm3d-measure></sm3d-measure>
  </sm3d-viewer>
</template>
<script>
```




