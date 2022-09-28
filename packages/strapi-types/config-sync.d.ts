export namespace ConfigSync {
  type Plugin = {
    service<T = MainService>(name: 'main'): T
  }
  interface MainService {
    importAllConfig(): void
    exportAllConfig(): void
  }
}
