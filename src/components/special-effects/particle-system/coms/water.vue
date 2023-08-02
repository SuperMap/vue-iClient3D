<template>
    <div class="sm-function-module-sub-section" v-stopdrag style="margin:0">

        <div class="sm-half-L">
            <label class="label-S">发射类型</label>
            <select class="sm-select-m" v-model="state.selectedType">
                <option selected value="Cone">{{ Resource.coneEmit }}</option>
                <option value="Sphere">{{ Resource.sphereEmit }}</option>
                <option value="Box">{{ Resource.boxEmit }}</option>
            </select>
        </div>

        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.particleNumber }}</label>
            <el-slider v-model="state.emitRate" :min="1" :max="2500" :step="20" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.particleSize }}</label>
            <el-slider v-model="state.particleSize" :min="1" :max="60" :step="1" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.lifeCycle }}</label>
            <el-slider v-model="state.lifeRange" :step="1" range :min="0.1" :max="30" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.speedRange }}</label>
            <el-slider v-model="state.speedRange" :step="1" range :min="1" :max="30" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.scaleRange }}</label>
            <el-slider v-model="state.scaleRange" :step="1" range :min="1" :max="10" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

        <div class="sm-half-L ">
            <label style="width: 35%;">{{ Resource.gravity }}</label>
            <el-slider v-model="state.gravity" :step="1" :min="-20" :max="20" input-size="mini" :debounce="500"
                tooltip-class="tooltip-class" style="width:63%"></el-slider>
        </div>

    </div>

    <div class="boxchild">
        <button type="button" class="tbtn" v-on:click="add">{{ Resource.addParticle }}</button>
        <button type="button" class="tbtn tbtn-margin-left" @click="clear">{{ Resource.clearParticle }}</button>
    </div>
</template>
      
<script setup>
import { reactive, onBeforeUnmount, watch } from "vue";

const scene = viewer.scene;

// 初始化数据
let state = reactive({
    selectedType: "Cone",
    selectedId: 0,
    showEditCheck: true,
    setParam: false,
    emitRate: 1500,
    particleSize: 1,
    lifeRange: [1, 4],
    speedRange: [6, 7],
    scaleRange: [1, 4],
    gravity: -8.0,
});

let waterUrl = 'public/data/particle/fountain.json';
let modelMatrix = new SuperMap3D.Matrix4();
let particle_water, clickHandle;

// 加载粒子文件
function loadParticleFile(url) {
    SuperMap3D.ParticleHelper.fromJsonUrl(url, scene).then(function (particleSystem) {
        particle_water = particleSystem;
        particle_water.modelMatrix = modelMatrix;
        // scene.primitives.add(particle_water); // 注释避免报错
        particle_water.start();
    });
}

// 添加粒子
function add() {
    clickHandle = new SuperMap3D.ScreenSpaceEventHandler(viewer.scene.canvas);
    clickHandle.setInputAction(function (click) {
        let centerPosition = viewer.scene.pickPosition(click.position);
        SuperMap3D.Transforms.eastNorthUpToFixedFrame(centerPosition, undefined, modelMatrix);
        loadParticleFile(waterUrl);
        clickHandle.removeInputAction(SuperMap3D.ScreenSpaceEventType.LEFT_CLICK)//移除事件
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
}

function clear() {
    // particle_water.clearAll();
    if (!SuperMap3D.defaultValue(particle_water)) return;
    scene.primitives.remove(particle_water);
    // clickHandle.distory();
    // scene.primitives.removeAll();
};

watch(
    () => state.selectedType,
    val => {
        if (!particle_water) return;
        switch (val) {
            case "Cone":
                particle_water.createConeEmitter(1.0, 1.05);
                break;
            case "Sphere":
                particle_water.createSphereEmitter(1.0);
                break;
            case "Box":
                var direction1 = new SuperMap3D.Cartesian3(-1, 1, 1);
                var direction2 = new SuperMap3D.Cartesian3(1, 1, -1);
                var minBox = new SuperMap3D.Cartesian3(-10, 0, -10);
                var maxBox = new SuperMap3D.Cartesian3(10, 0, 10);
                particle_water.createBoxEmitter(direction1, direction2, minBox, maxBox);
                break;
        }
    }
);

watch(
    () => state.emitRate,
    val => {
        if (!particle_water) return;
        particle_water['emitRate'] = Number(val);
    }
);
watch(
    () => state.particleSize,
    val => {
        if (!particle_water) return;
        particle_water.minScaleX = Number(val);
        particle_water.minScaleY = Number(val);
        particle_water.maxScaleX = Number(val);
        particle_water.maxScaleY = Number(val);
    }
);

watch(
    () => state.lifeRange,
    val => {
        if (!particle_water) return;
        if (val.length > 1) {
            // console.log("生命周期:",val);
            particle_water["minLifeTime"] = Number(val[0]);
            particle_water["maxLifeTime"] = Number(val[1]);
        }
    }
);

watch(
    () => state.speedRange,
    val => {
        if (!particle_water) return;
        if (val.length > 1) {
            // console.log("速度范围:",val);
            particle_water["minEmitPower"] = Number(val[0]);
            particle_water["maxEmitPower"] = Number(val[1]);
        }
    }
);

watch(
    () => state.scaleRange,
    val => {
        if (!particle_water) return;
        if (val.length > 1) {
            // console.log("比例范围:",val);
            particle_water["minSize"] = Number(val[0]);
            particle_water["maxSize"] = Number(val[1]);
        }
    }
);

watch(
    () => state.gravity,
    val => {
        if (!particle_water) return;
        particle_water.gravity = new SuperMap3D.Cartesian3(0, 0, Number(val));
    }
);


onBeforeUnmount(() => {
    clear();
});

</script>
      
<style lang="scss" scoped></style>
      
      
      
      
      
      