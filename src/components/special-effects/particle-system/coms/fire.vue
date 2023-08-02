<template>
    <div class="sm-function-module-sub-section" v-stopdrag style="margin:0">
        <!-- 参数设置 -->
        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.emitSpeed }}</label>
            <el-slider v-model="state.emitRate" :min="1" :max="2500" :step="20" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L">
            <label style="width: 35%;">{{ Resource.lifeCycle }}</label>
            <el-slider v-model="state.lifeRange" :step="0.001" range :min="0.005" :max="0.25" input-size="mini"
                :debounce="500" tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L">
            <label style="width: 35%;">{{ Resource.speedRange }}</label>
            <el-slider v-model="state.speedRange" :step="1" range :min="1" :max="100" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L">
            <label style="width: 35%;">{{ Resource.scaleRange }}</label>
            <el-slider v-model="state.scaleRange" :step="1" range :min="1" :max="100" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>
    </div>
    <div class="boxchild">
        <button type="button" class="tbtn" v-on:click="add">{{ Resource.addParticle }}</button>
        <button type="button" class="tbtn tbtn-margin-left" @click="clear">{{ Resource.clearParticle }}</button>
    </div>
</template>
      
<script setup name="Fire">
import { reactive, onBeforeUnmount, watch } from "vue";

const scene = viewer.scene;

// 初始化数据
let state = reactive({
    selectedType: "NONE",
    selectedId: 0,
    showEditCheck: true,
    emitRate: 50,
    lifeRange: [0.005, 0.25],
    speedRange: [1, 10],
    scaleRange: [1, 10],
    gravity: 0,
});

let fireUrl = 'public/data/particle/Fire.json';
let modelMatrix = new SuperMap3D.Matrix4();
let particle, clickHandle;

// onMounted(() => {
//   init();
// })

// function init() {
//   loadParticleFile(fireUrl);
// }


// 加载粒子文件
function loadParticleFile(url) {
    SuperMap3D.ParticleHelper.fromJsonUrl(url, scene).then(function (particleSystem) {
        particle = particleSystem;
        particle.modelMatrix = modelMatrix;
        // scene.primitives.add(particle); // 注释避免删除报错
        // particle.start();
    });
}

// 立体火焰 环形火 爆炸火 喷泉
function add() {
    clickHandle = new SuperMap3D.ScreenSpaceEventHandler(viewer.scene.canvas);
    clickHandle.setInputAction(function (click) {
        let centerPosition = viewer.scene.pickPosition(click.position);
        SuperMap3D.Transforms.eastNorthUpToFixedFrame(centerPosition, undefined, modelMatrix);
        loadParticleFile(fireUrl);
        clickHandle.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK)//移除事件
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
}

function clear() {
    // particle.clearAll();
    if (!SuperMap3D.defaultValue(particle)) return;
    scene.primitives.remove(particle);
    // clickHandle.distory();
    // scene.primitives.removeAll();
};

watch(
    () => state.emitRate,
    val => {
        if (!particle) return;
        particle['emitRate'] = Number(val);
    }
);

watch(
    () => state.lifeRange,
    val => {
        if (val.length > 1) {
            // console.log("生命周期:",val);
            particle["minLifeTime"] = Number(val[0]);
            particle["maxLifeTime"] = Number(val[1]);
        }
    }
);

watch(
    () => state.speedRange,
    val => {
        if (val.length > 1) {
            // console.log("速度范围:",val);
            particle["minEmitPower"] = Number(val[0]);
            particle["maxEmitPower"] = Number(val[1]);
        }
    }
);

watch(
    () => state.scaleRange,
    val => {
        if (val.length > 1) {
            // console.log("比例范围:",val);
            particle["minSize"] = Number(val[0]);
            particle["maxSize"] = Number(val[1]);
        }
    }
);


onBeforeUnmount(() => {
    clear();
});

</script>

      
      
      
      
      
      