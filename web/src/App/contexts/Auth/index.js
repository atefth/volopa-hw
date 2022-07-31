import * as React from "react";
import useAuthHandler from "../../hooks/Auth";
import { getCurrentUser } from "../../services/Auth";

export const authContext = React.createContext({
  user: null,
  refreshToken: () => {},
  logout: () => {}
});
const { Provider } = authContext;
const AuthContextProvider = ({
  children
}) => {
  const { user, refreshToken, logout } = useAuthHandler(
    getCurrentUser()
  );
return (
    <Provider value={{ user, refreshToken, logout }}>
      {children}
    </Provider>
  );
};
export default AuthContextProvider;
