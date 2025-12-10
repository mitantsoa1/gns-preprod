'use client';

import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import { authClient, signIn, signOut as signOutFromLib, signUp } from '@/lib/auth-client';
import { User } from 'better-auth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    setUser: (user: User | null) => void;
    handleSignUp: (email: string, password: string, name: string, image: string, callbackURL: string, loading: boolean, setLoading: (loading: boolean) => void) => Promise<void>;
    handleSignIn: (params: { email: string, password: string, callbackURL: string, loading: boolean, setLoading: (loading: boolean) => void }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: sessionData, isPending } = authClient.useSession();
    const router = useRouter();
    const locale = useLocale();
    const [user, setUser] = useState<User | null>(sessionData?.user ?? null);

    useEffect(() => {
        setUser(sessionData?.user ?? null);
    }, [sessionData]);

    const handleSignOut = async () => {
        await signOutFromLib();
        // Force a hard refresh of the current route from the server.
        // This will re-fetch server data and re-render server/client components,
        // effectively clearing any stale UI from the router cache.
        router.refresh();
    };

    const handleSignUp = async (email: string, password: string, name: string, image: string, callbackURL: string, loading: boolean, setLoading: (loading: boolean) => void) => {
        await signUp.email({
            email,
            password,
            name,
            image,
            callbackURL,
            fetchOptions: {
                onResponse: () => {
                    setLoading(false);
                },
                onRequest: () => {
                    setLoading(true);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: async () => {
                    router.push(callbackURL);
                },
            },
        });
    }

    const handleSignIn = async ({
        email,
        password,
        callbackURL,
        loading,
        setLoading
    }: {
        email: string,
        password: string,
        callbackURL: string,
        loading: boolean,
        setLoading: (loading: boolean) => void
    }) => {
        await signIn.email({
            email,
            password,
            fetchOptions: {
                onResponse: () => {
                    setLoading(false);
                },
                onRequest: () => {
                    setLoading(true);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    console.log("Erreur de connexion:", ctx);
                },
                onSuccess: async () => {
                    try {
                        // 1. Rafraîchir d'abord les données de session
                        await router.refresh();

                        // 2. Déterminer l'URL de redirection
                        let redirectUrl = callbackURL;

                        // Si callbackURL est vide ou la page d'accueil, rediriger vers le dashboard
                        if (!redirectUrl ||
                            redirectUrl === "/" ||
                            redirectUrl === "/fr" ||
                            redirectUrl === "/en" ||
                            redirectUrl === "/fr/" ||
                            redirectUrl === "/en/") {
                            redirectUrl = `${locale}/dashboard`;
                        }

                        // 3. Rediriger une seule fois
                        console.log("Redirection vers:", redirectUrl);
                        router.push(redirectUrl);

                    } catch (error) {
                        console.error("Erreur lors de la redirection:", error);
                        // Fallback vers le dashboard
                        router.push(`${locale}/dashboard`);
                    }
                },
            },
        });
    };

    return (
        <AuthContext.Provider value={{ user, isLoading: isPending, signOut: handleSignOut, setUser, handleSignUp, handleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
