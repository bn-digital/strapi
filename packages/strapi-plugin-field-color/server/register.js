"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "color",
    plugin: "field-color",
    type: "string",
  });
};
