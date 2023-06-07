import React from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../../pages/AuthPage/AuthService";

export const ProtectedRoutes = ({ children }) => {

    const user = AuthService.getUser()

    if (!user) {
        return <Navigate to="/main" replace />;
    }

    return children
}