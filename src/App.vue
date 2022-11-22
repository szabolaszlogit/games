<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import RockPaperScissors from "./components/rps/RockPaperScissors.vue";

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
  <button
    class="ma2 pointer f6 grow br-pill ph3 pv2 mb2 dib white bg-dark-green"
    v-on:click="forceRerender()"
  >
    Reset
  </button>
  <section>
    <rock-paper-scissors :key="componentKey"></rock-paper-scissors>
  </section>
  <RouterView />
</template>

<style scoped>

</style>
