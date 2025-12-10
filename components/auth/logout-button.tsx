"use client"

import { signOutAction } from "@/actions/auth-actions"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const locale = useLocale();

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            const result = await signOutAction()
            if (result.success) {
                router.push(`/${locale}/login`)
                router.refresh()
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {locale === 'fr' ? 'Déconnexion...' : 'Logging out...'}
                </>
            ) : (
                <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {locale === 'fr' ? 'Se déconnecter' : 'Logout'}
                </>
            )}
        </button>
    )
}
