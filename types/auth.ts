export type AuthResult = {
    success: boolean
    error?: string
    message?: string
    callbackUrl?: string
    data?: {
        user?: {
            id: string
            email: string
            name: string
        }
    }
}

export type SignUpData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export type SignInData = {
    email: string
    password: string
}

export type User = {
    id: string
    email: string
    name: string
    image?: string | null | undefined
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
}
