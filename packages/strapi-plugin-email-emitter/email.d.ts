// noinspection JSUnusedGlobalSymbols

declare namespace Strapi {
  export namespace Email {
    interface Provider {
      send(email: EmailInput, template?: { [key: string]: string }, payload?: { [key: string]: string }): Promise<{ response: string }>
    }

    type Plugin = {
      provider: Provider
    }

    type Settings = {
      defaultFrom: string
      defaultReplyTo: string
    }

    type EmailInput = {
      to: string
      from: string
      replyTo?: string
      cc?: string
      bcc?: string
      subject?: string
      body?: string
      attachments?: Array<any>
    }
  }
}
