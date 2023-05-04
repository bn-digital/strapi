import packageMetadata from "../package.json"

export const pluginId = packageMetadata.strapi.name

type ContentTypeUID = `plugin::${typeof pluginId}.${string}`
type ContentTypeUIDs<T extends string> = { [key in T]: ContentTypeUID }

export const contentTypeUIDs: ContentTypeUIDs<"email" | "emitter"> = {
  email: `plugin::${pluginId}.email`,
  emitter: `plugin::${pluginId}.emitter`,
}
