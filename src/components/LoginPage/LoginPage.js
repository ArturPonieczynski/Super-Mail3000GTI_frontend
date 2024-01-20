import React, {useState} from "react";
import {config} from "../../config/config";
import {useNavigate} from "react-router-dom";
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

    const navigate = useNavigate();

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
            const loginResponse = await fetch(`${config.apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const result = await loginResponse.json();

            if (result.error) {
                return toast.error(`${result.error}`);
            }
            if (result.ok) {
                navigate('/mail');
            }

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

