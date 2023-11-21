import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../api";
import {toast} from "react-toastify";
import style from "./MailPage.module.css";

export const MailPage = () => {

    const [form, setForm] = useState({
        mailTo: '',
        dw: '',
        udw: '',
        subject: '',
        text: '',
        date: '',
        time: '',
    });

    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const updateForm = (key, value) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        const formEntries = Object.entries(form);
        formEntries.map(([key,value]) => formData.append(key, value));
        formData.append('file', file);

        try {
            const res = await fetch(`${apiUrl}/api/mail`, {
                method: 'POST',
                /** Can not add header 'miltipart/form-data' (?) because causing error on backend. */
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                body: formData,
            });

            const result = await res.json();

            if (result.error) {
                toast.error(`${result.error}`);
                return;
            }
            if (result.response) {
                // setTimeout(() => navigate('/mail'), 5000);
                toast.success('Wiadomość wysłana.', {theme: 'colored'})
            }

        } catch (error) {
            toast.error('Coś poszło nie tak.', {theme: 'colored'});
            // navigate('/login');
        }
    };

    return <>
        <form action="" onSubmit={sendForm} className={style.mailForm}>
            <div className={style.divMailContainer}>
                <label className={style.label}>
                    <span className={style.span}>E-mail:</span>
                    <input
                        className={style.input}
                        type="text"
                        name="mailTo"
                        placeholder="example@mail.com"
                        value={form.mailTo}
                        onChange={(event) => updateForm('mailTo', event.target.value)}
                    />
                </label>
                <label className={style.label}>
                    <span className={style.span}>DW:</span>
                    <input
                        className={style.input}
                        type="text"
                        name="dw"
                        placeholder="example@mail.com"
                        value={form.dw}
                        onChange={(event) => updateForm('dw', event.target.value)}
                    />
                </label>
                <label className={style.label}>
                    <span className={style.span}>UDW:</span>
                    <input
                        className={style.input}
                        type="text"
                        name="udw"
                        placeholder="example@mail.com"
                        value={form.udw}
                        onChange={(event) => updateForm('udw', event.target.value)}
                    />
                </label>
            </div>
            <label className={style.label}>
                <span className={style.span}>Temat:</span>
                <input
                    className={style.input}
                    type="text"
                    name="subject"
                    placeholder="Temat"
                    value={form.subject}
                    onChange={(event) => updateForm('subject', event.target.value)}
                    required/>
            </label>
            <label className={style.label}>
                <span className={style.span}>Tekst:</span>
                <textarea
                    className={style.textarea}
                    name="text"
                    rows={10}
                    value={form.text}
                    onChange={(event) => updateForm('text', event.target.value)}
                    required
                ></textarea>
            </label>
                <p className={style.span}>Dodaj plik</p>
                <input
                    id="file"
                    className={style.input}
                    name="file"
                    type="file"
                    onChange={(event) => {
                        setFile(event.target.files[0]);
                        const x = document.querySelector('#delete');
                        x.style.toggle = {display: 'none'};
                    }}
                />
            <button
                id="delete"
                // style={{display: 'none'}}
                className={style.input}
                type="button"
                onClick={(event) => {
                const field = document.querySelector('#file');
                field.value = null;
            }}>
                X
            </button>
            <p className={style.span}>Jeśli nie wybierzesz daty i godziny, e-mail wyślę się natychmiast.</p>
            <div className={style.divMailContainer}>
                <label className={style.label}>
                    <span className={style.span}>Data:</span>
                    <input
                        className={style.input}
                        type="date"
                        name="date"
                        onChange={(event) => updateForm('date', event.target.value)}
                    />
                </label>
                <label className={style.label}>
                    <span className={style.span}>Godzina:</span>
                    <input
                        className={style.input}
                        type="time"
                        name="time"
                        onChange={(event) => updateForm('time', event.target.value)}
                    />
                </label>
            </div>
            <button className={style.button}>Wyślij mail</button>
        </form>
    </>
};