declare module "@strapi/typescript-utils" {
  namespace TypeScript {
    type Generator = {
      generateSchemasDefinitions(options: Pick<Global, "strapi"> & { outDir?: string; file?: string }): Promise<void>
    }
  }
  export const generators: TypeScript.Generator
}
