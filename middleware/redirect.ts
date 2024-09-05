// Redirect to the poker game page when the root page is visited
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/") {
    return navigateTo("/poker");
  }
});
// TODO: integrate this to work as a route middleware and other middlewares experimentally

// Nuxt.js middleware for redirecting to the poker game page when the root page is visited
