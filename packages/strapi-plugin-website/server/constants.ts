import packageMetadata from '../package.json'

export const pluginId = packageMetadata.strapi.name

type EntityUID = 'website'

type ContentTypeUID = `plugin::${typeof pluginId}.${EntityUID}`

type ContentTypeUIDs = { [key in EntityUID]: ContentTypeUID }

export const contentTypeUIDs: ContentTypeUIDs = {
  website: `plugin::${pluginId}.website`,
}
