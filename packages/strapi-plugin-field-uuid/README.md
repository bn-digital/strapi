# Strapi plugin: UUID Field

This plugin adds a UUID field type to Strapi.

## Table of Contents

- [Installation](#installation)
- [Description](#description)
- [Screenshots](#screenshots)

### Installation

Install the plugin in your Strapi project.

```shell
# using yarn
yarn add @bn-digital/strapi-plugin-field-uuid

# using npm
npm install @bn-digital/strapi-plugin-field-uuid
```

### Description

Enables UUID custom field type, which is generated automatically on entity creation. Mapped to database as `uid` Strapi type (which means that it is unique and validates as UUID).

It is recommended to make field non-editable (as part of Strapi view configuration), but it is not enforced. There is regenerate button in the view, which will generate new value.

### Screenshots

![Screenshot of the UUID field in the Content Type Builder](https://github.com/bn-digital/strapi/blob/latest/packages/strapi-plugin-field-uuid/docs/add-custom-field.png?raw=true)

![Screenshot of the UUID field in the Content Manager](https://github.com/bn-digital/strapi/blob/latest/packages/strapi-plugin-field-uuid/docs/create-entity.png?raw=true)
