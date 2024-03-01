import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { config } from "../config/config";
import {toast} from "react-toastify";

export const RequireAuth = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    `${config.apiUrl}/api/login/auth`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                setIsLoggedIn(response.ok);

            } catch (error) {
                toast.error('Failed to login');
            }
        };

        checkAuth();
    }, []);


    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children;
};
