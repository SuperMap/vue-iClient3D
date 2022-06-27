
// 引入依赖
import { watch, reactive, toRefs, onBeforeUnmount } from "vue";
import tool from '../../../js/tool/tool.js'        //提示等工具
import resource from '../../../js/local/lang.js'  //语言资源
import { storeState } from '../../../js/store/store.js'   //简单局部状态管理
import createTooltip from '../../../js/tool/tooltip.js'

function openness(props) {

    // 设置默认值数据
    let state = reactive({
        addHeight: 1,  //附加高度
        viewPosition: null,  //分析位置
        viewDomeRadius: 100,   //分析半径
        domeType: "ALLDOME",   //分析类型
        isClosed: false,  //是否封口
        visibleAreaColor: "rgba(9,199,112,0.5)",   //可见区颜色
        hiddenAreaColor: "rgba(238,114,22,0.5)",   //不可见颜色
        startAngle: 0,   //开始角度
        endAngle: 360,    //终止角度
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
    let scene, viewDome, Entypositions, tipFlag = true;
    if (storeState.isViewer) {
        if (!window.tooltip) {
            window.tooltip = createTooltip(document.body);
        }
        init();
    }
    //viewer 初始化完成的监听
    watch(() => storeState.isViewer, val => {
        if (val) {
            if (!window.tooltip) {
                window.tooltip = createTooltip(document.body);
            }
            init();
        }
    });
    function init() {
        //初始化
        viewDome = new SuperMap3D.ViewDome(scene); //构造新的开敞度分析对象
        viewDome.viewPosition = [0, 0, 0]; //初始化视点位置
        viewDome.distance = Number(state.viewDomeRadius); //可视距离
        viewDome.domeType = SuperMap3D.ViewDomeType[state.domeType]; //开敞度类型,分为可视部分、不可视部分, 全部显示
        viewDome.visibleAreaColor = SuperMap3D.Color.fromCssColorString(
            state.visibleAreaColor
        ); //可视部颜色
        viewDome.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(
            state.hiddenAreaColor
        ); //隐藏部分颜色
        viewDome.startAngle = Number(state.startAngle); //起始角度
        viewDome.endAngle = Number(state.endAngle); //终止角度
        viewDome.isClosed = state.isClosed; //封口
        viewDome.build(); //执行开敞度分析
    };

    /*
     ***分析模块***
    */


    //分析

    function analysis() {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        if (tipFlag) {   //只提示一次
            window.tooltip.showAt(' <p>点击鼠标左键确认分析位置</p>', '250px');
            tipFlag = false
        }
        addPoint();
        //鼠标左键事件监听
        scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
        scene.eventManager.addEventListener("MOUSE_MOVE", MOUSE_MOVE, true);
    };

    //   点击左键确认观察者点
    function LEFT_CLICK(e) {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        //获取点击位置笛卡尔坐标
        let position = scene.pickPosition(e.message.position);
        //将笛卡尔坐标转化为经纬度坐标
        let positions = tool.CartesiantoDegrees(position);
        positions[2] += Number(state.addHeight);
        //点击位置同步到显示框
        state.viewPosition = {
            longitude: positions[0].toFixed(6),
            latitude: positions[1].toFixed(6),
            height: positions[2].toFixed(2),
        };
        viewDome.viewPosition = positions;
        viewDome.build();
        window.tooltip.setVisible(false);
        scene.eventManager.removeEventListener("CLICK", LEFT_CLICK);
        scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE);
        viewDome.startAngle = Number(state.startAngle); //改变属性后，加上才能更新效果（应该是缺陷）
    };

    function addPoint() {
        scene.trackingLayer.removeById('opennessPoint');
        scene.trackingLayer.add({
            id: 'opennessPoint',
            point: new SuperMap3D.PointGraphics({
                color: SuperMap3D.Color.fromCssColorString('rgba(238,114,22,1)'),
                pixelSize: 8
            }),
            // position: p
            position: new SuperMap3D.CallbackProperty(() => {
                return Entypositions;
            }, false),
        });
    }

    // 鼠标移动实时分析
    function MOUSE_MOVE(e) {
        Entypositions = scene.pickPosition(e.message.endPosition);
    }

    //改变经纬度动态移动
    function move(val) {

    };

    // 清除
    function clear() {
        scene.trackingLayer.removeById('opennessPoint');
        document.body.classList.remove("measureCur");
        window.tooltip.setVisible(false);
        state.viewPosition = null;
        // viewDome.clear()
        viewDome.viewPosition = [0, 0, 0]; //初始化视点位置
        viewDome.startAngle = Number(state.startAngle); //起始角度
    };

    // 监听
    watch(() => state.viewDomeRadius, val => {
        if (val == "") return;
        viewDome.distance = Number(val);
    });
    watch(() => state.domeType, val => {
        if (val == "") return;
        viewDome.domeType = SuperMap3D.ViewDomeType[val];
    });
    watch(() => state.isClosed, val => {
        if (val == "") return;
        viewDome.isClosed = val;
    });
    watch(() => state.startAngle, val => {
        if (val == "") return;
        viewDome.startAngle = Number(val);
    });
    watch(() => state.endAngle, val => {
        if (val == "") return;
        viewDome.endAngle = Number(val);
    });
    watch(() => state.visibleAreaColor, val => {
        if (val == "") return;
        let VisibleColor = SuperMap3D.Color.fromCssColorString(val);
        viewDome.visibleAreaColor = VisibleColor;
    });
    watch(() => state.hiddenAreaColor, val => {
        if (val == "") return;
        let HiddenColor = SuperMap3D.Color.fromCssColorString(val);
        viewDome.hiddenAreaColor = HiddenColor;
    });
    watch(() => state.addHeight, (val, oldval) => {
        let h = val - oldval;
        h = SuperMap3D.defaultValue(h, 0);
        viewDome.viewPosition[2] += Number(h);
        Entypositions = SuperMap3D.Cartesian3.fromDegrees(viewDome.viewPosition[0], viewDome.viewPosition[1], viewDome.viewPosition[2]);
        viewDome.startAngle = Number(state.startAngle)
    });


    // 销毁
    onBeforeUnmount(() => {
        clear();
        viewDome.destroy();
        viewDome = undefined;
    })

    return {
        ...toRefs(state),
        analysis,
        clear
    };
};

export default openness

