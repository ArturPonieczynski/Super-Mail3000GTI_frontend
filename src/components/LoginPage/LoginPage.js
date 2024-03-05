import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../auth/authThunks";
import {toast} from "react-toastify";
import {FullScreenLoadingBlur} from "../FullScreenLoadingBlur/FullScreenLoadingBlur";

import logo from "../assets/images/main512.png";
import style from "./LoginPage.module.css";

export const LoginPage = () => {

    const [form, setForm] = useState({
        name: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/email');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = event => {
        updateForm(event.target.name, event.target.value);
    };

    const updateForm = (key, value) => {
        setForm(form => ({
            ...form,
            [key]: value.toLowerCase(),
        }));
    };

    const sendForm = async event => {
        event.preventDefault();

        setLoading(true);

        try {
            dispatch(login(form));
        } catch (error) {
            return toast.error('Ups... Coś poszło nie tak ! Spróbuj ponownie za jakiś czas.');
        } finally {
            setLoading(false);
        }
    };

    return <>
        <FullScreenLoadingBlur isLoading={loading}/>
        <div className={style.divContainer}>
            <img className={style.logo} src={logo} alt="Main logo"/>
            <form className={style.loginForm} onSubmit={sendForm}>
                <input
                    className={style.input}
                    type="text"
                    name="name"
                    placeholder="Login"
                    maxLength={50}
                    value={form.name}
                    onChange={handleInputChange}
                    required/>
                <input
                    className={style.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    maxLength={45}
                    minLength={4}
                    value={form.password}
                    onChange={handleInputChange}
                    required/>
                <button className={style.formButton} type="submit">Login</button>
            </form>
        </div>
    </>
};

