<template>
  <div>
    <nav>
      <NuxtLink to="/chat">Chat</NuxtLink>
      <NuxtLink to="/poker">Game</NuxtLink>
    </nav>
    <NuxtPage />
    <footer
      class="bg-gray-800 text-white py-4 fixed bottom-0 w-full text-center left-0 right-0"
    >
      <p>© 2024 My Web App. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 1em;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2em;
}

nav a:hover {
  text-decoration: underline;
}
</style>
