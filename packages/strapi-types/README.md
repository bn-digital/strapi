# Strapi: Type Definitions

This package includes additional Strapi types, including plugins and entities.

## Installation

1. Install package 

```bash
yarn add --dev "@bn-digital/strapi-types"
```

2. Add package to `tsconfig.json` in Strapi working directory:

```json
{
  "extends": "@strapi/typescript-utils/tsconfigs/server",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": ".",
    "resolveJsonModule": true,
    "types": ["@bn-digital/strapi-types"]
  },
  "include": ["./", "src/**/*.json"],
  "exclude": ["node_modules/", "build/", "dist/", ".cache/", ".tmp/", "src/admin/", "**/*.test.ts", "src/plugins/**"]
}
```
