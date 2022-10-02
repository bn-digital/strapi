import seoComponent from '../components/shared/seo.json'
import metaSocialComponent from '../components/shared/meta-social.json'
import dataSetComponent from '../components/data/set.json'
import dataEntryComponent from '../components/data/entry.json'

export default {
  getComponent(name: Strapi.Website.ComponentUIDs): Strapi.Website.Component | null {
    const component = strapi.components[name]
    return component ? { attributes: component.attributes, category: component.category } : null
  },
  getContentTypes(): { collectionTypes: Strapi.Website.Component[]; singleTypes: Strapi.Website.Component[] } | null {
    const contentTypes = strapi.contentTypes
    const keys = Object.keys(contentTypes)
    let collectionTypes: Strapi.Website.Component[] = []
    let singleTypes: Strapi.Website.Component[] = []
    keys.forEach(name => {
      if (name.includes('api::')) {
        const object: Strapi.Website.Component = {
          uid: contentTypes[name].uid,
          kind: contentTypes[name].kind,
          globalId: contentTypes[name].globalId,
          attributes: contentTypes[name].attributes,
        }
        contentTypes[name].kind === 'collectionType' ? collectionTypes.push(object) : singleTypes.push(object)
      }
    })

    return { collectionTypes, singleTypes } || null
  },
  async createComponents() {
    const components: Partial<{ [key in Strapi.Website.ComponentUIDs]: Strapi.Website.Component }> = {
      'shared.seo': seoComponent,
      'shared.meta-social': metaSocialComponent,
      'data.set': dataSetComponent,
      'data.entry': dataEntryComponent,
    }
    const component = this.getComponent('shared.seo')
    if (!component) {
      try {
        strapi.plugin('content-type-builder').services.components.createComponent({
          component: {
            category: 'shared',
            displayName: component.info.displayName,
            icon: component.info.icon,
            attributes: component.attributes,
          },
          components: Object.entries(components).map(([uid, value]) => ({
            tmpUID: uid,
            category: 'shared',
            displayName: value.info.displayName,
            icon: value.info.icon,
            attributes: value.attributes,
          })),
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
}
