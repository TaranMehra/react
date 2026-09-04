import { createContext, useState, useContext, useEffect } from "react";

interface UserType {
  username: string;
  age?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  [key: string]: unknown;
}

interface UserContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, username: string) => void;
  logout: () => void;
  getToken: () => string | null;
  getUsername: () => string | null;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setIsredirection: (val: boolean) => void;
  isredirection: boolean;
  setUserobj: React.Dispatch<React.SetStateAction<UserType>>;
  userobj: UserType;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [userobj, setUserobj] = useState<UserType>({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isredirection, setIsredirection] = useState<boolean>(false);

  // login is synchronous — no async work happens here, just storage writes
  const login = (accessToken: string, refreshToken: string, username: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken); // fixed: separate key
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUserobj({ username: "", email: "" }); // reset user state too
  };

  const getToken = (): string | null => {
    if (!isAuthenticated) return null;
    return localStorage.getItem("accessToken");
  };

  const getUsername = (): string | null => {
    if (!isAuthenticated) return null;
    return localStorage.getItem("username");
  };

  useEffect(() => {
    // on app load, check whether a session persists
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setLoading,
        loading,
        getToken,
        getUsername,
        setIsredirection,
        isredirection,
        setUserobj,
        userobj,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};