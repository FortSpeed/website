const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Optimize CSS output
      optimize: true,
    },
    // Add autoprefixer for better browser compatibility (if needed)
    // autoprefixer: {},
    // Add cssnano for production minification (if needed)
    // cssnano: process.env.NODE_ENV === 'production' ? {} : false,
  },
};

export default config;
