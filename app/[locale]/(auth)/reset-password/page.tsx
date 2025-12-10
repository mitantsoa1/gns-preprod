import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Reset Password | GNSBTP',
};

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    )
}
