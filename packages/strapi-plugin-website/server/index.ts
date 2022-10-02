/// <reference path="../index.d.ts" />

import '@strapi/strapi'
import bootstrap from './bootstrap'
import config from './config'
import controllers from './controllers'
import destroy from './destroy'
import middlewares from './middlewares'
import policies from './policies'
import register from './register'
import routes from './routes'
import services from './services'
import contentTypes from './content-types'

export default {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares,
}
