const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".primary-btn": `rounded-md border border-slate-300 dark:border-slate-600 p-3`,
        ".rounded-input": `border border-slate-300 dark:border-slate-600 mx-auto rounded-full px-4 py-2 mb-6 w-11/12 text-lg text-center text-slate-500`,
      });
    }),
  ],
};
