// noinspection JSUnusedGlobalSymbols

declare namespace Strapi {
  export namespace EmailDesigner {
    type TemplateEntity = {
      id: number
      templateReferenceId: number
      sourceCodeToTemplateId?: number
      name: string
      subject: string
    }

    interface Plugin {
      services: {
        email: EmailService
        template: TemplateService
      }
    }

    type TemplateService = {
      findOne(params: Partial<TemplateEntity>): Promise<TemplateEntity | null>
    }

    interface EmailService {
      sendTemplatedEmail<T = any>(
        email: Email.EmailInput,
        template: Partial<TemplateEntity>,
        payload: T
      ): Promise<{ response: string }>
    }
  }
}
