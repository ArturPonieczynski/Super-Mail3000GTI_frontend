import React, {useEffect} from 'react';
import {LoginPage} from "../components/LoginPage/LoginPage";
import {Footer} from "../components/Footer/Footer";
import {config} from "../config/config";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../auth/authSlice";

export const LoginView = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const tokenCheck = await fetch(
                    `${config.apiUrl}/api/login/auth`,
                    {
                        credentials: 'include',
                    });

                if (!tokenCheck.ok) {
                    console.error(tokenCheck.statusText);
                } else if (tokenCheck.ok) {
                    const {user} = await tokenCheck.json();
                    dispatch(loginSuccess(user));
                     navigate('/email', {replace: true});
                }
            } catch (error) {
                console.error('An error occurred while checking the token:', error.message);
            }
        })()
    }, [navigate, dispatch]);

    return (
        <>
            <LoginPage/>
            <Footer/>
        </>
    )
};
