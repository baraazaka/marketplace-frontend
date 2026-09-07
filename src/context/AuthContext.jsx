
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("access_token")
    );

    const isAuthenticated = Boolean(token);

    function login(accessToken) {
        localStorage.setItem(
            "access_token",
            accessToken
        );

        setToken(accessToken);
    }

    function logout() {
        localStorage.removeItem("access_token");
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

