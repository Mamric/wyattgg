module.exports = {
    extends: ["eslint:recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "@next/next", "react-hooks"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    globals: {
        React: "readonly",
        JSX: "readonly",
        document: "readonly",
        window: "readonly",
        URL: "readonly",
        Blob: "readonly",
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@next/next/no-html-link-for-pages": "error",
        "@typescript-eslint/no-unused-vars": "warn",
    },
    ignorePatterns: ["node_modules/**", ".next/**", "dist/**"],
};
