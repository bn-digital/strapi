export namespace ImportExport {
  type ImportOptions = { slug: Strapi.CollectionTypeUIDs | Strapi.SingleTypeUIDs; format: 'csv' | 'json' | 'jso'; user: string; idField: string }
  type ImportService = {
    importData<T>(
      dataRaw: unknown[],
      options: Partial<ImportOptions>,
    ): Promise<{
      failures: {
        error: Error
        data: object
      }[]
    }>
  }
}
