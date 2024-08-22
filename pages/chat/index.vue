<!-- pages/chat.vue -->
<template>
  <div>
    <Chat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chat from "~/components/Chat.vue";

export default defineComponent({
  components: {
    Chat,
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
