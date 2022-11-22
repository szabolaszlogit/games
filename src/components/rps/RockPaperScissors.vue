<script setup>
import { ref, computed } from "vue";

const availableChoices = ref([
  { name: "Scissors", icon: "✂️" },
  { name: "Paper", icon: "🧻 " },
  { name: "Rock", icon: "💎" },
]);
let computerChoice = ref("");
let playerChoice = ref("");

function setChoices(choice) {
  playerChoice.value = choice;
  computerChoice.value = availableChoices.value[Math.floor(Math.random() * 3)];
}

let result = computed(() => {
  if (playerChoice.value === computerChoice.value) return "Draw";
  if (playerChoice.value === "paper" && computerChoice.value === "rock")
    return "Winner";
  if (playerChoice.value === "rock" && computerChoice.value === "scissors")
    return "Winner";
  if (playerChoice.value === "scissors" && computerChoice.value === "paper")
    return "Winner";
  return "Nice try";
});
</script>

<template>
  <div class="">
    Computer choice:
    <span  class="fade-in-text">{{ computerChoice.icon }} {{ computerChoice.name }}</span>
  </div>
  <div>
    Player choice: <span>{{ playerChoice.icon }} {{ playerChoice.name }}</span>
  </div>
  <button
    class="ma2 pointer f6 grow br-pill ph3 pv2 mb2 dib white bg-dark-green"
    v-for="choice in availableChoices"
    v-on:click="setChoices(choice)"
  >
    <span class="mr2">{{ choice.icon }}</span>{{ choice.name }}
  </button>
  <div>
    Result: <span>{{ result }}</span>
  </div>
</template>

<style scoped>
.fade-in-text {
  animation: fadeIn 5s;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
