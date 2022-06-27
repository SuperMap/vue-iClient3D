
// import { actions, storeDate } from '../store/store.js'   //局部状态管理
import { actions, storeDate } from '../../globalCom/js/store/store.js'   //局部状态管理

// 添加s3m
function addS3mLayers(scps, callback) {  //scps:[{ url, options:{name}]}  无返回值
    let promiseArray = [];
    debugger
    try {
        if (scps) {
            //加载scps
            scps.forEach(scp => {
                console.log('foreach中的', scp.url, scp.options);
                promiseArray.push(
                    scene.addS3MTilesLayerByScp(scp.url, scp.options)
                );
            });
        }
        promiseWhen(promiseArray, callback, 'S3M')
    } catch (e) {
        let title = "渲染时发生错误，已停止渲染。";
        console.log(title)
    }
};


// 添加场景
function addScene(url, options, callback) {  //无返回值options:{SceneToken,autoSetView}
    if (options && options.SceneToken) {
        SuperMap3D.Credential.CREDENTIAL = new SuperMap3D.Credential(options.SceneToken);
    }
    let flag = true;
    if (options && options.autoSetView) {
        flag = options.autoSetView
    }
    if (checkURL(url)) {
        try {
            let s = [scene.open(url, undefined, { 'autoSetView': flag })];
            promiseWhen(s, callback, 'SCENE');
        } catch (e) {
            let title = "渲染时发生错误，已停止渲染。";
            console.log(title)
        }
    }
};

// 添加地形
function addTerrainLayer(LayerURL, isSct) {
    try {
        scene.terrainProvider = new SuperMap3D.SuperMap3DTerrainProvider({
            url: LayerURL,
            isSct: isSct, //地形服务源自SuperMap iServer发布时需设置isSct为true
        });
    } catch (e) {
        let title = "渲染时发生错误，已停止渲染。";
        console.log(title)
    }
};

// 添加影像
function addImageLayer(LayerURL) {    // 返回img图层layer
    try {
        let layer = scene.imageryLayers.addImageryProvider(
            new SuperMap3D.SuperMapImageryProvider({
                url: LayerURL,
            })
        );
        return layer
    } catch (e) {
        let title = "渲染时发生错误，已停止渲染。";
        console.log(title)
    }

};

// 添加mvt
function addMvtLayer(LayerURL, name, callback) {    // 返回img图层layer
    try {
        let mvtMap = scene.addVectorTilesMap({
            url: LayerURL,
            canvasWidth: 512,
            name: name || 'mvt',
            viewer: scene
        });
        SuperMap3D.when(mvtMap.readyPromise, function (data) {
            var bounds = mvtMap.rectangle;
            scene.camera.flyTo({
                destination: new SuperMap3D.Cartesian3.fromRadians(
                    (bounds.east + bounds.west) * 0.5,
                    (bounds.north + bounds.south) * 0.5,
                    10000
                ),
                duration: 0,
                orientation: {
                    heading: 0,
                    roll: 0
                }
            });
            actions.setChangeLayers();
            callback(mvtMap)
        });
        return mvtMap
    } catch (e) {
        let title = "渲染时发生错误，已停止渲染。";
        console.log(title);
    }

};

// 加载s3m和场景函数
function promiseWhen(promiseArray, callback, type) {
    SuperMap3D.when.all(
        promiseArray,
        function (layers) {
            storeDate.layers = scene.layers && scene.layers.layerQueue;
            actions.setChangeLayers();
            callback(layers[0], type);
            storeDate.layers.forEach((s3mlayer) => {
                if (!s3mlayer.visibleDistanceMax || s3mlayer.visibleDistanceMax > 12000) {
                    s3mlayer.visibleDistanceMax = 12000   //设置模型最可见距离
                }
            })
        },
        function (e) {
            let title = '请检查url地址是否正确？';
            console.log(title)
        }
    );
};

//   检验url地址
function checkURL(url) {
    if (url === null || url === "") {
        return false;
    }
    if (url.charAt(0) == '"' || url.charAt(0) == "'") {
        let reg = /^['|"](.*)['|"]$/;
        url = url.replace(reg, "$1");
    }
    return true
};

//   删除图层
function layersDelete(type, id_name, callback) {
    switch (type) {
        case "S3M":
            scene.layers.remove(id_name);
            actions.setChangeLayers();   //图层改变全局响应触发
            callback();
            break;
        case "IMG":
            let img_layer;
            if (typeof (id_name) === 'nunber') {
                img_layer = scene.imageryLayers.get(id_name);
            } else {
                let img_layers = scene.imageryLayers._layers
                for (let i = 0; i < img_layers.length; i++) {
                    if (img_layers[i].imageryProvider.tablename && img_layers[i].imageryProvider.tablename === id_name) {
                        img_layer = img_layers[i];
                    }
                };
            }
            if (img_layer) {
                scene.imageryLayers.remove(img_layer);
                actions.setChangeLayers();
                callback();
            }

            break;
        case "TERRAIN":
            scene.terrainProvider = new SuperMap3D.EllipsoidTerrainProvider();
            actions.setChangeLayers();
            callback()
            break;
        case "MVT":
            scene.removeVectorTilesMap(id_name);
            actions.setChangeLayers();
            callback()
            break;
        default:
            null;
    }
}



export default {
    addS3mLayers,
    addScene,
    addTerrainLayer,
    addImageLayer,
    layersDelete,
    addMvtLayer
};
export {
    addS3mLayers,
    addScene,
    addTerrainLayer,
    addImageLayer,
    layersDelete,
    addMvtLayer
};