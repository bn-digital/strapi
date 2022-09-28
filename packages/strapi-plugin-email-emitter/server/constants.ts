import packageMetadata from '../package.json'

export const pluginId = packageMetadata.strapi.name

type ContentTypeUID = `plugin::${typeof pluginId}.${string}`
type ContentTypeUIDs = { [key: string]: ContentTypeUID }

export const contentTypeUIDs: ContentTypeUIDs = {
  email: `plugin::${pluginId}.email`,
  emitter: `plugin::${pluginId}.emitter`,
}
