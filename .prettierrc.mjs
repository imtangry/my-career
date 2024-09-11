/**
 * @type {import('prettier').Options}
 */
export default {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: false,
  semi: false,
  experimentalTernaries: false,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  singleAttributePerLine: true,
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  proseWrap: 'preserve',
  insertPragma: false,
  printWidth: 80,
  requirePragma: false,
  tabWidth: 2,
  useTabs: false,
  embeddedLanguageFormatting: 'auto',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '', // Empty line
    '^@plasmo/(.*)$',
    '',
    '^@plasmohq/(.*)$',
    '',
    '^~(.*)$',
    '',
    '^[./]'
  ]
}
