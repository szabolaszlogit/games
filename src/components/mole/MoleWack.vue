<script setup>
import { computed, ref } from "vue";

let randomPos = ref(0);
let points = ref(0);
let hit = ref(false);
let speed = ref(3);
let time = ref(15);

function clickHandler(e) {
  points.value = points.value + 1;
  hit.value = true;
  e.target.style.backgroundImage = "ur('/mole/boom.png')";
}

function generateRandomPos() {
  hit.value = false;
  randomPos.value = Math.floor(Math.random() * 9) + 1;
}
let startInterval;
let timeInterval;
function startGame() {
  points.value = 0;
  startInterval = setInterval(generateRandomPos, calculatedSpeed.value);
  timeInterval = setInterval(setCountdown, 1000);
}

function setCountdown() {
  if (time.value == 0) {
    clearInterval(startInterval);
    clearInterval(timeInterval);
    randomPos.value = 0;
    time.value = 15;
    return;
  }
  setInterval((time.value = time.value - 1), 1000);
}

let calculatedSpeed = computed(() => 3000 / speed.value);
</script>

<template>
  <div class="tc">Score: {{ points }} 💥</div>

  <div class="grid">
    <!-- format error -->
    <div
    v-for="i in 9"
    class="grid-item" 
    :class="((randomPos === i) ? 'grid-item-mole' : ''), ((hit === true && randomPos === i) ? 'grid-item-mole-hit' : '')"
    v-on="randomPos === i ? { click: clickHandler } : {}"
    :id="i"
  ></div>
  </div>
  <div v-if="randomPos == 0">
    <button
      class="ma2 pointer f6 grow br-pill ph3 pv2 mb2 dib white bg-dark-green"
      v-on:click="startGame()"
    >
      Start
    </button>
    <div class="ma3">
      <div>Speed: {{ speed }}</div>
      <input type="range" name="Speed" min="1" max="10" v-model="speed" />
      <div>Time: {{ time }}</div>
      <input type="range" name="time" min="10" max="30" v-model="time" />
    </div>
  </div>
  <div class="ma3" v-else>Time: {{ time }}, speed: {{ speed }}</div>
</template>

<style scoped>
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: crosshair;
}

.grid-item {
  height: 200px;
  width: 200px;
  border: solid 1px grey;
  margin: 0.5rem;
}

.grid-item-mole {
  height: 200px;
  width: 200px;
  border: solid 1px grey;
  margin: 0.5rem;
  background-image: url(/mole/mole.png);
  background-repeat: no-repeat;
  background-position: center;
}

.grid-item-mole-hit {
  height: 200px;
  width: 200px;
  border: solid 1px grey;
  margin: 0.5rem;
  background-image: url(/mole/boom.png);
  background-repeat: no-repeat;
  background-position: center;
}

@media screen and (max-width: 992px) {
  .grid-item {
    height: 100px;
    width: 100px;
  }
}
</style>
