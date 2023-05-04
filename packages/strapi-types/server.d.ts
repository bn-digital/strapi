import { Context, Middleware } from "koa"
import { Strapi } from "./strapi"

export declare namespace Server {
  export interface Route {
    methods: string[]
    opts: { ignoreCaptures: boolean; prefix?: string }
    path: string
  }

  namespace Middleware {
    type CspDirectiveType = "default-src" | "script-src" | "style-src" | "connect-src" | "img-src" | "frame-src"
    type CspDirectives = { [key in CspDirectiveType]: string[] }
    type Definition<ID = Strapi.MiddlewareUID, T = unknown> =
      | { config?: T; name: ID; resolve?: string }
      | Middleware<Context>
      | ID
  }
}
