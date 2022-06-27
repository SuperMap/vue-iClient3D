
// 引入依赖
import { watch, reactive, toRefs, onBeforeUnmount } from "vue";
import tool from '../../../js/tool/tool.js'        //提示等工具
import resource from '../../../js/local/lang.js'  //语言资源
import createTooltip from '../../../js/tool/tooltip.js';
import { storeState, storeDate } from '../../../js/store/store.js'   //简单局部状态管理


function clipBoxAnalysis(props) {
    // 设置默认值数据
    let state = reactive({
        clipModel: 'ClipInside',//裁剪模式js
    });

    // 传入props改变默认值
    if (props) {
        for (let key in props) {
            if (state.hasOwnProperty(key)) {
                if(props[key] != undefined)
                state[key] = props[key]
            } else {
                tool.Message.errorMsg(resource.AttributeError + key);
            }
        }
    }

    // 初始化数据
    let clipMode = 'clip_behind_all_plane';   //裁剪模式值 外部: clip_behind_any_plane
    let layers, handlerBox, boxEntity, editorBox;
    if (storeState.isViewer) {
        layers = scene.layers && scene.layers.layerQueue;
        handlerBox = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box);
        if (!window.tooltip) {
            window.tooltip = createTooltip(scene._element);
        }
    }
    //viewer 初始化完成的监听
    watch(() => storeState.isViewer, val => {
        if (val) {
            layers = scene.layers && scene.layers.layerQueue;
            handlerBox = new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box);
            if (!window.tooltip) {
                window.tooltip = createTooltip(scene._element);
            }
        }
    })

    /*
     ***裁剪交互分析模块***
    */


    // 分析
    function BoxClipByEitor() {
        clearBoxClipByEitor();
        if (editorBox) {
            handlerBox.activate();
            return;
        }
        // 设置裁剪线颜色
        setAllLayersClipColor();
        //交互绘制box
        handlerBox.movingEvt.addEventListener(windowPosition => {
            if (handlerBox.isDrawing) {
                tooltip.showAt(' <p>点击鼠标左键结束绘制box底面</p><p>移动鼠标绘制box高度</p><p>点击鼠标右键结束绘制</p>', '230px');
            } else {
                tooltip.showAt(' <p>点击鼠标左键开始绘制box底面</p>', '230px');
            }
        });
        handlerBox.drawEvt.addEventListener(e => {
            boxEntity = e.object;
            // let boxEntity = this.boxEntity;
            let newDim = boxEntity.box.dimensions.getValue();
            let position = boxEntity.position.getValue(0);
            let boxOption = {
                dimensions: newDim,
                position: position,
                clipMode: clipMode,
                heading: 0
            };

            //box编辑
            editorBox = new SuperMap3D.BoxEditor(scene, boxEntity);
            editorBox.editEvt.addEventListener(e => {
                boxEntity.box.dimensions = e.dimensions;
                boxEntity.position = e.position;
                boxEntity.orientation = e.orientation;
                setClipBox();
            });
            editorBox.activate();
            setAllLayersClipOptions(boxOption);
            tooltip.setVisible(false);
            handlerBox.clear();
            handlerBox.deactivate();
        });
        handlerBox.activate();
    };
    // 更新
    function setClipBox() {
        if (typeof boxEntity == "undefined") {
            return;
        }
        let newDim = boxEntity.box.dimensions.getValue();
        let position = boxEntity.position.getValue(0);

        let heading = 0;
        if (typeof boxEntity.orientation != "undefined") {
            let rotationM3 = SuperMap3D.Matrix3.fromQuaternion(
                boxEntity.orientation._value,
                new SuperMap3D.Matrix3()
            );
            let localFrame = SuperMap3D.Matrix4.fromRotationTranslation(
                rotationM3,
                SuperMap3D.Cartesian3.ZERO,
                new SuperMap3D.Matrix4()
            );
            let inverse = SuperMap3D.Matrix4.inverse(
                SuperMap3D.Transforms.eastNorthUpToFixedFrame(position),
                new SuperMap3D.Matrix4()
            );
            let hprm = SuperMap3D.Matrix4.multiply(
                inverse,
                localFrame,
                new SuperMap3D.Matrix4()
            );
            let rotation = SuperMap3D.Matrix4.getMatrix3(hprm, new SuperMap3D.Matrix3());
            let hpr = SuperMap3D.HeadingPitchRoll.fromQuaternion(
                SuperMap3D.Quaternion.fromRotationMatrix(rotation)
            );
            heading = hpr.heading;
        }
        let boxOptions = {
            dimensions: newDim,
            position: position,
            clipMode: clipMode,
            heading: heading
        };
        setAllLayersClipOptions(boxOptions);
    };
    //设置图层裁剪
    function setAllLayersClipOptions(boxOptions) {
        for (let i = 0, j = layers.length; i < j; i++) {
            layers[i].setCustomClipBox(boxOptions);
        }
    };
    //设置线颜色
    function setAllLayersClipColor() {
        for (let i = 0, j = layers.length; i < j; i++) {
            layers[i].selectEnabled = false;
            layers[i].clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
        }
    };
    // 清除
    function clearBoxClipByEitor() {
        if (handlerBox) {
            handlerBox.deactivate();
            tooltip.setVisible(false);
        }
        if (!boxEntity) {
            return;
        }
        for (let layer of layers) {
            layer.clearCustomClipBox();
        }
        boxEntity = undefined;
        editorBox.deactivate();
        scene.trackingLayer.removeAll();
        handlerBox.clear();
    };
    // 监听
    watch(() => state.clipModel, val => {
        switch (val) {
            case "ClipInside":
                clipMode = 'clip_behind_all_plane';
                break;
            case "ClipOutside":
                clipMode = 'clip_behind_any_plane';
                break;
            default:
                break;
        }
        if (boxEntity) {
            setClipBox();
        }
    });


    // 销毁
    onBeforeUnmount(() => {
        if (editorBox) {
            editorBox.destroy();
        }
        editorBox = undefined;
        layers = undefined;
        handlerBox = undefined;
        boxEntity = undefined;
    })

    return {
        ...toRefs(state),
        BoxClipByEitor,
        clearBoxClipByEitor
    };
};

export default clipBoxAnalysis

