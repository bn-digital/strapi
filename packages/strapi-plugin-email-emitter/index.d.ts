// noinspection JSUnusedLocalSymbols

import { Strapi as StrapiInterface } from '@strapi/strapi/lib/types/core'
import { EntityService } from '@strapi/strapi/lib/services/entity-service'
export * from './email'
export * from './email-emitter'
export * from './email-designer'

interface Strapi extends StrapiInterface {
  log: {
    info(...params: string[]): void
    warn(...params: string[]): void
    error(...params: string[]): void
  }
  entityService: EntityService
}
