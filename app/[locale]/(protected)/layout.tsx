import { getSession } from "@/lib/get-session";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: {
        template: '%s - Dashboard | GNS BTP', // Le %s sera remplacé par le titre de la page
        default: 'GNS BTP - Maîtriser l\'Excellence Gros Œuvre Bâtir', // Titre par défaut
    },
};


/**
 * Layout pour les routes protégées
 * Vérifie l'authentification de l'utilisateur avant d'afficher le contenu
 */
export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode;
}) {
    // Vérifier la session utilisateur
    const session = await getSession();
    const locale = await getLocale();

    // Rediriger vers la page de connexion si non authentifié
    if (!session?.user) {
        redirect(`/${locale}/login`);
    }

    return <>{children}</>;
}
