import React, {useState} from "react";
import {apiUrl} from "./api";

export function Login() {

    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const updateForm = (key, value) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (event) => {
        event.preventDefault();

        await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...form,
            }),
        });
    };

    return (<>
        <form action="" onSubmit={sendForm}>
            <div>
                <label>
                    Nazwa
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                        required/>
                </label>
            </div>
            <div>
                <label>
                    Hasło
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={e => updateForm('password', e.target.value)}
                        required/>
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    </>)
}