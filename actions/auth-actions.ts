"use server";

import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthResult } from "@/types/auth";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/lib/get-session";

/**
 * Server action pour l'inscription d'un nouvel utilisateur
 * Utilise auth.api (côté serveur) avec gestion complète des erreurs
 */
export async function signUpEmail(
    prevState: AuthResult | null,
    formData: FormData
): Promise<AuthResult> {
    try {
        // Extraction et validation des données
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        // Validation des champs requis
        if (!name || !email || !password || !confirmPassword) {
            return {
                success: false,
                error: "Tous les champs sont requis",
            };
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: "Adresse email invalide",
            };
        }

        // Validation de la correspondance des mots de passe
        if (password !== confirmPassword) {
            return {
                success: false,
                error: "Les mots de passe ne correspondent pas",
            };
        }

        // Validation de la longueur du mot de passe
        if (password.length < 8) {
            return {
                success: false,
                error: "Le mot de passe doit contenir au moins 8 caractères",
            };
        }

        // Appel à l'API d'authentification (côté serveur)
        const response = await auth.api.signUpEmail({
            body: { name, email, password },
            headers: await headers(),
            asResponse: true,
        });

        // Vérification de la réponse
        if (!response) {
            return {
                success: false,
                error: "Erreur lors de la création du compte",
            };
        }

        return {
            success: true,
            message:
                "Compte créé avec succès ! Veuillez vérifier votre email pour activer votre compte.",
        };
    } catch (error: any) {
        console.error("Erreur lors de l'inscription:", error);

        // Gestion des erreurs spécifiques
        if (error.message?.includes("already exists") || error.message?.includes("duplicate")) {
            return {
                success: false,
                error: "Un compte avec cet email existe déjà",
            };
        }

        if (error.message?.includes("password")) {
            return {
                success: false,
                error: "Le mot de passe ne respecte pas les critères de sécurité",
            };
        }

        return {
            success: false,
            error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        };
    }
}

/**
 * Server action pour la connexion d'un utilisateur
 * Utilise auth.api (côté serveur) avec gestion complète des erreurs
 */
export async function signInEmail(
    prevState: AuthResult | null,
    formData: FormData
): Promise<AuthResult> {
    try {
        // Extraction des données
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const locale = formData.get("locale") as string || "fr"; // Récupérer la locale
        const callbackUrl = formData.get("callbackUrl") as string;

        // Validation des champs requis
        if (!email || !password) {
            return {
                success: false,
                error: "Email et mot de passe requis",
            };
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: "Adresse email invalide",
            };
        }

        // Appel à l'API d'authentification (côté serveur)
        const response = await auth.api.signInEmail({
            body: { email, password },
            headers: await headers(),
            asResponse: true,
        });



        // Vérification de la réponse
        if (!response.ok) {
            return {
                success: false,
                error: "Invalid credentials",
            };
        } else

            // Redirection après connexion réussie (côté serveur pour garantir que les cookies sont définis)
            redirect(callbackUrl || `/${locale}/dashboard`);
    } catch (error: any) {
        console.error("Erreur lors de la connexion:", error);

        // Gestion des erreurs spécifiques
        if (error.message?.includes("not verified") || error.message?.includes("verify")) {
            return {
                success: false,
                error: "Veuillez vérifier votre email avant de vous connecter",
            };
        }

        if (
            error.message?.includes("Invalid") ||
            error.message?.includes("incorrect") ||
            error.message?.includes("not found")
        ) {
            return {
                success: false,
                error: "Email ou mot de passe incorrect",
            };
        }

        // Si c'est une redirection, la laisser passer
        if (error.message?.includes("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            error: "Une erreur est survenue lors de la connexion. Veuillez réessayer.",
        };
    }
}

/**
 * Server action pour la déconnexion d'un utilisateur
 */
