<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col h-125 border border-gray-300 rounded-md">
    <div
      class="flex-1 p-2 border-b border-gray-200 overflow-y-auto flex flex-col"
    >
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex items-start mb-2 pb-2 border-b border-gray-100"
      >
        <img
          :src="msg.avatar"
          alt="Avatar"
          class="w-10 h-10 rounded-full mr-2"
        />
        <div class="flex flex-col">
          <div class="font-bold mb-1">{{ msg.user }}</div>
          <div class="whitespace-pre-wrap">{{ msg.text }}</div>
        </div>
      </div>
    </div>
    <div class="flex border-t border-gray-200 p-2">
      <input
        v-model="message"
        class="flex-1 p-2 border rounded-md mr-2"
        placeholder="Type a message"
        @keyup.enter="sendMessage"
      />
      <button class="btn" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useNuxtApp } from "#app";

const message = ref("");
const messages = ref([]);
const { $socket: socket } = useNuxtApp();

const sendMessage = () => {
  if (message.value.trim()) {
    const user = {
      name: "User Name",
      avatar: "https://example.com/avatar.png",
    };
    socket.emit("chatMessage", message.value, user);
    message.value = "";
  }
};

onMounted(() => {
  socket.on("chatMessage", (msg) => {
    messages.value.push({ id: Date.now(), ...msg });
    const messageBox = document.querySelector(".message-box");
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  });
});

onBeforeUnmount(() => {
  socket.off("chatMessage");
});
</script>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
