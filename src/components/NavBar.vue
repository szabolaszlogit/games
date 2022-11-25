<script setup>
import { reactive } from "vue";

const navItems = reactive([
  { to: "/", txt: "Home" },
  { to: "rps", txt: "Rock, paper, scissors" },
  {to: "memory", txt: "Memory Game"},
  {to: "mole", txt: "Mole"}
]);
</script>

<template>
  <nav class="pa3 pa4-ns">
    <a
      class="link dim black b f1 f-headline-ns tc db mb3 mb4-ns"
      href="#"
      title="Home"
      >Games</a
    >
    <div class="tc pb3">
      <nav>
        <RouterLink
          v-for="navItem in navItems"
          class="link dim gray f6 f5-ns dib mr3"
          :to="navItem.to"
          >{{ navItem.txt }}</RouterLink
        >
      </nav>
    </div>
  </nav>
</template>

<style></style>
