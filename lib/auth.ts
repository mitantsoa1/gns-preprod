import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { Resend } from 'resend'
import { nextCookies } from 'better-auth/next-js'
import { stripe } from './stripe'

const resend = new Resend(process.env.RESEND_API_KEY)
export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    basePath: "/api/auth",
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    plugins: [nextCookies()],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false, // Temporairement désactivé pour tester
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                to: user.email,
                from: "onboarding@resend.dev",
                subject: "Reset your password",
                html: `
                <h1>Reset your password</h1>
                <p>Click the link below to reset your password</p>
                <a href="${url}">Reset Password</a>
                <p>If you didn't request this, you can safely ignore this email.</p>
                `
            })
        }
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                to: user.email,
                from: "onboarding@resend.dev",
                subject: "Verify your email address",
                html: `
                <h1>Verify your email address</h1>
                <p>Click the link below to verify your email address</p>
                <a href="${url}">Verify Email</a>
                `
            })
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            stripeCustomerId: {
                type: "string",
                nullable: true,
                input: false
            }
        }
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    const stripeCustomer = await stripe.customers.create({
                        email: user.email,
                        name: user.name
                    })
                    const stripeCustomerId = stripeCustomer.id
                    if (!stripeCustomerId) {
                        return;
                    }
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            stripeCustomerId
                        }
                    })
                }
            }
        }
    }
})