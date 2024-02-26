import React, {useEffect} from 'react';
import {LoginPage} from "../components/LoginPage/LoginPage";
import {Footer} from "../components/Footer/Footer";
import {config} from "../config/config";
import {useNavigate} from "react-router-dom";

export const LoginView = () => {

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const tokenCheck = await fetch(
                    `${config.apiUrl}/api/login/auth`,
                    {
                        credentials: 'include',
                    });

                if (!tokenCheck) {
                    console.error('No response received from the server.');
                } else if (tokenCheck.ok) {
                    return navigate('/email', {replace: true});
                }
            } catch (error) {
                console.error('An error occurred while checking the token:', error.message);
            }
        })()
    }, [navigate]);

    return (
        <>
            <LoginPage/>
            <Footer/>
        </>
    )
};
