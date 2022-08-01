import * as React from "react";
import { useEffect } from 'react';
import "./App.css";
import WalletDashboard from "./App/pages/WalletDashboard";
import Login from "./App/pages/Login";
import useAuth, { AuthProvider } from './App/contexts/Auth';
import { getCurrentUser, check } from "./App/services/Auth";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
  } from "react-router-dom";

function App() {
    const {user, refreshToken} = useAuth();

    useEffect(() => {
        const data = getCurrentUser();
        if (data?.token) {
            refreshToken(data.token);
        }
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);


    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/wallet" element={<WalletDashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route exact path="/" element={!user?.token ? <Navigate replace to="/login" /> : <Navigate replace to="/wallet" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
