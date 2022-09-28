export namespace UsersPermissions {
  type RoleEntity = {
    id: string
    name: string
    description: string
    type: string
  }

  type UserEntity = {
    id: string
    username: string
    email: string
    resetPasswordToken?: string
    password?: string
    confirmed: boolean
    blocked: boolean
    role: RoleEntity
  }

  type ChangePasswordPayload = {
    oldPassword: string
    newPassword: string
  }

  type AuthContext = { user: UserEntity }

  interface UserService {
    validatePassword(hash: string, newPassword: string): Promise<boolean>
    edit(id: string, params: Partial<UserEntity>): Promise<UserEntity>
    fetch(id: string, params?: { populate?: (keyof UserEntity | string)[] | string }): Promise<UserEntity | null>
  }
}
