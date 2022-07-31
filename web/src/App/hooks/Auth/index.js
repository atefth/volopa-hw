import * as React from "react";
import { updateToken, clearToken } from "../../services/Auth";

const useAuthHandler = (initialState) => {
  const [user, setUser] = React.useState(initialState);

const refreshToken = (token) => {
    updateToken(token);
    setUser({...user, token});
  };

const logout = () => {
    clearToken();
    setUser(null);
  };

return {
    user,
    refreshToken,
    logout
  };
};
export default useAuthHandler;
