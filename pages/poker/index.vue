<!-- pages/game.vue -->
<template>
  <div>
    <Game />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Game from "~/components/Game.vue";

export default defineComponent({
  components: {
    Game,
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
