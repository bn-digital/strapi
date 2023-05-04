import { prefixPluginTranslations } from "@strapi/helper-plugin"
import UuidIcon from "./components/Uuid/UuidIcon"
import pluginId from "./pluginId"
import getTrad from "./utils/getTrad"

export default {
  register(app) {
    app.customFields.register({
      name: "uuid",
      pluginId,
      type: "string",
      icon: UuidIcon,
      intlLabel: {
        id: getTrad("form.label"),
        defaultMessage: "UUID",
      },
      intlDescription: {
        id: getTrad("form.description"),
        defaultMessage: "Generates a UUID v4",
      },
      components: {
        Input: async () => import("./components/Uuid/UuidInput"),
      },
      options: {
        base: [],
        advanced: [
          {
            intlLabel: {
              id: getTrad("form.field.regex"),
              defaultMessage: "The Regexp pattern to validate the UUID format.",
            },
            name: "regex",
            type: "text",
            defaultValue: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
            description: {
              id: getTrad("color-picker.options.advanced.regex.description"),
              defaultMessage: "The text of the regular expression",
            },
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: "private",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.privateField",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.privateField.description",
                  defaultMessage: "This field will not show up in the API response",
                },
              },
            ],
          },
        ],
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
      })
    )

    return Promise.resolve(importedTrads)
  },
}
