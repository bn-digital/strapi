import { Event as LifecycleEvent } from '@strapi/database/lib/lifecycles'
import { EntityService } from '@strapi/strapi/lib/services/entity-service'
import { contentTypeUIDs } from '../../constants'

export default {
  beforeCreate(event: LifecycleEvent) {
    event.params.data.publishedAt = null
    event.params.data.status = null
  },
  beforeUpdate(event: LifecycleEvent) {
    if (!event.params.data.publishedAt) {
      event.params.data.status = null
    }
  },
  async afterUpdate({ result }: LifecycleEvent & { result: Strapi.EmailEmitter.EmailEntity }) {
    const emailProvider: Strapi.Email.Provider = strapi.plugin('email').provider
    const emailDesignerEmailService: Strapi.EmailDesigner.EmailService = strapi.plugin('email-designer').services.email
    const entityService: EntityService = strapi.entityService
    const emailConfig: Strapi.Email.Settings = strapi.config.get('plugin.email').settings
    const email: Strapi.EmailEmitter.EmailEntity = await entityService.findOne<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(
      contentTypeUIDs.email,
      result.id,
      {
        populate: 'template',
      },
    )
    const to = email.email ?? emailConfig.defaultReplyTo
    const from = emailConfig.defaultFrom
    if (!email.delivered && email.publishedAt) {
      try {
        const response = await (!email.template
          ? emailProvider.send(
              {
                to,
                from,
                replyTo: to,
                body: JSON.stringify(email.payload ?? {}),
              },
              {},
              email.payload ?? {},
            )
          : emailDesignerEmailService.sendTemplatedEmail(
              {
                to,
                from,
                replyTo: to,
              },
              {
                templateReferenceId: email.template.templateReferenceId,
                subject: email.template.subject,
              },
              email.payload ?? {},
            )
        ).then((result: { response: string }) => result?.response)
        const delivered = response.startsWith('250')
        if (delivered) {
        } else {
          strapi.log.error(`[email] Email #${email.id} was not delivered. Reason: ${response}`)
        }
        strapi.log.info(`[email] Email #${email.id} was sent successfully to ${to}`)

        await entityService.update<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(contentTypeUIDs.email, email.id, {
          data: { delivered, email: to, publishedAt: new Date(), log: response },
        })
      } catch (e: any) {
        await entityService.update<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(contentTypeUIDs.email, email.id, {
          data: { delivered: false, email: to, publishedAt: new Date(), log: e.message },
        })
        strapi.log.error(`[email] Failed to find template for email #${email.id}`)
      }
    }
  },
}