export async function signOutAction(): Promise<AuthResult> {
    try {
        const response = await auth.api.signOut({
            headers: await headers(),
        });
        if (!response) {
            return {
                success: false,
                error: "Une erreur est survenue lors de la déconnexion. Veuillez réessayer.",
            };
        }
        // Redirection après déconnexion
        return {
            success: true,
            message:
                "Deconnexion reussie.",
        };
    } catch (error: any) {
        console.error("Erreur lors de la déconnexion:", error);

        // Si c'est une redirection, la laisser passer
        if (error.message?.includes("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            error: "Erreur lors de la déconnexion",
        };
    }
}

/**
 * Server action pour demander une réinitialisation de mot de passe
 */
export async function requestPasswordReset(
    prevState: AuthResult | null,
    formData: FormData
): Promise<AuthResult> {
    try {
        const email = formData.get("email") as string;

        // Validation des champs requis
        if (!email) {
            return {
                success: false,
                error: "L'adresse email est requise",
            };
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: "Adresse email invalide",
            };
        }

        // await authClient.requestPasswordReset({
        //     email: email || "",
        //     redirectTo: "/reset-password",
        // });

        const data = await auth.api.requestPasswordReset({
            body: {
                email: email || "",
                redirectTo: "/reset-password",
            },
        });
        if (data.status) {
            return {
                success: true,
                message: data.message,
            };
        }
        return {
            success: false,
            message: "Une erreur est survenue lors de la demande de réinitialisation.",
        }

    } catch (error: any) {
        console.error("Erreur lors de la demande de réinitialisation:", error);

        // Toujours retourner un message générique pour la sécurité
        return {
            success: false,
            message: "Une erreur est survenue lors de la demande de réinitialisation.",
        }
    }
}

/**
 * Server action pour réinitialiser le mot de passe avec un token
 */
export async function resetPasswordAction(
    prevState: AuthResult | null,
    formData: FormData
): Promise<AuthResult> {
    try {
        const token = formData.get("token") as string;
        const newPassword = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        // Validation des champs requis
        if (!token || !newPassword || !confirmPassword) {
            return {
                success: false,
                error: "Tous les champs sont requis",
            };
        }

        // Validation de la correspondance des mots de passe
        if (newPassword !== confirmPassword) {
            return {
                success: false,
                error: "Les mots de passe ne correspondent pas",
            };
        }

        // Validation de la longueur du mot de passe
        if (newPassword.length < 8) {
            return {
                success: false,
                error: "Le mot de passe doit contenir au moins 8 caractères",
            };
        }

        // Appel à l'API pour réinitialiser le mot de passe
        const response = await auth.api.resetPassword({
            body: {
                newPassword: newPassword,
                token: token,
            },
            headers: await headers(),
            asResponse: true
        });

        if (!response.ok) {
            return {
                success: false,
                error: "Une erreur est survenue lors de la réinitialisation. Veuillez réessayer.",
            }
        }

        return {
            success: true,
            message: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
        };
    } catch (error: any) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error);

        if (error.message?.includes("invalid") || error.message?.includes("expired")) {
            return {
                success: false,
                error: "Le lien de réinitialisation est invalide ou a expiré. Veuillez faire une nouvelle demande.",
            };
        }

        return {
            success: false,
            error: "Une erreur est survenue lors de la réinitialisation. Veuillez réessayer.",
        };
    }
}

/**
 * Server action pour modifier le mot de passe
 */
export async function changePasswordAction(
    prevState: AuthResult | null,
    formData: FormData
): Promise<AuthResult> {
    try {
        const user = await getUser();
        const newPassword = formData.get("password") as string;
        const currentPassword = formData.get("current-password") as string;

        // Validation des champs requis
        if (!newPassword || !currentPassword) {
            return {
                success: false,
                error: "Tous les champs sont requis",
            };
        }

        // Validation de la longueur du mot de passe
        if (newPassword.length < 8) {
            return {
                success: false,
                error: "Le mot de passe doit contenir au moins 8 caractères",
            };
        }

        // Better Auth vérifie automatiquement si currentPassword est correct
        // Pas besoin de vérification manuelle ici

        const response = await auth.api.changePassword({
            body: {
                newPassword: newPassword,
                currentPassword: currentPassword,
            },
            // This endpoint requires session cookies.
            headers: await headers(),
        });

        if (!response.user) {
            return {
                success: false,
                error: "Une erreur est survenue lors de la réinitialisation. Veuillez réessayer.",
            }
        }

        return {
            success: true,
            message: "Votre mot de passe a été modifié avec succès.",
        };
    } catch (error: any) {
        console.error("Erreur lors de la modification du mot de passe:", error);

        if (error.message?.includes("invalid") || error.message?.includes("expired")) {
            return {
                success: false,
                error: "Le mot de passe actuel est invalide.",
            };
        }

        return {
            success: false,
            error: "Une erreur est survenue lors de la réinitialisation. Veuillez réessayer.",
        };
    }
}


