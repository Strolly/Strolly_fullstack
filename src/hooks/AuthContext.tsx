import React, { createContext, useContext, useState, Dispatch, ReactNode } from 'react';

export type AuthToken = {
    token: string;
};

interface AuthContextType {
    token: AuthToken | null;
    setToken: React.Dispatch<React.SetStateAction<AuthToken | null>>;
}

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [token, setToken] = useState<AuthToken | null>(null);
    return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
