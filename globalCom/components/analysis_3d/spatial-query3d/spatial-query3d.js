
// 引入依赖
import { watch, reactive, toRefs, onBeforeUnmount } from "vue";
import tool from '../../../js/tool/tool.js'        //提示等工具
import resource from '../../../js/local/lang.js'  //语言资源
import { storeState, storeDate } from '../../../js/store/store.js'   //简单局部状态管理
import createTooltip from '../../../js/tool/tooltip.js'

function spatialQuery3d(props) {

    // 设置默认值数据
    let state = reactive({
        layerNames: [],   //当前存在的可选择图层
        selectedLayerName: null,  //默认选择图层名称
        scale: 3,   //缩放
        positionMode: "intersects",   //位置模式

        Xpitch: 0,   //x旋转
        Yroll: 0,     //y旋转
        Zheading: 0,     //z旋转
        geometryType: "box",   //选择模型类型
        drawType: "Fill_And_WireFrame",   //模型显示类型
        FillColor: "#FFFB19",   //模型填充颜色
        WireFrameColor: "#FFFF00",  // 模型线框颜色
        searchColor: "#FFBA01",   //查询结果颜色
        GeometryBodyNames: [], //场景存在的天际线体对象等存在的数组
        //默认geometry参数
        boxParameters: [100, 100, 100],
        sphereParameters: [100],
        coneParameters: [100, 200],
        cylinderParameters: [100, 100, 200],
        ellicpseParameters: [100, 50, 50],
        rotateOrigin: null,
        showTable: false, //属性查询表格显示
        atributesData: [], //属性查询值

        selectIds: [] //表格id选中
    });

    // 传入props改变默认值
    if (props) {
        for (let key in props) {
            if (state.hasOwnProperty(key)) {
                if (props[key] != undefined)
                    state[key] = props[key]
            } else {
                tool.Message.errorMsg(resource.AttributeError + key);
            }
        }
    }

    // 初始化数据
    let tipFlag = true;
    let layers, spatialQuery;
    let geometry, GeometryBodys = [];

    let editEntity, s3mInstanceColc;
    let modelUrl = 'public/data/s3m/box.s3m';
    let modelEditor;

    if (storeState.isViewer) {
        if (!window.tooltip) {
            window.tooltip = createTooltip(scene._element);
        }
        init();
    }
    //viewer 初始化完成的监听
    watch(() => storeState.isViewer, val => {
        if (val) {
            if (!window.tooltip) {
                window.tooltip = createTooltip(scene._element);
            }
            init();
        }
    });
    //监听图层加载完成
    watch(() => storeState.changeLayers, val => {
        getLayerNames();
    });
    if (storeState.changeGeometrys) {
        setGeometryBodys()
    }
    //监听场景存在其他三维体
    watch(() => storeState.changeGeometrys, val => {
        setGeometryBodys()
    });

    function setGeometryBodys() {
        state.GeometryBodyNames = [];
        GeometryBodys = [];
        if (storeDate.geometrys) {
            for (const key in storeDate.geometrys) {
                GeometryBodys.push(key);
                let name = storeDate.geometrys[key].name;
                if (!state.GeometryBodyNames.includes(name)) {
                    state.GeometryBodyNames.push(name)
                }
            }
        }
        if (state.GeometryBodyNames.length === 0) {
            if (props && props.geometryType) {
                state.geometryType = props.geometryType
            } else {
                state.geometryType = 'box'
            }

        }
    }


    function init() {
        layers = scene.layers && scene.layers.layerQueue;
        spatialQuery = new SuperMap3D.SpatialQuery3D(scene);
        spatialQuery.outlineColor = SuperMap3D.Color.fromCssColorString(
            state.WireFrameColor
        );
        spatialQuery.fillColor = SuperMap3D.Color.fromCssColorString(
            state.FillColor
        );
        spatialQuery.fillStyle = SuperMap3D.FillStyle[state.drawType];
        getGeometry(state.geometryType);
        getPositionMode(state.positionMode);
        spatialQuery.build();
        setTimeout(() => {
            if (state.layerNames.length === 0) {
                getLayerNames();
            }
        }, 1000);

        s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
        scene.primitives.add(s3mInstanceColc);
    };

    function getLayerNames() {
        let layer = getLayer(state.selectedLayerName);
        if (spatialQuery && spatialQuery.layers) {
            spatialQuery.layers = layer ? [layer] : []
        }
        state.layerNames.length = 0;
        if (layers && layers.length > 0) {
            layers.forEach((element, index) => {
                if (!state.layerNames.includes(element._name)) {
                    state.layerNames.push(element._name);
                }
            });
            if (!state.selectedLayerName) {
                state.selectedLayerName = state.layerNames[0]
            }
        }
    }


    /*
     ***分析模块***
    */


    //分析
    function analysis() {
        try {
            let layer = getLayer(state.selectedLayerName);
            if (!layer) {
                tool.Message.warnMsg('请选择需要查询的图层！')
                return;
            }
            spatialQuery.layers = [layer];
            tooltip.setVisible(false);
            layer.selectedColor = SuperMap3D.Color.fromCssColorString(state.searchColor);
            layer.selectColorType = SuperMap3D.SelectColorType.REPLACE;
            layer.selectEnabled = false;
            if (typeof (state.geometryType) === 'number') {      //三维体查询,目前只支持这两种
                getGeometry(state.geometryType);
                spatialQuery.build();
                return;
            }
            spatialQuery.build();
            scene.enableCursorStyle = false;
            scene._element.style.cursor = "";
            document.body.classList.add("measureCur");
            if (tipFlag) {   //只提示一次
                window.tooltip.showAt(' <p>点击鼠标左键确认查询位置</p>', '300px');
                tipFlag = false
            }
            //鼠标左键事件监听
            scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
        } catch (err) {
            console.error(err)
        }
    };

    function LEFT_CLICK(e) {
        document.body.classList.remove("measureCur");
        // 获取鼠标点击的笛卡尔坐标
        let cartesian = scene.pickPosition(e.message.position);
        let position = tool.CartesiantoDegrees(cartesian) // 将获取的点的位置转化成经纬度
        setPosition(position);
        // let h = position[2] + 60;
        // addModel(SuperMap3D.Cartesian3.fromDegrees(position[0], position[1], h)); //添加编辑模型
        tooltip.setVisible(false);
        scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听
        setTimeout(() => {
            getAtributes()
        }, 1000)
    }

    function getLayer(layerName) {
        return layers.find(function (item, index) {
            return item._name === layerName
        })
    };
    function getQueryIDs() {
        return spatialQuery.getQueryIDs();
    };

    function getGeometry(geometryType) {
        switch (geometryType) {
            case "box":
                {
                    let p = state.boxParameters;
                    geometry = new SuperMap3D.GeoBox(p[0], p[1], p[2]);
                }
                break;
            case "sphere":
                {
                    let p = state.sphereParameters;
                    geometry = new SuperMap3D.GeoSphere(p[0]);
                }
                break;
            case "cone":
                {
                    let p = state.coneParameters;
                    geometry = new SuperMap3D.GeoCone(p[0], p[1]);
                    if (state.rotateOrigin) {
                        geometry.rotateOrigin = getRotateOrigin();
                    }
                }
                break;
            case "cylinder":
                {
                    let p = state.cylinderParameters;
                    geometry = new SuperMap3D.GeoCylinder(p[0], p[1], p[2]);
                }
                break;
            case "ellicpse":
                {
                    let p = state.ellicpseParameters;
                    geometry = new SuperMap3D.GeoEllipsoid(p[0], p[1], p[2]);
                }
                break;
            default:
                {
                    geometry = new SuperMap3D.GeoModel3D();
                    geometry.geoModel = storeDate.geometrys['SkyLineBody'];
                    spatialQuery.clear()
                }
                break;

        }
        spatialQuery.geometry = geometry;
    };
    //获取圆锥绕点旋转方式
    function getRotateOrigin() {
        let r = state.rotateOrigin;
        if (r == "APEX") {
            return SuperMap3D.RotationOrigin.APEX;
        } else {
            return SuperMap3D.RotationOrigin.CENTER;
        }
    };
    function getPositionMode(positionMode) {
        let mode;
        switch (positionMode) {
            case "intersects":
                mode = SuperMap3D.PositionMode.Intersects;
                break;
            case "disjoint":
                mode = SuperMap3D.PositionMode.Disjoint;
                break;
            case "contains":
                mode = SuperMap3D.PositionMode.Contains;
                break;
            default:
                mode = SuperMap3D.PositionMode.Intersects;
                break;
        }
        spatialQuery.positionMode = mode;
    };

    //设置查询中心点位置,可用于动态改变如机场预警范例
    function setPosition(newPosArr) {
        //传入经纬度数组
        if (spatialQuery && spatialQuery.geometry) {
            spatialQuery.geometry.geoPosition = new SuperMap3D.Point3D(
                newPosArr[0],
                newPosArr[1],
                newPosArr[2]
            );
        }
    };

    function addModel(centerPositions) {
        s3mInstanceColc.add(modelUrl, {
            id: 'spatialQuery-model',
            position: centerPositions,
            // hpr: new SuperMap3D.HeadingPitchRoll(heading, 0, 0),
            // color:SuperMap3D.Color.RED,
            scale: new SuperMap3D.Cartesian3(0.1, 0.1, 0.1),
        });
        editEntity = s3mInstanceColc.getInstance(modelUrl, 'spatialQuery-model');
        if (!modelEditor) addModelEditor(editEntity);
        else {
            modelEditor.setEditObject(editEntity);
            modelEditor.activate();
        }
    }

    function addModelEditor(model) {
        modelEditor = new SuperMap3D.ModelEditor({
            model: model,
            scene: scene,
            axesShow: {
                "translation": true,
                "rotation": true,
                "scale": false
            }
        });
        modelEditor.activate();
        modelEditor.changedEvt.addEventListener((param) => {
            console.log(param)
            let Cartesian3 = new SuperMap3D.Cartesian3();
            SuperMap3D.Matrix4.getTranslation(param.modelMatrix, Cartesian3);
            if (Cartesian3) {

            }
        })
    }

    let queryIDs = [];
    function getAtributes() {
        state.atributesData.length = 0;
        let selectLayer = getLayer(state.selectedLayerName);
        selectLayer.indexedDBSetting.isAttributesSave = true
        let query = spatialQuery.getQueryIDs();
        queryIDs = query[0].ids;
        selectLayer.setSelection(queryIDs);
        if (query.length < 1) return;
        for (let i = 0; i < queryIDs.length; i++) {
            selectLayer.getAttributesById(queryIDs[i]).then((data) => {
                if (data) {
                    console.log(data)
                    delete data.Field_SmUserID;
                    delete data.SmUserID;
                    delete data.X;
                    delete data.Y;
                    delete data.Z;
                    state.atributesData.push(data);
                    if (i == queryIDs.length - 1) state.showTable = true;
                }
            });
        }
    }

    // 清除
    function clear() {
        state.showTable = false;
        state.atributesData.length = 0;
        let layer = getLayer(state.selectedLayerName);
        layer.removeAllObjsColor();
        if (layer) {
            layer.selectedColor = new SuperMap3D.Color(0.7, 0.7, 1, 1);
            layer.setSelection([]);
            layer.selectColorType = SuperMap3D.SelectColorType.MIX;
        }
        spatialQuery.clear();
        tooltip.setVisible(false);
        document.body.classList.remove("measureCur");
        spatialQuery.geometry.geoPosition = new SuperMap3D.Point3D(0, 0, 0);
        scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听
    };

    // 监听
    watch(() => state.Xpitch, val => {
        if (val == "") return;
        geometry.geoRotationX = parseFloat(val);
    });
    watch(() => state.Yroll, val => {
        if (val == "") return;
        geometry.geoRotationY = parseFloat(val);
    });
    watch(() => state.Zheading, val => {
        if (val == "") return;
        geometry.geoRotationZ = parseFloat(val);
    });
    watch(() => state.scale, val => {
        if (val == "") return;
        geometry.geoScaleX = parseFloat(val);
        geometry.geoScaleY = parseFloat(val);
        geometry.geoScaleZ = parseFloat(val);
    });
    watch(() => state.positionMode, val => {
        if (val == "") return;
        getPositionMode(val);
        setTimeout(() => getAtributes(), 1000)
    });
    watch(() => state.geometryType, val => {
        if (val === "") return;
        getGeometry(val);
    });
    watch(() => state.drawType, val => {
        if (val == "") return;
        spatialQuery.fillStyle = SuperMap3D.FillStyle[val];
    });
    watch(() => state.FillColor, val => {
        if (val == "") return;
        spatialQuery.fillColor = SuperMap3D.Color.fromCssColorString(val);
    });
    watch(() => state.WireFrameColor, val => {
        if (val == "") return;
        spatialQuery.outlineColor = SuperMap3D.Color.fromCssColorString(val);
    });
    watch(() => state.searchColor, val => {
        if (val == "") return;
        getLayer(state.selectedLayerName).selectedColor = SuperMap3D.Color.fromCssColorString(val);
    });
    watch(() => state.selectedLayerName, (val, oldval) => {
        let layer = getLayer(oldval);
        if (layer) {
            layer.selectedColor = new SuperMap3D.Color(0.7, 0.7, 1, 1);
            layer.setSelection([]);
            layer.selectColorType = SuperMap3D.SelectColorType.MIX;
        }
        clear()
    });
    watch(() => state.selectIds, val => {
        let layer = getLayer(state.selectedLayerName);
        let ids = [];
        // layer.removeAllObjsColor();
        layer.removeObjsColor(queryIDs);
        val.forEach((el) => { if (el.SmID) ids.push(el.SmID) });
        let oldids = [...queryIDs];
        oldids = oldids.filter((id) => {
            return !ids.includes(Number(id))
        })
        layer.setSelection(oldids);
        layer.setObjsColor(ids, new SuperMap3D.Color(221 / 255, 104 / 255, 219 / 255, 1))
    });


    // 销毁
    onBeforeUnmount(() => {
        spatialQuery.destroy();
        spatialQuery = undefined;
        layers = undefined;
        geometry = undefined;
    })

    return {
        ...toRefs(state),
        setPosition,
        getQueryIDs,
        analysis,
        clear
    };
};

export default spatialQuery3d

