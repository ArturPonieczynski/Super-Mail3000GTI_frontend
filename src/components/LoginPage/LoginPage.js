import React, {useState} from "react";
import {apiUrl} from "../../api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import style from "./LoginPage.module.css";
import logo from "../assets/images/main512.png";

export const LoginPage = () => {

    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const navigate = useNavigate();

    const updateForm = (key, value) => {
        setForm(form => ({
            ...form,
            [key]: value.toLowerCase(),
        }));
    };

    const sendForm = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...form}),
            });

            const result = await res.json();

            if (result.error) {
                toast.error(`${result.error}`);
                return;
            } if (result.login) {
                navigate('/mail');
            }

        } catch (error) {
            toast.error('Ups... Coś poszło nie tak ! Spróbuj ponownie za jakiś czas.');
            navigate('/login');
        }
    };

    return (<div className={style.divContainer}>
        <img className={style.logo} src={logo} alt="Main logo"/>
        <form className={style.loginForm} action="" onSubmit={sendForm}>
            <input
                className={style.input}
                type="text"
                name="name"
                placeholder="Name"
                maxLength={50}
                value={form.name}
                onChange={e => updateForm('name', e.target.value)}
                required/>
            <input
                className={style.input}
                type="password"
                name="password"
                placeholder="Password"
                maxLength={45}
                minLength={4}
                value={form.password}
                onChange={e => updateForm('password', e.target.value)}
                required/>
            <button className={style.formButton} type="submit">Login</button>
        </form>
    </div>)
};