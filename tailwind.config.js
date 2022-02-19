module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      dropShadow: {
        "3xl": "-10px 5px 26px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
