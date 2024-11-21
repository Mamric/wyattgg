const js = require("@eslint/js");
const nextPlugin = require("@next/eslint-plugin-next");
const reactHooks = require("eslint-plugin-react-hooks");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
    {
        ignores: ["node_modules/**", ".next/**", "dist/**"],
    },
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            "react-hooks": reactHooks,
            "@typescript-eslint": typescript,
        },
        languageOptions: {
            parser: typescriptParser,
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
                console: "readonly",
                AudioContext: "readonly",
                AudioBuffer: "readonly",
                AudioBufferSourceNode: "readonly",
                AudioNode: "readonly",
                AudioDestinationNode: "readonly",
                webkitAudioContext: "readonly",
            },
        },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "@next/next/no-html-link-for-pages": "error",
            "@typescript-eslint/no-unused-vars": ["warn", {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }],
        },
    },
];