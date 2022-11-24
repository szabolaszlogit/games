<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
let componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};
</script>

<template>
  <div class="center avenir mw7-ns">
    <nav-bar></nav-bar>
    <button
      v-if="$route.name !== 'home'"
      class="ma2 pointer f6 grow br-pill ph3 pv2 mb2 dib white bg-dark-green"
      v-on:click="forceRerender()"
    >
      Reset
    </button>
    <router-view :key="componentKey" />
  </div>
  <footer-bar />
</template>

<style scoped></style>
