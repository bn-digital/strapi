declare namespace UsersPermissions {
  interface RoleEntity {
    id: string
    name: string
    description: string
    type: string
  }

  interface UserEntity {
    id: string
    username: string
    email: string
    resetPasswordToken?: string
    password?: string
    confirmed: boolean
    blocked: boolean
    role: RoleEntity
  }

  type AuthContext<T = UserEntity> = { user: Partial<T> }

  interface UserService {
    validatePassword(hash: string, newPassword: string): Promise<boolean>
    edit<T = UserEntity>(id: string, params: Partial<T>): Promise<T>
    fetch<T = UserEntity>(id: string, params?: { populate?: (keyof T | string)[] | string }): Promise<T | null>
  }
}
