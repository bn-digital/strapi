import type { EntityService } from '@strapi/strapi/lib/services/entity-service'
import { contentTypeUIDs } from '../constants'

async function sendScheduled() {
  const startDate = Date.now()
  strapi.log.info(`[email] Batch email delivery each-minute job started`)
  const entityService: EntityService = strapi.entityService
  await entityService
    .findMany<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(contentTypeUIDs.email, {
      filters: {
        scheduled: { $eq: true },
        delivered: { $eq: false },
      },
      publicationState: 'preview',
    })
    .then(emails => {
      strapi.log.warn(`[email] Found ${emails.length} emails to deliver`)
      emails.forEach(email =>
        entityService.update<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(contentTypeUIDs.email, email.id, {
          data: { publishedAt: new Date() },
        }),
      )
    })
    .catch(err => strapi.log.error(`[email] Error while delivering emails`, err))
    .finally(() => strapi.log.info(`[email] Delivery finished (${Date.now() - startDate} ms)`))
}

export default {
  sendScheduled,
}
