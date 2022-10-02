/**
 *  email controller
 */

import { factories } from '@strapi/strapi'

import { contentTypeUIDs } from '../constants'

export default factories.createCoreController(contentTypeUIDs.website)
