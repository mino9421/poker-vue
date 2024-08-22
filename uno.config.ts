import { defineConfig } from "unocss";

export default defineConfig({
  theme: {
    colors: {
      primary: "#0070f3", // Example primary color if needed
      secondary: "#ff4081", // Example secondary color
      "gray-800": "#333", // Example gray color if needed
      "teal-600": "#319795", // Teal color for your button
      "teal-700": "#2c7a7b", // Darker teal for hover
      // Add other colors as needed
      "dark-bg": "#222222",
      "light-bg": "#ffffff",
      "dark-text": "#ffffff",
      "light-text": "#000000",
    },
  },
  shortcuts: [
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50 no-underline",
    ],
    [
      "icon-btn",
      "inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
  ],
});
