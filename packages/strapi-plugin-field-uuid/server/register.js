'use strict'
const plugin = require('../admin/src/pluginId')

/**
 * @param {import('@strapi/strapi').Strapi} strapi
 */
module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'uuid',
    plugin,
    type: 'uid',
  })
}
