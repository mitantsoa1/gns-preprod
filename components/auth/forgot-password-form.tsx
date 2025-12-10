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
import { requestPasswordReset } from "@/actions/auth-actions"
import Link from "next/link"
import { useActionState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { useLocale } from "next-intl"

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [state, formAction, isPending] = useActionState(requestPasswordReset, null)
    const formRef = useRef<HTMLFormElement>(null)
    const locale = useLocale()

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset()
        }
    }, [state?.success])

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Forgot your password?</CardTitle>
                    <CardDescription>
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} ref={formRef}>
                        <FieldGroup>
                            {/* Hidden locale field */}

                            {/* Message de succès */}
                            {state?.success && (
                                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200">
                                    {state.message}
                                </div>
                            )}

                            {/* Message d'erreur */}
                            {state?.error && (
                                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
                                    {state.error}
                                </div>
                            )}

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Send reset link"
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Remember your password? <Link href={`/${locale}/login`}>Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
