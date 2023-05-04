declare namespace Config {
  type App = {
    server: Config.Server
    admin: Admin
    database: Database.Config
    api: Api
    get(path: string): any
  }
  type Server = {
    host: string
    port: number
    proxy?: boolean
    cron?: { enabled: boolean; tasks: { [key: string]: unknown } }
    admin?: { autoOpen?: boolean }
    dirs?: { public?: string }
    url?: string
    app: { keys: string[] }
  }
  type Admin = {
    auth: { secret: string }
    apiToken: { salt: string }
    watchIgnoreFiles?: string[]
    forgotPassword?: {
      from: string
      replyTo: string
      emailTemplate: unknown
    }
    url?: string
    path?: string
  }
  type Api = {
    rest: {
      prefix: string
      defaultLimit: number
      maxLimit: null
      withCount: boolean
    }
  }
  type Plugin = { [key: string]: { enabled: boolean; resolve?: string; config?: Record<string, unknown> } }
}
