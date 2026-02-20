import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("lexigo_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    const fakeUser = { username };
    localStorage.setItem("lexigo_user", JSON.stringify(fakeUser));
    setUser(fakeUser);
    return { success: true };
  };

  const register = async (username, password) => {
    const fakeUser = { username };
    localStorage.setItem("lexigo_user", JSON.stringify(fakeUser));
    setUser(fakeUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("lexigo_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
