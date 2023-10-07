import{reactive as e,toRefs as n,watch as t,onBeforeUnmount as o,resolveDirective as r,withDirectives as a,openBlock as i,createBlock as l,createVNode as s,toDisplayString as c,Fragment as p,renderList as u,vShow as d,vModelSelect as y,vModelRadio as w,createTextVNode as v}from"vue";function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function g(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?h(Object(t),!0).forEach((function(n){f(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function m(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return b(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return b(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}var P=function(e){for(var n=[].concat(e),t=[],o=0,r=n.length;o<r;o++){var a=SuperMap3D.Cartographic.fromCartesian(n[o]),i=SuperMap3D.Math.toDegrees(a.longitude),l=SuperMap3D.Math.toDegrees(a.latitude),s=a.height;-1==t.indexOf(i)&&-1==t.indexOf(l)&&(t.push(i),t.push(l),t.push(s))}return t};var M,x,D={errorMsg:function(e){console.log("error",e),alert("error："+e)},warnMsg:function(e){console.log("warn",e)},successMsg:function(e){console.log("success",e)}},S={showRenderLoopErrors:"渲染时发生错误，已停止渲染。",AttributeError:"该组件props没有这个属性：",NoPickPositionSupported:"不支持深度纹理,无法绘制多边形，地形操作功能无法使用！",NoTerrain:"请在地形里使用地形组件！",initViewerWarn:"请先初始化viewer!",MoveMouseHeightBox:"点击鼠标左键结束矩形绘制，移动鼠标绘制box高度",RightClickEndDrawing:"右键单击结束绘制",LeftClickBottomBox:"点击鼠标左键，开始绘制矩形作为box底面",ClickModelAddBox:"点击模型，添加裁剪盒子",SkyLineWarn:"获取天际线体前，请先绘制天际线！",SkyLineBody:"天际线体",ShadowqueryWarn:"此操作需要先开启阴影！",VeiwshedBody:"可视体",VeiwshedBodyHidden:"不可视体",EchartsErr:"二维显示需要echarts支持，未找到相关依赖！",BaseMapImg:"底图",tip1:"<p>点击左键确定操作区域中间点</p><p>右键单击结束绘制</p>"},k=(x=(navigator.language||navigator.browserLanguage).toLowerCase(),window.lang=x,x).toLowerCase();var E=((M=void 0!==k?k:(navigator.language||navigator.browserLanguage).toLowerCase()).startsWith("zh")||M.startsWith("ja"),S),C=function(e,n){var t,o,r=0;switch(n&&(r=n),e){case"Point":window.handlerPoint=new SuperMap3D.DrawHandler(viewer,SuperMap3D.DrawMode.Point);break;case"Polyline":window.handlerPolyline=new SuperMap3D.DrawHandler(viewer,SuperMap3D.DrawMode.Line,r);break;case"Polygon":window.handlerPolygon=new SuperMap3D.DrawHandler(viewer,SuperMap3D.DrawMode.Polygon,r);break;case"Marker":window.handlerMarker=new SuperMap3D.DrawHandler(viewer,SuperMap3D.DrawMode.Marker,r);break;case"Box":window.handlerBox=new SuperMap3D.DrawHandler(viewer,SuperMap3D.DrawMode.Box,r)}window.tooltip||(window.tooltip=(t=viewer._element,(o=function(e){var n=document.createElement("DIV");n.className="twipsy right";var t=document.createElement("DIV");t.className="twipsy-arrow",n.appendChild(t);var o=document.createElement("DIV");o.className="twipsy-inner",n.appendChild(o),this._div=n,this._title=o,this.message="",e.appendChild(n);var r=this;n.onmousemove=function(e){r.showAt({x:e.clientX,y:e.clientY},r.message)}}).prototype.setVisible=function(e){this._div.style.display=e?"block":"none"},o.prototype.showAt=function(e,n){e&&n&&(this.setVisible(!0),this._title.innerHTML=n,this._div.style.left=e.x+10+"px",this._div.style.top=e.y-this._div.clientHeight/2+"px",this.message=n)},new o(t))),window.polylineCollection||(window.polylineCollection=new SuperMap3D.PolylineCollection({translucentRS:SuperMap3D.RenderState.fromCache({depthMask:!1,depthTest:{enabled:!1}})}),window.polylineTransparent=window.polylineCollection.add({width:2,material:SuperMap3D.Material.fromType(SuperMap3D.Material.ColorType,{color:SuperMap3D.Color.fromCssColorString("#51ff00").withAlpha(.3)})}),viewer.scene.primitives.add(window.polylineCollection))},L=function(e,n,t){var o=!0;!1===n&&(o=n);var r=N(e);return new Promise((function(n,t){var a=window.tooltip,i=r.activeEvt.addEventListener((function(n){1==n?(viewer.enableCursorStyle=!1,viewer._element.style.cursor="","Point"==e||"Marker"==e?document.body.classList.add("measureCur"):document.body.classList.add("drawCur")):(viewer.enableCursorStyle=!0,a.setVisible(!1),"Point"==e||"Marker"==e?document.body.classList.remove("measureCur"):document.body.classList.remove("drawCur"))})),l=r.movingEvt.addEventListener((function(n){if(n.x<200&&n.y<150)a.setVisible(!1);else if(r.polyline&&r.isDrawing){var t=m(r.positions);"Polygon"==e&&t.push(t[0]),window.polylineTransparent.show=!0,window.polylineTransparent.positions=t}})),s=r.drawEvt.addEventListener((function(t){if(!t.object.positions&&"Point"!=e&&"Box"!=e)return a.showAt(t,"<p>请绘制正确的多边形</p>"),r.polygon.show=!1,r.polyline.show=!1,r.deactivate(),void r.activate();if("Box"!=e){if("Point"==e||"Marker"==e)r.clear(),n({result:t});else{if(window.polylineTransparent.show=o,o&&"Polygon"==e&&o){r.polygon._polygon._material._color._value.alpha=.1;var c=m(t.object.positions);c.push(c[0]),window.polylineTransparent.positions=c}var p=P(t.object.positions);n({result:t,positions:p})}i(),l(),s()}else n({result:t})}))}))},O=function(e){var n;(n=e?N(e):window.handlerPolygon)&&(n.deactivate(),n.clear(),viewer.enableCursorStyle=!0,window.tooltip.setVisible(!1),window.polylineTransparent&&(window.polylineTransparent.show=!1))},N=function(e){var n;switch(e){case"Point":n=window.handlerPoint;break;case"Polyline":n=window.handlerPolyline;break;case"Polygon":n=window.handlerPolygon;break;case"Marker":n=window.handlerMarker;break;case"Box":n=window.handlerBox}return n},T=e({isViewer:!1,changeLayers:0,changeGeometrys:0});var V={name:"Sm3dObliquePhotography",props:{selectedLayerName:{type:String},operationType:{type:String},excavationPositions:{type:Array},flattenPositions:{type:Array},lineVisible:{type:Boolean,default:!0}},setup:function(r){var a=function(r){var a=e({layerNames:[],selectedLayerName:"none",operationType:"Excavation",lineVisible:!0});if(r)for(var i in r)a.hasOwnProperty(i)?a[i]=r[i]:D.errorMsg(E.AttributeError+i);var l,s,c=[],p=[];function u(){viewer.scene,(l=viewer.scene.layers.layerQueue)&&l.length>0&&(l.forEach((function(e,n){a.layerNames.includes(e._name)||a.layerNames.push(e._name)})),(a.selectedLayerName="none")&&(a.selectedLayerName=a.layerNames[0],s=l[0]))}function d(e){e&&(c=e),s.addExcavationRegion({position:e,name:"excavation_"+Math.random()})}function y(e){e&&(p=e),s.addFlattenRegion({position:e,name:"flatten"+Math.random()})}return T.isViewer&&u(),t((function(){return T.isViewer}),(function(e){e&&u()})),t((function(){return T.changeLayers}),(function(e){u()})),t((function(){return a.selectedLayerName}),(function(e){var n=a.layerNames.indexOf(e);-1!=n&&(s=l[n])})),o((function(){l=null})),g(g({},n(a)),{},{startExcavation:function(e){e.preventDefault(),window.handlerPolygon||C("Polygon"),r&&r.excavationPositions?d(r.excavationPositions):(L("Polygon",a.lineVisible).then((function(e){var n=window.handlerPolygon;d(e.positions),n.polygon.show=!1,n.polyline.show=!1,n.deactivate()}),(function(e){console.log(e)})),window.handlerPolygon.activate(),viewer.scene.pickPositionSupported||D&&D.errorMsg(E.NoPickPositionSupported))},clearExcavation:function(e){e.preventDefault(),c=[],window.handlerPolygon&&(s.removeAllExcavationRegion(),O("Polygon"))},startFlatten:function(e){e.preventDefault(),window.handlerPolygon||C("Polygon"),r&&r.flattenPositions?y(r.flattenPositions):(L("Polygon",a.lineVisible).then((function(e){var n=window.handlerPolygon;y(e.positions),n.polygon.show=!1,n.polyline.show=!1}),(function(e){console.log(e)})),window.handlerPolygon.activate(),viewer.scene.pickPositionSupported||D&&D.errorMsg(E.NoPickPositionSupported))},clearFlatten:function(e){e.preventDefault(),window.handlerPolygon&&(s.removeAllFlattenRegion(),O("Polygon"))},excavationPositions:c,flattenPositions:p})}(r);return{layerNames:a.layerNames,selectedLayerName:a.selectedLayerName,operationType:a.operationType,startExcavation:a.startExcavation,clearExcavation:a.clearExcavation,startFlatten:a.startFlatten,clearFlatten:a.clearFlatten}}},j={id:"terrain-operation-panel",class:"sm-panel"},A={class:"sm-function-module-sub-section",style:{margin:"0"}},_={class:"sm-half-L"},B={style:{width:"40%"}},F={class:"sm-half-L"},R={style:{width:"auto"}},H={style:{width:"auto"}},I={class:"boxchild"},W={class:"boxchild"};V.render=function(e,n,t,o,f,h){var g=r("stopdrag"),m=r("drag");return a((i(),l("div",j,[a(s("div",A,[s("div",_,[s("label",B,c(e.Resource.selectedLayer),1),a(s("select",{class:"sm-select",style:{width:"58%"},"onUpdate:modelValue":n[1]||(n[1]=function(e){return o.selectedLayerName=e})},[(i(!0),l(p,null,u(o.layerNames,(function(e,n){return i(),l("option",{key:n,value:e},c(e),9,["value"])})),128)),a(s("option",{value:"none"},c(e.Resource.noS3mLayer),513),[[d,0==o.layerNames.length]])],512),[[y,o.selectedLayerName]])]),s("div",F,[s("label",R,[a(s("input",{type:"radio",value:"Excavation","onUpdate:modelValue":n[2]||(n[2]=function(e){return o.operationType=e})},null,512),[[w,o.operationType]]),v(" "+c(e.Resource.excavation),1)]),s("label",H,[a(s("input",{type:"radio",value:"Flatten","onUpdate:modelValue":n[3]||(n[3]=function(e){return o.operationType=e})},null,512),[[w,o.operationType]]),v(" "+c(e.Resource.flatten),1)])]),a(s("div",I,[s("button",{onClick:n[4]||(n[4]=function(){return o.startExcavation&&o.startExcavation.apply(o,arguments)}),class:"tbtn",type:"button"},c(e.Resource.excavation),1),s("button",{onClick:n[5]||(n[5]=function(){return o.clearExcavation&&o.clearExcavation.apply(o,arguments)}),class:"tbtn tbtn-margin-left",type:"button"},c(e.Resource.clear),1)],512),[[d,"Excavation"===o.operationType]]),a(s("div",W,[s("button",{onClick:n[6]||(n[6]=function(){return o.startFlatten&&o.startFlatten.apply(o,arguments)}),onTouchstart:n[7]||(n[7]=function(){return o.startFlatten&&o.startFlatten.apply(o,arguments)}),class:"tbtn",type:"button"},c(e.Resource.flatten),33),s("button",{onClick:n[8]||(n[8]=function(){return o.clearFlatten&&o.clearFlatten.apply(o,arguments)}),class:"tbtn tbtn-margin-left",type:"button"},c(e.Resource.clear),1)],512),[[d,"Flatten"===o.operationType]])],512),[[g]])],512)),[[m]])},V.__file="src/components/layer/oblique-photography/oblique-photography.vue",V.install=function(e){e.component(V.name,V)};export default V;