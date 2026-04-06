// What: PostCSS pipeline entry for Tailwind CSS v4.
// Why: Lets Next build process @import tailwind in globals.css.
// How: Registers @tailwindcss/postcss as sole plugin object.
// Deps: @tailwindcss/postcss package only.

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
