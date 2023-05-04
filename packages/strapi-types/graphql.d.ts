namespace Graphql {
  import { ParameterizedContext } from "koa"
  import { Policy } from "@strapi/strapi/lib/core/registries/policies"
  import { PluginConfig, FieldResolver, core } from "@nexus/schema"

  type CRUDAction = "create" | "find" | "findOne" | "update" | "delete"

  interface Plugin extends Strapi.GenericPlugin {
    service<T = any>(name: "extension" | "content-api" | "type-registry" | "format"): T
  }

  type ResolverContext = ParameterizedContext<{ user: UsersPermissions.UserEntity }>

  type ResolverConfig = {
    [key: string]: Partial<{
      auth: boolean | { scope: string[] }
      policies: Policy[]
      middlewares: core.MiddlewareFn[]
    }>
  }

  interface SchemaExtension {
    types: ReturnType<typeof core.objectType>[]
    typeDefs?: string
    resolvers?: { [key: string]: { [key: string]: FieldResolver } }
    resolversConfig?: ResolverConfig
    plugins?: PluginConfig
  }

  type ExtensionCallback = ({ nexus }: { nexus: typeof core }) => SchemaExtension

  interface ExtensionService {
    use(schemaExtensionCallback: ExtensionCallback): void

    shadowCRUD(entityName: Strapi.CollectionTypeUIDs | Strapi.SingleTypeUIDs): {
      field(name: string): {
        disable(): void
        disableFilters(): void
        disableInput(): void
        disableOutput(): void
        isEnabled(): boolean
        isDisabled(): boolean
      }
      isEnabled(): boolean
      isDisabled(): boolean
      disableMutations()
      disableQueries()
      disableAction(action: CRUDAction)
      disableActions(action: CRUDAction[])
      disable()
    }
  }

  interface FormatService {
    returnTypes: {
      toEntityResponse<T = any>(data: any): T
    }
  }

  interface ContentApiService {
    buildSchema(): core.NexusGraphQLSchema
  }
}
