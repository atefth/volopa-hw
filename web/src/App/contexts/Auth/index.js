import * as React from "react";
import { useContext, useMemo } from "react";
import { updateToken, clearToken } from "../../services/Auth";

export const AuthContext = React.createContext({
  user: null,
  refreshToken: () => {},
  logout: () => {}
});
export const AuthProvider = ({
  children
}) => {
    const [user, setUser] = React.useState(null);
    const refreshToken = (token) => {
        updateToken(token);
        setUser({
            ...user,
            token
        });
    };
    const logout = () => {
        clearToken();
        setUser(null);
    };
    const memoedValue = useMemo(
        () => ({
            user,
            refreshToken,
            logout,
        }),
        [user]
    );
    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};
export default function useAuth() {
    return useContext(AuthContext);
}
