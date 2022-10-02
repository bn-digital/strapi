import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginId from './pluginId'

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name: 'Website',
    })
  },

  async registerTrads(app) {
    const { locales } = app

    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      }),
    )

    return Promise.resolve(importedTrads)
  },
}
