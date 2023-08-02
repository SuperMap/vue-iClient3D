<template>
    <div id="scan-effect-panel" class="sm-panel" v-drag>
      <div class="sm-function-module-sub-section" style="margin:0" v-stopdrag>
        <div class="sm-half-L symbolic">
          <div
            v-for="particle in particles"
            :key="particle.id"
            class="symbolic-box"
            :class="{ 'theme-color': particle.id ===particleSelectedId }"
            @click="particleSelectedId = particle.id"
          >
            <span class="iconfont" :class="particle.iconfont"></span>
            <label style="width:100%">{{particle.particleName}}</label>
          </div>
        </div>
        <div v-if="particleSelectedId ===0">
          <Fire></Fire>
        </div>
        <div v-if="particleSelectedId ===1">
          <Water></Water>
        </div>
        <div v-if="particleSelectedId ===2">
          <FireWorks></FireWorks>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import particleSystem from "./particle-system";
  import Fire from "./coms/fire.vue"
  import Water from "./coms/water.vue"
  import FireWorks from "./coms/fireworks.vue"
  
  export default {
    name: "Sm3dParticleSystem",
    props: {
     
    },
    data() {
      return {};
    },
    setup(props) {
      let {
        particles,
        particleSelectedId,
      } = particleSystem(props);
      
      return {
        particles,
        particleSelectedId,
        Fire,
        Water,
        FireWorks
      };
      
    }
  };
  </script>
  
  