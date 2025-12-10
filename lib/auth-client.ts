import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || ""
})


// Export methods from the configured instance
export const { signIn, signUp, useSession, signOut } = authClient

