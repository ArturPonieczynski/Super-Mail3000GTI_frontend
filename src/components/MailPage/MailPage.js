import React, {useRef, useState} from "react";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";
import styles from "./MailPage.module.css";
import {EmailsList} from "../EmailsList/EmailsList";

export const MailPage = () => {

    const [form, setForm] = useState({
        mailTo: '',
        dw: '',
        udw: '',
        selectedEmails: [],
        subject: '',
        text: '',
        date: '',
        time: '',
    });

    const [fileInput, setFileInput] = useState(null);

    const updateForm = (key, value) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const handleEmailSelection = (email, isChecked) => {
        if (isChecked) {
            updateForm('selectedEmails', [...form.selectedEmails, email]);
        } else {
            updateForm('selectedEmails', form.selectedEmails.filter(listItem => listItem !== email));
        }
    };

    const sendForm = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        const formEntries = Object.entries(form);
        formEntries.map(([key, value]) => formData.append(key, value));
        formData.append('file', fileInput);

        try {
            const resPromise = fetch(`${apiUrl}/api/mail`, {
                method: 'POST',
                /** Can not add header 'multipart/form-data' (?) because causing error on backend. */
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                body: formData,
            });

            toast.promise(resPromise,{
                pending: 'Wysyłanie...',
                success: 'Wiadomość wysłana !',
                error: 'Błąd podczas wysyłania wiadomości.'
            })

            const res = await resPromise;
            const result = await res.json();

            if (result.error) {
                toast.error(`${result.error}`);
                return;
            }
            if (result.response) {
                // setTimeout(() => navigate('/mail'), 5000);
                // toast.success('Wiadomość wysłana.', {theme: 'colored'})
            }

        } catch (error) {
            toast.error('Coś poszło nie tak.', {theme: 'colored'});
            // navigate('/login');
        }
    };

    const buttonXRef = useRef(null);
    const inputFileRef = useRef(null);

    return <>
        <form action="" onSubmit={sendForm} className={styles.mailForm}>
            <div className={styles.divMailContainer}>
                <label className={styles.label}>
                    <span className={styles.span}>E-mail:</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="mailTo"
                        placeholder="example@mail.com"
                        value={form.mailTo}
                        onChange={(event) => updateForm('mailTo', event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.span}>DW:</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="dw"
                        placeholder="example@mail.com"
                        value={form.dw}
                        onChange={(event) => updateForm('dw', event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.span}>UDW:</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="udw"
                        placeholder="example@mail.com"
                        value={form.udw}
                        onChange={(event) => updateForm('udw', event.target.value)}
                    />
                </label>
            </div>
            <EmailsList onEmailSelect={handleEmailSelection}/>
            <label className={styles.label}>
                <span className={styles.span}>Temat:</span>
                <input
                    className={styles.input}
                    type="text"
                    name="subject"
                    placeholder="Temat"
                    value={form.subject}
                    onChange={(event) => updateForm('subject', event.target.value)}
                    required/>
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Tekst:</span>
                <textarea
                    className={styles.textarea}
                    name="text"
                    rows={10}
                    value={form.text}
                    onChange={(event) => updateForm('text', event.target.value)}
                    required
                ></textarea>
            </label>
            <p className={styles.span}>Dodaj plik</p>
            <input
                ref={inputFileRef}
                className={styles.input}
                name="file"
                type="file"
                onChange={(event) => {
                    setFileInput(event.target.files[0]);
                    buttonXRef.current.classList.toggle(`${styles.toggleVisible}`);
                }}
            />
            <button
                ref={buttonXRef}
                className={`${styles.input} ${styles.toggleVisible}`}
                type="button"
                onClick={() => {
                    inputFileRef.current.value = null;
                    setFileInput(null);
                    buttonXRef.current.classList.toggle(`${styles.toggleVisible}`);
                }}>
                X
            </button>
            <p className={styles.span}>Jeśli nie wybierzesz daty i godziny, e-mail wyślę się natychmiast.</p>
            <div className={styles.divMailContainer}>
                <label className={styles.label}>
                    <span className={styles.span}>Data:</span>
                    <input
                        className={styles.input}
                        type="date"
                        name="date"
                        onChange={(event) => updateForm('date', event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.span}>Godzina:</span>
                    <input
                        className={styles.input}
                        type="time"
                        name="time"
                        onChange={(event) => updateForm('time', event.target.value)}
                    />
                </label>
            </div>
            <button className={styles.button}>Wyślij mail</button>
        </form>
    </>
};
