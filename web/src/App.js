import React from "react";
import "./App.css";
import WalletDashboard from "./App/pages/WalletDashboard";
import Login from "./App/pages/Login";
import {
    Route,
    Routes,
    useNavigate,
    Navigate,
    useLocation
  } from "react-router-dom";
  import { history } from './App/helpers';
import { PrivateRoute } from "./App/components/PrivateRoute";

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <Routes>
            <Route path="/wallet" element={
                <PrivateRoute>
                    <WalletDashboard />
                </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
    );
}

export default App;
