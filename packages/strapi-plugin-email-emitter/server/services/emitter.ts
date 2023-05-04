import type { EntityService } from "@strapi/strapi/lib/services/entity-service"
import { contentTypeUIDs } from "../constants"

const service: Strapi.EmailEmitter.EmailService = {
  async sendScheduled() {
    const startDate = Date.now()
    strapi.log.info(`[email] Batch email delivery each-minute job started`)
    const entityService: EntityService = strapi.entityService
    await entityService
      .findMany<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(contentTypeUIDs.email, {
        filters: {
          scheduled: { $eq: true },
          delivered: { $eq: false },
        },
        publicationState: "preview",
      })
      .then(emails => {
        strapi.log.warn(`[email] Found ${emails.length} emails to deliver`)
        emails.forEach(email =>
          entityService.update<typeof contentTypeUIDs.email, Strapi.EmailEmitter.EmailEntity>(
            contentTypeUIDs.email,
            email.id,
            {
              data: { publishedAt: new Date() },
            }
          )
        )
      })
      .catch(err => strapi.log.error(`[email] Error while delivering emails`, err))
      .finally(() => strapi.log.info(`[email] Delivery finished (${Date.now() - startDate} ms)`))
  },
  /**
   * Instantly send one email
   * @param emailTemplate
   * @param initialParams
   */
  async send({ template: emailTemplate, ...initialParams }: Strapi.EmailEmitter.EmailParams) {
    const startDate = Date.now()
    strapi.log.info(`[email] Sending email to ${initialParams.email}`)
    const entityService: EntityService = strapi.entityService
    const emailDesignerService = strapi.service<Strapi.EmailDesigner.TemplateService>("plugin::email-designer.template")
    const templatePromised: Promise<Strapi.EmailDesigner.TemplateEntity["id"] | null> =
      !emailTemplate || !emailTemplate.id || !emailDesignerService
        ? Promise.resolve(emailTemplate?.id ?? null)
        : emailDesignerService?.findOne(emailTemplate).then(template => template?.id ?? null)

    return templatePromised
      .then(template => ({
        state: "queued",
        scheduled: false,
        delivered: false,
        publishedAt: new Date(),
        template,
        ...initialParams,
      }))
      .then(data => ({ data }))
      .then(params => entityService.create(contentTypeUIDs.email, params))
      .catch(error => strapi.log.error(`[email] Delivery failed`, error))
      .finally(() => strapi.log.info(`[email] Delivery finished (${Date.now() - startDate} ms)`))
  },
}
export default service
