<script setup>
import { onMounted, reactive, ref } from "vue";

let images = reactive([
  { dataId: "1", src: "/pizzas/1.jpg", id: 1 },
  { dataId: "2", src: "/pizzas/2.jpg", id: 2 },
  { dataId: "3", src: "/pizzas/3.jpg", id: 3 },
  { dataId: "4", src: "/pizzas/4.jpg", id: 4 },
  { dataId: "5", src: "/pizzas/5.jpg", id: 5 },
  { dataId: "6", src: "/pizzas/6.jpg", id: 6 },
  { dataId: "1", src: "/pizzas/1.jpg", id: 7 },
  { dataId: "2", src: "/pizzas/2.jpg", id: 8 },
  { dataId: "3", src: "/pizzas/3.jpg", id: 9 },
  { dataId: "4", src: "/pizzas/4.jpg", id: 10 },
  { dataId: "5", src: "/pizzas/5.jpg", id: 11 },
  { dataId: "6", src: "/pizzas/6.jpg", id: 12 },
]);

let isActive = false;
let choosenImgs = [];

function getSelectedImg(e) {
  if (isActive === true) {
    return;
  }
  isActive = true;

  e.target.src = "/pizzas/" + e.target.dataset.id + ".jpg";

  if (e.target.attributes.src.nodeValue == "/pizzas/inactive.jpg") {
    isActive = false;
    return;
  }

  let choosenImg = { matchId: e.target.dataset.id, id: e.target.id };

  choosenImgs.push(choosenImg);

  if (choosenImgs.length < 2) {
    isActive = false;
    return;
  }

  if (
    choosenImgs[choosenImgs.length - 1].matchId ==
    choosenImgs[choosenImgs.length - 2].matchId
  ) {
    console.log("match");
    setTimeout(() => setInactive(), 2000);
  }
  if (
    choosenImgs[choosenImgs.length - 1].matchId !=
    choosenImgs[choosenImgs.length - 2].matchId
  ) {
    console.log("not match");
    setTimeout(() => flipBack(), 2000);
  }
}

function flipBack() {
  for (let index = 0; index < choosenImgs.length; index++) {
    let imgs = document.getElementById(choosenImgs[index].id);
    imgs.setAttribute("src", "/pizzas/back.jpg");
  }
  choosenImgs.length = 0;
  isActive = false;
}

function setInactive() {
  for (let index = 0; index < choosenImgs.length; index++) {
    let elem = document.getElementById(choosenImgs[index].id);
    elem.setAttribute("src", "/pizzas/inactive.jpg");
    elem.removeEventListener("click", getSelectedImg);
    console.log("removed");
  }
  choosenImgs.length = 0;
  isActive = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  setEventListeners();
}

function setEventListeners() {
  const boardImgs = document.querySelectorAll(".board img");
  for (let index = 0; index < boardImgs.length; index++) {
    boardImgs[index].addEventListener("click", getSelectedImg);
  }
}

onMounted(() => {
  shuffleArray(images);
});
</script>

<template>
  <div class="board ">
    <img
      class="ma3 ba"
      v-for="image in images"
      :id="image.id"
      :data-id="image.dataId"
      src="/pizzas/back.jpg"
    />
  </div>
</template>

<style scoped>

.board{
display: flex;
flex-wrap: wrap;
}


</style>
