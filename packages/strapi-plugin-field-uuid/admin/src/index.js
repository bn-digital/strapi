import { prefixPluginTranslations } from '@strapi/helper-plugin'
import UuidIcon from './components/Uuid/UuidIcon'
import pluginId from './pluginId'

export default {
  register(app) {
    app.customFields.register({
      name: 'uuid',
      pluginId,
      type: 'uid',
      icon: UuidIcon,
      intlLabel: {
        id: 'field-uuid.form.label',
        defaultMessage: 'UUID',
      },
      intlDescription: {
        id: 'field-uuid.form.description',
        defaultMessage: 'Generates a UUID v4',
      },
      components: {
        Input: async () => import('./components/Uuid/UuidInput'),
      },
      options: {
        base: [],
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'private',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.privateField',
                  defaultMessage: 'Private field',
                },
                description: {
                  id: 'form.attribute.item.privateField.description',
                  defaultMessage: 'This field will not show up in the API response',
                },
              },
            ],
          },
        ],
        validator: () => {},
      },
    })
  },

  bootstrap(app) {},

  async registerTrads({ locales }) {
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
