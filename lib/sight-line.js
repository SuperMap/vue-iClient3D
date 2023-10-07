import{reactive as e,toRefs as i,watch as r,onBeforeUnmount as t,resolveComponent as n,resolveDirective as o,withDirectives as a,openBlock as l,createBlock as s,createVNode as u,toDisplayString as c,vModelCheckbox as p,createTextVNode as d}from"vue";function v(e,i){for(var r=0;r<i.length;r++){var t=i[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function h(e,i,r){return i in e?Object.defineProperty(e,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[i]=r,e}function f(e,i){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);i&&(t=t.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),r.push.apply(r,t)}return r}function g(e){for(var i=1;i<arguments.length;i++){var r=null!=arguments[i]?arguments[i]:{};i%2?f(Object(r),!0).forEach((function(i){h(e,i,r[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(r,i))}))}return e}function m(e,i){(null==i||i>e.length)&&(i=e.length);for(var r=0,t=new Array(i);r<i;r++)t[r]=e[r];return t}function y(e,i){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,i){if(e){if("string"==typeof e)return m(e,i);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,i):void 0}}(e))||i&&e&&"number"==typeof e.length){r&&(e=r);var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){l=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(l)throw o}}}}var w,C,b={errorMsg:function(e){console.log("error",e),alert("error："+e)},warnMsg:function(e){console.log("warn",e)},successMsg:function(e){console.log("success",e)}},S=function(e){for(var i=[].concat(e),r=[],t=0,n=i.length;t<n;t++){var o=SuperMap3D.Cartographic.fromCartesian(i[t]),a=SuperMap3D.Math.toDegrees(o.longitude),l=SuperMap3D.Math.toDegrees(o.latitude),s=o.height;-1==r.indexOf(a)&&-1==r.indexOf(l)&&(r.push(a),r.push(l),r.push(s))}return r},E={showRenderLoopErrors:"渲染时发生错误，已停止渲染。",AttributeError:"该组件props没有这个属性：",NoPickPositionSupported:"不支持深度纹理,无法绘制多边形，地形操作功能无法使用！",NoTerrain:"请在地形里使用地形组件！",initViewerWarn:"请先初始化viewer!",MoveMouseHeightBox:"点击鼠标左键结束矩形绘制，移动鼠标绘制box高度",RightClickEndDrawing:"右键单击结束绘制",LeftClickBottomBox:"点击鼠标左键，开始绘制矩形作为box底面",ClickModelAddBox:"点击模型，添加裁剪盒子",SkyLineWarn:"获取天际线体前，请先绘制天际线！",SkyLineBody:"天际线体",ShadowqueryWarn:"此操作需要先开启阴影！",VeiwshedBody:"可视体",VeiwshedBodyHidden:"不可视体",EchartsErr:"二维显示需要echarts支持，未找到相关依赖！",BaseMapImg:"底图",tip1:"<p>点击左键确定操作区域中间点</p><p>右键单击结束绘制</p>"},P=(C=(navigator.language||navigator.browserLanguage).toLowerCase(),window.lang=C,C).toLowerCase();var M=((w=void 0!==P?P:(navigator.language||navigator.browserLanguage).toLowerCase()).startsWith("zh")||w.startsWith("ja"),E),D=e({isViewer:!1,changeLayers:0,changeGeometrys:0});function k(e){var i=function(e){var i=document.createElement("DIV");i.className="tooltip",this._div=i,this.message="",e.appendChild(i)};return i.prototype.setVisible=function(e){this._div.style.right=e?"10px":"-300px"},i.prototype.showAt=function(e,i){i&&(this._div.style.top=i),e&&(this.setVisible(!0),this._div.innerHTML=e)},new i(e)}var L=function(){function e(i,r,t,n){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.viewer=i,this.id_type=r,this.pickedEntity=null,this.leftDownFlag=!1,this.moveEndCallBack=t||void 0,this.leftUpCallBack=n||void 0,this.movePickedEntity=null,this.layers=i.scene.layers.layerQueue}var i,r,t;return i=e,(r=[{key:"addEventListener",value:function(){for(var e=this,i=0;i<e.layers.length;i++)e.layers[i].selectEnabled=!1;e.viewer.screenSpaceEventHandler.setInputAction((function(i){var r=e.viewer.scene.pick(i.position);if(e.leftDownFlag=!0,r){var t=SuperMap3D.defaultValue(r.id,r.primitive.id);t.id&&t.id.includes(e.id_type)&&(e.pickedEntity=t,e.viewer.scene.screenSpaceCameraController.enableRotate=!1)}}),SuperMap3D.ScreenSpaceEventType.LEFT_DOWN),e.viewer.screenSpaceEventHandler.setInputAction((function(i){e.leftDownFlag=!1,e.viewer.scene.screenSpaceCameraController.enableRotate=!0,e.leftUpCallBack&&e.pickedEntity&&e.leftUpCallBack(e.pickedEntity),e.pickedEntity=null}),SuperMap3D.ScreenSpaceEventType.LEFT_UP),e.viewer.screenSpaceEventHandler.setInputAction((function(i){if(e.leftDownFlag){if(e.pickedEntity){var r=e.viewer.scene.pickPosition(i.endPosition);e.pickedEntity.position=r,e.moveEndCallBack&&e.moveEndCallBack(e.pickedEntity)}}else{var t=e.viewer.scene.pick(i.endPosition);if(t){var n=SuperMap3D.defaultValue(t.id,t.primitive.id);n.id&&n.id.includes(e.id_type)?(e.movePickedEntity=n,n.point.pixelSize=20):e.movePickedEntity&&(e.movePickedEntity.point.pixelSize=10)}else e.movePickedEntity&&(e.movePickedEntity.point.pixelSize=10)}}),SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE)}},{key:"removeEventListener",value:function(){this.viewer.screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_DOWN),this.viewer.screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE),this.viewer.screenSpaceEventHandler.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_UP)}}])&&v(i.prototype,r),t&&v(i,t),e}();function O(n){var o,a,l,s=e({viewPosition:null,visibleColor:"rgb(0, 200, 0)",hiddenColor:"rgb(200, 0, 0)",barrierColor:"rgba(255, 186, 1, 1)",highlightBarrier:!1,lineWidth:3,showBarrierPoints:!0});if(n)for(var u in n)s.hasOwnProperty(u)?null!=n[u]&&(s[u]=n[u]):b.errorMsg(M.AttributeError+u);var c,p,d=!0,v=!1,h=[],f=0,m=[],w=[],C=[];function E(){o=viewer.scene,(a=new SuperMap3D.Sightline(o)).visibleColor=SuperMap3D.Color.fromCssColorString(s.visibleColor),a.hiddenColor=SuperMap3D.Color.fromCssColorString(s.hiddenColor),a.lineWidth=Number(s.lineWidth),l=new L(viewer,"sightPoint_",V,T)}function P(e){v=!0,clearTimeout(c),c=setTimeout((function(){v=!1}),20);var i=o.pickPosition(e.message.position),r=S(i);r[2]<0&&(r[2]=0,i=SuperMap3D.Cartesian3.fromDegrees(r[0],r[1],r[2])),s.viewPosition?(a.addTargetPoint({position:r,name:"sightPoint_Target"+f}),m.push(i),requestAnimationFrame((function(){requestAnimationFrame((function(){a.getBarrierPoint("sightPoint_Target"+f,(function(e){var i;if(i=f,viewer.entities.add(new SuperMap3D.Entity({id:"sightPoint_Target"+i,point:new SuperMap3D.PointGraphics({color:new SuperMap3D.CallbackProperty((function(){return SuperMap3D.Color.fromCssColorString(C[i])}),!1),pixelSize:10}),position:new SuperMap3D.CallbackProperty((function(){return m[i]}),!1)})),e&&e.position){e.position.height+=2;var r=SuperMap3D.Cartographic.toCartesian(e.position);w.push(r);var t=a.getObjectIds();h.push(t),C.push(s.hiddenColor)}else w.push({x:6378137,y:0,z:0}),C.push(s.visibleColor);!function(e){var i=viewer.entities.add({name:"Point_Barrier"+e,position:new SuperMap3D.CallbackProperty((function(){return w[e]}),!1),cylinder:{length:3,topRadius:2,bottomRadius:0,material:SuperMap3D.Color.fromCssColorString("#d60000")}});O.push(i)}(f),f+=1}))}))}))):(a.viewPosition=r,s.viewPosition=r,a.build(),viewer.entities.add(new SuperMap3D.Entity({id:"sightPoint_view",point:new SuperMap3D.PointGraphics({color:SuperMap3D.Color.fromCssColorString(s.barrierColor),pixelSize:10}),position:new SuperMap3D.CallbackProperty((function(){return p}),!1)})),p=i)}D.isViewer&&(window.tooltip||(window.tooltip=k(viewer._element)),E()),r((function(){return D.isViewer}),(function(e){e&&(window.tooltip||(window.tooltip=k(viewer._element)),E())}));var O=[];function _(e){if(s.viewPosition&&!v){var i=o.pickPosition(e.message.endPosition),r=S(i);a.addTargetPoint({position:r,name:"point"})}}function B(){window.tooltip.setVisible(!1),document.body.classList.remove("measureCur"),s.highlightBarrier&&A(),a.removeTargetPoint("point"),a.build(),l.addEventListener(),viewer.eventManager.removeEventListener("CLICK",P),viewer.eventManager.removeEventListener("MOUSE_MOVE",_),viewer.eventManager.removeEventListener("RIGHT_CLICK",B)}function V(e){if(e.id)if(e.id.includes("sightPoint_Target")){var i=S(e.position._value);a.addTargetPoint({position:i,name:e.id})}else if(e.id.includes("sightPoint_view")){var r=S(e.position._value);a.viewPosition=r}}function T(e){requestAnimationFrame((function(){requestAnimationFrame((function(){if(e.id)if(e.id.includes("sightPoint_view"))for(var i=0,r=w.length;i<r;i++)t("sightPoint_Target"+i,!0);else e.id.includes("sightPoint_Target")&&t(e.id);function t(i,r){a.getBarrierPoint(i,(function(t){var n=i.charAt(i.length-1);if(t&&t.position){t.position.height+=2;var l,u=SuperMap3D.Cartographic.toCartesian(t.position);if(r){var c=a._targetPoints.values[n],p=SuperMap3D.Cartesian3.fromDegrees(c[0],c[1],c[2]);l=SuperMap3D.Cartesian3.distance(p,u)}else l=SuperMap3D.Cartesian3.distance(e.position._value,u);l>=2.5?(w[n]=u,C[n]=s.hiddenColor):(w[n]={x:6378137,y:0,z:0},C[n]=s.visibleColor);var d=a.getObjectIds();if(h.splice(n,1,d),s.highlightBarrier){var v,f=y(o.layers.layerQueue);try{for(f.s();!(v=f.n()).done;){v.value.removeAllObjsColor()}}catch(e){f.e(e)}finally{f.f()}A()}}else w[n]={x:6378137,y:0,z:0},C[n]=s.visibleColor}))}}))}))}function A(e){var i=SuperMap3D.defaultValue(e,SuperMap3D.Color.fromCssColorString(s.barrierColor)),r=viewer.scene.layers.layerQueue,t=h[h.length-1],n=t[String(Object.keys(t))];console.log("barrierIds:",n),r.forEach((function(e){"Building@CBD"===e._name&&e.setObjsColor(n,i)}))}function j(){a.removeAllTargetPoint();var e,i=y(o.layers.layerQueue);try{for(i.s();!(e=i.n()).done;){e.value.removeAllObjsColor()}}catch(e){i.e(e)}finally{i.f()}f=0,h.length=0,m.length=0,w.length=0,C.length=0,l.removeEventListener(),viewer.entities.removeAll(),document.body.classList.remove("measureCur"),window.tooltip.setVisible(!1),s.viewPosition=null,O.length=0,viewer.eventManager.removeEventListener("CLICK",P),viewer.eventManager.removeEventListener("MOUSE_MOVE",_),viewer.eventManager.removeEventListener("RIGHT_CLICK",B)}return r((function(){return s.lineWidth}),(function(e){a&&(a.lineWidth=Number(e))})),r((function(){return s.visibleColor}),(function(e){a&&(a.visibleColor=SuperMap3D.Color.fromCssColorString(e))})),r((function(){return s.hiddenColor}),(function(e){a&&(a.hiddenColor=SuperMap3D.Color.fromCssColorString(e))})),r((function(){return s.barrierColor}),(function(e){0!==h.length&&A(SuperMap3D.Color.fromCssColorString(e))})),r((function(){return s.highlightBarrier}),(function(e){if(e)A();else{var i,r=y(o.layers.layerQueue);try{for(r.s();!(i=r.n()).done;){i.value.removeAllObjsColor()}}catch(e){r.e(e)}finally{r.f()}}})),r((function(){return s.showBarrierPoints}),(function(e){0!==O.length&&O.forEach((function(i){i.show=e}))})),t((function(){j(),a=void 0})),g(g({},i(s)),{},{analysis:function(){viewer.enableCursorStyle=!1,viewer._element.style.cursor="",document.body.classList.add("measureCur"),d&&(window.tooltip.showAt(" <p>点击鼠标左键确认观察者位置</p><p>再点击左键确认目标位置</p> <p>右键单击结束分析</p>","400px"),d=!1),l.removeEventListener(),viewer.eventManager.addEventListener("CLICK",P,!0),viewer.eventManager.addEventListener("MOUSE_MOVE",_),viewer.eventManager.addEventListener("RIGHT_CLICK",B,!0)},clear:j})}var _={name:"Sm3dSightline",props:{viewPosition:{type:Array},visibleColor:{type:String,default:"rgb(0, 200, 0)"},hiddenColor:{type:String,default:"rgb(200, 0, 0)"},barrierColor:{type:String,default:"rgba(255, 186, 1, 1)"},highlightBarrier:{type:Boolean,default:!1},lineWidth:{type:Number,default:3},showBarrierPoints:{type:Boolean,default:!0}},setup:function(e){var i=O(e);return{lineWidth:i.lineWidth,visibleColor:i.visibleColor,hiddenColor:i.hiddenColor,barrierColor:i.barrierColor,highlightBarrier:i.highlightBarrier,showBarrierPoints:i.showBarrierPoints,analysis:i.analysis,clear:i.clear}}},B={id:"sight-line",class:"sm-panel"},V={class:"sm-function-module-sub-section",style:{margin:"0"}},T={class:"sm-half-L"},A={style:{width:"35%"}},j={class:"sm-half-L"},x={style:{width:"35%"}},I={class:"sm-half-L"},W={style:{width:"35%"}},R={class:"sm-half-L"},U={style:{width:"35%"}},z={class:"sm-half-L"},F={style:{width:"auto"}},H={style:{width:"auto"}},N={class:"boxchild "};_.render=function(e,i,r,t,v,h){var f=n("el-slider"),g=n("el-color-picker"),m=o("stopdrag"),y=o("drag");return a((l(),s("div",B,[a(u("div",V,[u("div",T,[u("label",A,c(e.Resource.lineWidth),1),u(f,{modelValue:t.lineWidth,"onUpdate:modelValue":i[1]||(i[1]=function(e){return t.lineWidth=e}),min:1,step:1,max:10,"input-size":"mini",debounce:500,"tooltip-class":"tooltip-class",style:{width:"63%"}},null,8,["modelValue"])]),u("div",j,[u("label",x,c(e.Resource.visibleColor),1),u(g,{modelValue:t.visibleColor,"onUpdate:modelValue":i[2]||(i[2]=function(e){return t.visibleColor=e}),size:"mini","show-alpha":"",style:{width:"63%"}},null,8,["modelValue"])]),u("div",I,[u("label",W,c(e.Resource.hiddenColor),1),u(g,{modelValue:t.hiddenColor,"onUpdate:modelValue":i[3]||(i[3]=function(e){return t.hiddenColor=e}),size:"mini","show-alpha":"",style:{width:"63%"}},null,8,["modelValue"])]),u("div",R,[u("label",U,c(e.Resource.barrierColor),1),u(g,{modelValue:t.barrierColor,"onUpdate:modelValue":i[4]||(i[4]=function(e){return t.barrierColor=e}),size:"mini","show-alpha":"",style:{width:"63%"}},null,8,["modelValue"])]),u("div",z,[u("label",F,[a(u("input",{type:"checkbox","onUpdate:modelValue":i[5]||(i[5]=function(e){return t.showBarrierPoints=e})},null,512),[[p,t.showBarrierPoints]]),d(" "+c(e.Resource.showBarrierPoints),1)]),u("label",H,[a(u("input",{type:"checkbox","onUpdate:modelValue":i[6]||(i[6]=function(e){return t.highlightBarrier=e})},null,512),[[p,t.highlightBarrier]]),d(" "+c(e.Resource.highlightBarrier),1)])]),u("div",N,[u("button",{type:"button",class:"tbtn",onClick:i[7]||(i[7]=function(){return t.analysis&&t.analysis.apply(t,arguments)})},c(e.Resource.analyze),1),u("button",{type:"button",class:"tbtn tbtn-margin-left",onClick:i[8]||(i[8]=function(){return t.clear&&t.clear.apply(t,arguments)})},c(e.Resource.clear),1)])],512),[[m]])],512)),[[y]])},_.__file="src/components/analysis_3d/sight-line/sight-line.vue",_.install=function(e){e.component(_.name,_)};export default _;