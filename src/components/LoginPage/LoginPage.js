import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";
import {RotatingLines} from "react-loader-spinner";

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
            const loginResponse = await fetch(`${apiUrl}/api/login`, {
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
            setLoading(false)
        }
    };

    return <>
        <div style={loading ? {
            zIndex: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Centrowanie względem własnych rozmiarów
            display: 'flex', // Używamy flexbox do centrowania zawartości
            alignItems: 'center', // Centrowanie pionowe
            justifyContent: 'center', // Centrowanie poziome
            textAlign: 'center', // Dodatkowe centrowanie tekstu, jeśli będzie potrzebne
            width: '100%', // Zapewnia, że div zajmuje pełną szerokość
            height: '100%', // Zapewnia, że div zajmuje pełną wysokość
        } : {display: 'none'}}>
            <RotatingLines
                width='96'
                strokeColor='#000'
                strokeWidth='4'/>
        </div>
        <div style={loading ? {filter: 'blur(5px)'} : {}}>
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
        </div>
    </>
};
