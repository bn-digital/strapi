// noinspection JSUnusedGlobalSymbols

declare namespace Strapi {
  export namespace Website {
    import { SchemaAttributes } from '@strapi/strapi'
    import { Schema } from '@strapi/strapi/lib/types/core/schemas'

    type ComponentUIDs = 'data.entry' | 'data.set' | 'shared.seo' | 'shared.meta-social'

    type Component = Schema

    type ComponentSchema = {
      attributes: SchemaAttributes
    }

    type WebsiteEntity = {
      id: string
    }
  }
}
