/**
 * email service.
 */

import { factories } from '@strapi/strapi'

import { contentTypeUIDs } from '../constants'

export default factories.createCoreService(contentTypeUIDs.email)
