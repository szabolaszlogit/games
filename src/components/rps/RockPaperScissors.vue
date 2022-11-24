<script setup>
import { ref, reactive, computed, watch } from "vue";

const availableChoices = reactive([
  { name: "Scissors", icon: "✂️" },
  { name: "Paper", icon: "🧻" },
  { name: "Rock", icon: "💎" },
]);
let computerChoice = reactive({});
let playerChoice = reactive({});

let results = reactive([]);
let result = ref();

let computerPoints = ref(0);
let playerPoints = ref(0);

function setChoices(choice) {
  // object clone with reactivity?
  playerChoice.name = choice.name;
  playerChoice.icon = choice.icon;
  let computerChoiceTemp = availableChoices[Math.floor(Math.random() * 3)];
  computerChoice.name = computerChoiceTemp.name;
  computerChoice.icon = computerChoiceTemp.icon;

  setResult();
}

function setResult() {
  result = "Nice try";
  if (playerChoice.name === computerChoice.name) {
    result = "Draw";
  }

  if (
    (playerChoice.name === "Paper" && computerChoice.name == "Rock") ||
    (playerChoice.name === "Rock" && computerChoice.name === "Scissors") ||
    (playerChoice.name === "Scissors" && computerChoice.name === "Paper")
  ) {
    playerPoints.value = playerPoints.value + 1;
    result = "Winner";
  }

  if (result === "Nice try") {
    computerPoints.value = computerPoints.value + 1;
  }
  results.push({
    playerChoice: playerChoice.name,
    computerChoice: computerChoice.name,
    result: result,
  });
}

let ratio = computed(() =>
  Math.round((playerPoints.value / (results.length || 1)) * 100)
);

let draws = computed(() => results.filter((el) => el.result === "Draw").length);

let typeOfChoices = reactive({});
watch(results, () => {
  typeOfChoices.paper = results.filter(
    (el) => el.playerChoice === "Paper"
  ).length;
  typeOfChoices.scissors = results.filter(
    (el) => el.playerChoice === "Scissors"
  ).length;
  typeOfChoices.rock = results.filter(
    (el) => el.playerChoice === "Rock"
  ).length;
});
</script>

<template>
  <article class="">
    <h1 class="f4 bg-near-white br3 br--top black-60 mv3 pv4 ph3">
      Rock, paper, scissors
    </h1>
    <div class="flex justify-center ma3">
      <div class="bg-light-yellow pa3 tc">
        Computer choice:
        <span>{{ computerChoice.icon }} {{ computerChoice.name }}</span>
      </div>
      <div class="bg-light-blue pa3 tc">
        Player choice:
        <span v-if="playerChoice"
          >{{ playerChoice.icon }} {{ playerChoice.name }}</span
        >
      </div>
    </div>
    <div
      class="tc bg-animate pa4 f3"
      :class="{
        'bg-light-gray': result === 'Draw',
        'bg-light-green': result === 'Winner',
        'bg-light-red': result === 'Nice try',
      }"
    >
      {{ result || "Ready" }}
    </div>
    <div class="pa3">
      <button
        class="ma2 pointer f6 grow br-pill ph3 pv2 mb2 dib white bg-dark-green"
        v-for="choice in availableChoices"
        v-on:click="setChoices(choice)"
      >
        <span class="mr2">{{ choice.icon }}</span
        >{{ choice.name }}
      </button>
      <div class="bg-light-gray pa3 tc f3 lh-copy mt3">
        <div>Computer: {{ computerPoints }} points</div>
        <div>Player: {{ playerPoints }} points</div>
        <div>Winn rate: {{ ratio }}%</div>
      </div>

      <div class="bg-moon-gray pa3 tc f4 lh-copy mb3" v-if="results.length">
        <div>Nr. of choices: {{ results.length }}</div>
        <div>Nr. of draws: {{ draws }}</div>
        <div>
          Player choices: <br />
          Paper: {{ typeOfChoices.paper }}, rock: {{ typeOfChoices.rock }},
          scissors: {{ typeOfChoices.scissors }}
        </div>
      </div>
      <div class="flex flex-column flex-column-reverse">
        <div
          class="ph3 pv3 bb b--light-silver fade-in-text"
          v-for="(result, index) in results"
          :class="{
            'bg-light-gray': result.result === 'Draw',
            'bg-light-green': result.result === 'Winner',
            'bg-light-red': result.result === 'Nice try',
          }"
        >
          <span>
            {{ index }}. {{ result.playerChoice }} - {{ result.result }} -
            {{ result.computerChoice }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
