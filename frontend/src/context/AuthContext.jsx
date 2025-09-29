import { createContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    let decoded = null
    if (token) {
        decoded = jwtDecode(token);
    }
    const [user, setUser] = useState(token ? decoded : null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    console.warn("Token expired");
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                  } else {
                    setUser({ id: decoded.id, role: decoded.role });
                  }
            } catch (err) {
                console.error("Invalid token:", err);
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            }
        } else {
            setUser(null);
        }
    }, [token]);


    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
