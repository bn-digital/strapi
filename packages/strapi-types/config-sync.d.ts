namespace ConfigSync {
  interface Plugin extends Strapi.GenericPlugin {
    service<T = MainService>(name: "main"): T
  }
  interface MainService {
    importAllConfig(): void
    exportAllConfig(): void
  }
}
