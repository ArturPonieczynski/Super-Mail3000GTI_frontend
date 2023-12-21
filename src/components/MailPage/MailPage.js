import React, {useRef, useState} from "react";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";
import styles from "./MailPage.module.css";
import {EmailsList} from "../EmailsList/EmailsList";

export const MailPage = () => {

    const [form, setForm] = useState({
        mailTo: '',
        cc: '',
        bcc: '',
        selectedEmails: [],
        subject: '',
        text: '',
        date: '',
        time: '',
    });

    const [fileInput, setFileInput] = useState(null);

    const buttonXRef = useRef(null);
    const inputFileRef = useRef(null);
    const updateForm = (key, value) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));

    };
    const handleEmailSelection = (email, method, isChecked) => {
        setForm(form => {
            const existingEmailIndex = form.selectedEmails.findIndex(obj => obj.email === email);

            let updatedSelectedEmails = [...form.selectedEmails];
            if (isChecked) {
                if (existingEmailIndex > -1) {
                    updatedSelectedEmails[existingEmailIndex] = { email, method };
                } else {
                    updatedSelectedEmails.push({ email, method });
                }
            } else {
                updatedSelectedEmails = updatedSelectedEmails.filter(obj => obj.email !== email);
            }
            return {
                ...form,
                selectedEmails: updatedSelectedEmails,
            };
        });
    };
    const sendForm = async (event) => {

        event.preventDefault();

        if (
            !form.mailTo && !form.cc && !form.bcc && form.selectedEmails.length === 0
        ) {
            toast.warning('Wypełnij lub wybierz choć jednego adresata.', {autoClose: 8000});
        }
        else {

            const formData = new FormData();
            const formEntries = Object.entries(form);
            formEntries.map(([key, value]) => {
                if (key === 'selectedEmails') {
                    const stringValue = JSON.stringify(value);
                    return formData.append(key, stringValue);
                } else {
                    return formData.append(key, value)
                }
            });

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

                toast.promise(resPromise, {
                    pending: 'Wysyłanie...',
                    success: 'Wiadomość wysłana !',
                    error: 'Błąd podczas wysyłania wiadomości.'
                })

                const res = await resPromise;
                const result = await res.json();

                if (result.error) {
                    toast.error(`${result.error}`);
                }

            } catch (error) {
                toast.error('Coś poszło nie tak.', {theme: 'colored'});
            }

        }};

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
                        onChange={event => updateForm(event.target.name, event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.span}>DW:</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="cc"
                        placeholder="example@mail.com"
                        value={form.cc}
                        onChange={event => updateForm(event.target.name, event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.span}>UDW:</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="bcc"
                        placeholder="example@mail.com"
                        value={form.bcc}
                        onChange={event => updateForm(event.target.name, event.target.value)}
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
                    onChange={(event) => updateForm(event.target.name, event.target.value)}
                    required/>
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Tekst:</span>
                <textarea
                    className={styles.textarea}
                    name="text"
                    rows={10}
                    value={form.text}
                    onChange={event => updateForm(event.target.name, event.target.value)}
                    required
                />
            </label>
            <p className={styles.span}>Dodaj plik</p>
            <input
                ref={inputFileRef}
                className={styles.input}
                name="file"
                type="file"
                onChange={event => {
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
                        onChange={event => updateForm(event.target.name, event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.span}>Godzina:</span>
                    <input
                        className={styles.input}
                        type="time"
                        name="time"
                        onChange={(event) => updateForm(event.target.name, event.target.value)}
                    />
                </label>
            </div>
            <button className={styles.button}>Wyślij mail</button>
        </form>
    </>
};
