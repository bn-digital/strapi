// noinspection JSUnusedLocalSymbols

export * from './website'

declare global {
  import { Strapi as StrapiBase } from '@strapi/strapi/lib/types/core/strapi'
  import { EntityService } from '@strapi/strapi/lib/services/entity-service'
  import { ComponentSchema, ContentTypeSchema } from '@strapi/strapi/lib/types/core/schemas'

  interface StrapiInterface extends Omit<StrapiBase, 'log' | 'fs' | 'entityService' | 'contentTypes'> {
    log: {
      info(...params: string[]): void
      warn(...params: string[]): void
      error(...params: string[]): void
    }
    entityService: EntityService
    components: { [key: string]: ComponentSchema & { uid: keyof Strapi.ComponentUIDs; category: string } }
    contentTypes: { [key: string]: ContentTypeSchema & { uid: keyof Strapi.ContentTypeUIDs; globalId: string } }
  }

  export type Strapi = StrapiInterface

  export const strapi: Strapi
}
