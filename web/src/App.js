import * as React from "react";
import { useEffect } from 'react';
import "./App.css";
import WalletDashboard from "./App/pages/WalletDashboard";
import Login from "./App/pages/Login";
import { authContext } from './App/contexts/Auth';
import { getCurrentUser } from "./App/services/Auth";
import AuthContextProvider from "./App/contexts/Auth";

function App() {
    const auth = React.useContext(authContext);
    const {user, refreshToken} = auth;

    useEffect(() => {
        const data = getCurrentUser();
        if (data?.token) {
            refreshToken(data.token);
        }
    }, []);

    return <AuthContextProvider>
        {user?.token !== null ? <WalletDashboard/> : <Login/>}
    </AuthContextProvider>
}

export default App;
