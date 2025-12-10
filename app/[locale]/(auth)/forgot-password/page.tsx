import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Forgot Password | GNSBTP',
};

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ForgotPasswordForm />
            </div>
        </div>
    )
}
