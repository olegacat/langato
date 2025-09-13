import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // Warn on console.log usage to avoid leaving debug logs in production
      'no-console': 'warn',

      // Warn on debugger usage to avoid leaving breakpoints
      'no-debugger': 'warn',

      // Warn about unused variables to keep the code clean
      'no-unused-vars': 'warn',

      // Warn about empty functions to prevent forgotten or incomplete methods
      'no-empty-function': 'warn',

      // Prefer const for variables that are never reassigned
      'prefer-const': 'warn',

      // Require strict equality checks (=== and !==) to avoid type coercion bugs
      eqeqeq: 'warn',

      // Warn on "magic numbers" without explanation
      'no-magic-numbers': ['warn', { ignore: [0, 1] }],

      // Require functions to consistently return a value
      'consistent-return': 'warn',

      // Prevent duplicate imports to keep imports clean
      'no-duplicate-imports': 'error',

      // TypeScript-specific rules
      '@typescript-eslint/no-explicit-any': 'error', // disallow any
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true, // allow arrow functions (like components)
          allowTypedFunctionExpressions: true, // allow const fn: () => number
          allowHigherOrderFunctions: true, // HOFs can infer return type
          allowConciseArrowFunctionExpressionsStartingWithVoid: true, // allow () => {}
        },
      ],

      '@typescript-eslint/explicit-module-boundary-types': [
        'warn',
        {
          allowArgumentsExplicitlyTypedAsAny: false,
          allowDirectConstAssertionInArrowFunctions: true, // allows const fn = () => {}
        },
      ],
      '@typescript-eslint/no-inferrable-types': 'warn', // disallow explicit types where TS can infer
    },
  },
];

export default eslintConfig;
