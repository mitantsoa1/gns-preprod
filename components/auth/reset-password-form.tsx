"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { resetPasswordAction } from "@/actions/auth-actions"
import Link from "next/link"
import { startTransition, useActionState, useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod";
import { useLocale } from "next-intl"

export const ResetPasswordSchema = z.object({
    password: z
        .string() // check if it is string type
        .min(8, { message: "Password must be at least 8 characters long" }) // checks for character length
        .max(20, { message: "Password must be at most 20 characters long" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],

    // checks if the password and confirm password are equal
})


export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [state, formAction, isPending] = useActionState(resetPasswordAction, null)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const locale = useLocale()

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFieldErrors({})

        const formData = new FormData(event.currentTarget)
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirm-password") as string

        // Validation avec Zod
        try {
            ResetPasswordSchema.parse({ password, confirmPassword })
            // Si validation réussie, soumettre le formulaire
            startTransition(() => {
                formAction(formData)
            })

        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {}

                // CORRECTION : Utiliser 'issues' au lieu de 'errors'
                error.issues.forEach((issue) => {
                    if (issue.path && issue.path.length > 0) {
                        const fieldName = issue.path[0] as string
                        newErrors[fieldName] = issue.message
                    }
                })

                setFieldErrors(newErrors)

                // Afficher la première erreur dans la console pour le débogage
                if (error.issues.length > 0) {
                    console.log("Erreur de validation:", error.issues[0].message)
                }
            } else {
                console.error("Erreur inattendue:", error)
            }
        }
    }
    // Effacer l'erreur d'un champ quand l'utilisateur commence à taper
    const handleInputChange = (fieldName: string) => {
        if (fieldErrors[fieldName]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldName]
                return newErrors
            })
        }
    }

    useEffect(() => {
        if (state?.success) {
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                router.push(`/${locale}/login`)
            }, 2000)
        }
    }, [state?.success, router])

    if (!token) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader>
                        <CardTitle>Invalid reset link</CardTitle>
                        <CardDescription>
                            This password reset link is invalid or has expired.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/forgot-password">
                            <Button className="w-full">Request a new reset link</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Réinitialiser votre mot de passe</CardTitle>
                    <CardDescription>
                        Entrez votre nouveau mot de passe ci-dessous
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFormSubmit} ref={formRef}>
                        <FieldGroup>
                            <input type="hidden" name="token" value={token} />

                            {/* Messages */}
                            {state?.success && (
                                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200">
                                    {state.message}
                                    <p className="mt-2">Redirection vers la connexion...</p>
                                </div>
                            )}

                            {state?.error && (
                                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
                                    {state.error}
                                </div>
                            )}

                            {/* Champs avec validation */}
                            <Field>
                                <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Entrez votre nouveau mot de passe"
                                    required
                                    className={fieldErrors.password ? "border-red-500" : ""}
                                    onChange={() => handleInputChange("password")}
                                />
                                {fieldErrors.password && (
                                    <p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>
                                )}
                                <FieldDescription>
                                    Le mot de passe doit contenir au moins 8 caractères
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="confirm-password">Confirmer le mot de passe</FieldLabel>
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    placeholder="Confirmez votre nouveau mot de passe"
                                    required
                                    className={fieldErrors.confirmPassword ? "border-red-500" : ""}
                                    onChange={() => handleInputChange("confirmPassword")}
                                />
                                {fieldErrors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    disabled={isPending || state?.success}
                                    className="w-full"
                                >
                                    {isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Réinitialiser le mot de passe"
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Vous vous souvenez de votre mot de passe ?{" "}
                                    <Link href={`/${locale}/login`} className="text-primary hover:underline">
                                        Se connecter
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
