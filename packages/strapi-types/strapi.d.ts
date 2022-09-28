export type { EntityService } from '@strapi/strapi/lib/services/entity-service'
export type { CollectionTypeService, SingleTypeService } from '@strapi/strapi/lib/core-api/service'

type LogLevel = 'info' | 'warn' | 'error'

type Primitive = string | number | null | boolean | unknown

type EnvVar<T = Primitive> = T

type EnvFunction = <T = EnvVar>(key: string, defaultValue?: T) => T

type TypedEnvFunction = Partial<{
  int(key: string, defaultValue?: number): number
  date(key: string, defaultValue?: Date): number
  float(key: number, defaultValue?: number): number
  bool(key: string, defaultValue?: boolean): boolean
  array<T = EnvVar>(key: string, defaultValue?: T[]): T[]
  json<T = { [key: string]: any }>(key: string, defaultValue?: T): T
}>

export type Env = { env: EnvFunction & TypedEnvFunction }

declare global {
  import { Strapi as StrapiInterface } from '@strapi/strapi/lib/types/core'

  export interface Strapi extends StrapiInterface {
    fs: {
      appendFile(path: string, content: Buffer | string): void
      removeAppFile(path: string): void
      writePluginFile(path: string, content: Buffer | string): void
      writeAppFile(path: string, content: Buffer | string): void
    }
    log: {
      [key in LogLevel]: (...args: unknown[]) => void
    }
    entityService: EntityService
  }

  export const strapi: Strapi

  export interface Global {
    strapi: Strapi
  }
}
