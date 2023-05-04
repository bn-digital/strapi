// noinspection JSUnusedGlobalSymbols

declare namespace Strapi {
  export namespace EmailEmitter {
    import { CollectionTypeService } from "@strapi/strapi/lib/core-api/service"

    type EmailEntity = {
      id: string
      email: string | null
      publishedAt: Date | null
      template: EmailDesigner.TemplateEntity
      delivered: boolean
      scheduled: boolean
      payload?: { [key: string]: string }
    }

    type EmailService = CollectionTypeService

    type EmailParams = Omit<EmailEntity, "id" | "delivered" | "publishedAt" | "scheduled" | "template" | "state"> & {
      template?: Partial<EmailDesigner.TemplateEntity>
    }

    type EmitterService = {
      sendScheduled(): Promise<void>
      send(params: EmailParams): Promise<void>
    }
  }
}
