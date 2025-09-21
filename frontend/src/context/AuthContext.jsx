import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const login = async (email, password) => {
        try {
            console.log("login api hited")
            setLoading(true);
            console.log("Backend URL:", backendURL);
            const { data } = await axios.post(`${backendURL}/api/users/login`, { email, password })
            console.log("after api hitting")
            if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                const decoded = jwtDecode(data.token)
                setUser({ id: decoded.id, role: decoded.role })
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }finally {
            setLoading(false);
          }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
          {children}
        </AuthContext.Provider>
      );

};

export default AuthProvider;
