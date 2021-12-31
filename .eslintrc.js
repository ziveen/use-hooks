module.exports = {
  extends: ["react-app", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "es5",
        tabWidth: 2,
        printWidth: 100,
        semicolons: false,
        quoteProps: "as-needed",
        jsxSingleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: "always",
        endOfLine: "lf",
      },
    ],
  },
};
