import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Récupère la session utilisateur côté serveur
 * @returns La session utilisateur ou null si non authentifié
 */
export async function getSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers() // you need to pass the headers object.
        })

        return session;
    } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
        return null;
    }
}

export const getUser = async () => {
    const session = await getSession()
    return session?.user
}