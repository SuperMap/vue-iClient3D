
// 引入依赖
import { reactive, toRefs, onBeforeUnmount} from "vue";
import tool from '../../../js/tool/tool.js'        //提示等工具
import resource from '../../../js/local/lang.js'  //语言资源

function particleSystem(props) {
    // 设置默认值数据
    let state = reactive({
        particles: [
            {
                id: 0,
                iconfont: "iconhuoyan",
                particleName: "火焰"
            },
            {
                id: 1,
                iconfont: "iconshui",
                particleName: "水"
            },
            {
                id: 2,
                iconfont: "iconyanhua",
                particleName: "烟花"
            },
          
        ],
        particleSelectedId: 0,
    })

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


    // 销毁
    onBeforeUnmount(() => {

    });


    return {
        ...toRefs(state),
    };
};

export default particleSystem

