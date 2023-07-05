import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

export function AuthContextProvider ({ children })  {
  const [authContext, setAuthContext] = useState(undefined);
  const [getAuth, setGetAuth] = useState(0);
  console.log(authContext);
  
  useEffect(() => {
    setAuthContext(JSON.parse(localStorage.getItem('auth')));
  }, [ getAuth ]);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext, getAuth, setGetAuth }}>
      {children}
    </AuthContext.Provider>
  );
}