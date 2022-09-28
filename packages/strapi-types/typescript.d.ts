export namespace TypeScript {
  type Generator = {
    generateSchemasDefinitions(options: { strapi: Strapi.Strapi; outDir?: string; file?: string }): Promise<void>
  }
}
