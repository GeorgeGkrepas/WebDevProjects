import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import type { ReactNode } from "react";
import { auth } from "../components/firebase";

interface AuthUser {
    email: string | null;
    username: string | null;
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
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser({
                    email: user.email,
                    username: user.displayName,
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