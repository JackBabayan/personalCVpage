"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";
import {useRouter} from 'next/navigation';
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({
  children
}) {
  const [authStatus, setAuthStatus] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setAuthStatus(localStorage.getItem("loggedIn"))
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === '12345') {
    

      Cookies.set("token", password, { expires: 7 }); // Сохраняем токен на 7 дней

      setAuthStatus(true)
      router.push('/my-biography');
      localStorage.setItem('loggedIn', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    router.push('/login');
    setAuthStatus(false)
    localStorage.removeItem("loggedIn");
    Cookies.remove("token"); // Удаляем токен
  };

  return (<AuthContext.Provider value = {
    {
      authStatus,
      setAuthStatus,
      login,
      logout
    }
  } > {
    children
  } </AuthContext.Provider>)
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}