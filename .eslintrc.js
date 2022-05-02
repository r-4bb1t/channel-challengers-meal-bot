module.exports = {
  extends: [
    'airbnb-typescript/base'
  ],
  plugins: [
    'import',
  ],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
}

