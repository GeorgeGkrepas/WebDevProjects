import { onIdTokenChanged } from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import type { ReactNode } from "react";
import { auth } from "../components/firebase";

interface AuthUser {
    email: string | null;
    username: string | null;
    emailVerified: boolean;
}

interface AuthContextType {
    currentUser: AuthUser | null;
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null
})

interface AuthProviderProps {
    children: ReactNode;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        onIdTokenChanged(auth, user => {
            if (user) {
                setCurrentUser({
                    email: user.email,
                    username: user.displayName,
                    emailVerified: user.emailVerified
                });
            }
            else {
                setCurrentUser(null);
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}