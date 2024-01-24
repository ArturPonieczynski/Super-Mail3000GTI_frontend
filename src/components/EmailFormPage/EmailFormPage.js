import React, {useRef, useState} from "react";
import {config} from "../../config/config";
import {EmailsList} from "../EmailsList/EmailsList";
import {toast} from "react-toastify";
import {validateEmails} from "../../utils/emailValidation";

import styles from "./EmailFormPage.module.css";

export const EmailFormPage = () => {

    const [form, setForm] = useState({
        mailTo: '',
        cc: '',
        bcc: '',
        selectedEmails: [],
        subject: '',
        text: '',
        emailFooter: 'Pozdrawiam\n' + config.emailFooterTemplate,
        date: '',
        time: '',
        timeZoneOffset: '',
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
                    updatedSelectedEmails[existingEmailIndex] = {email, method};
                } else {
                    updatedSelectedEmails.push({email, method});
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
            !form.mailTo &&
            !form.cc &&
            !form.bcc &&
            form.selectedEmails.length === 0
        ) {
            toast.warning('Wypełnij lub wybierz choć jednego adresata.', {autoClose: 8000});
        } else if (
            (!(validateEmails(form.mailTo).valid) && form.mailTo) ||
            (!(validateEmails(form.cc).valid) && form.cc) ||
            (!(validateEmails(form.bcc).valid) && form.bcc)
        ) {
            toast.error(`Podano nieprawidłowy adres e-mail: "${
                (validateEmails(form.mailTo).invalidEmails)[0] ||
                (validateEmails(form.cc).invalidEmails)[0] ||
                (validateEmails(form.bcc).invalidEmails)[0]
            }"`, {autoClose: false});
        } else {

            const timeZone = new Date().getTimezoneOffset().toString();
            setForm(form => {
                return {
                    ...form,
                timeZoneOffset: timeZone,
                }
            });

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
                const sendEmailApiPromise = fetch(`${config.apiUrl}/api/email`, {
                    method: 'POST',
                    /** Can not add header 'multipart/form-data' (?) because causing error on backend. */
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    // },
                    body: formData,
                });

                toast.promise(sendEmailApiPromise, {
                    pending: 'Wysyłanie...',
                    success: 'Wiadomość wysłana !',
                    error: 'Błąd podczas wysyłania wiadomości.'
                })

                const res = await sendEmailApiPromise;
                const result = await res.json();

                if (result.error) {
                    toast.error(`${result.error}`, {autoClose: 8000});
                }

            } catch (error) {
                toast.error('Coś poszło nie tak.', {theme: 'colored'});
            }
        }
    };

    return (
        <form action="" onSubmit={sendForm} className={styles.mailForm}>
            <div className={styles.inputsContainer}>
                <label className={styles.label}>
                    <p className={styles.paragraph}>E-mail:</p>
                    <input
                        className={styles.input}
                        type="text"
                        name="mailTo"
                        placeholder="example@email.com"
                        title={"Możesz wprowadzić kilka adresów jednocześnie oddzielonych od siebie przecinkiem. Przykład:\nexample@email.com, test@email.com"}
                        value={form.mailTo}
                        onChange={event => updateForm(event.target.name, event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <p className={styles.paragraph}>DW:</p>
                    <input
                        className={styles.input}
                        type="text"
                        name="cc"
                        placeholder="example@email.com"
                        title={"Możesz wprowadzić kilka adresów jednocześnie oddzielonych od siebie przecinkiem. Przykład:\nexample@email.com, test@email.com"}
                        value={form.cc}
                        onChange={event => updateForm(event.target.name, event.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <p className={styles.paragraph}>UDW:</p>
                    <input
                        className={styles.input}
                        type="text"
                        name="bcc"
                        placeholder="example@email.com"
                        title={"Możesz wprowadzić kilka adresów jednocześnie oddzielonych od siebie przecinkiem. Przykład:\nexample@email.com, test@email.com"}
                        value={form.bcc}
                        onChange={event => updateForm(event.target.name, event.target.value)}
                    />
                </label>
            </div>
            <EmailsList onEmailSelect={handleEmailSelection}/>
            <label className={styles.label}>
                <p className={styles.paragraph}>Temat:</p>
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
                <p className={styles.paragraph}>Tekst:</p>
                <textarea
                    className={styles.textarea}
                    name="text"
                    rows={10}
                    value={form.text}
                    onChange={event => updateForm(event.target.name, event.target.value)}
                    required
                />
                <textarea
                    className={styles.textarea}
                    name="emailFooter"
                    value={form.emailFooter}
                    onChange={event => updateForm(event.target.name, event.target.value)}
                />
            </label>
            <div className={styles.coloredBox}>
                <p className={styles.paragraph}>Dodaj plik</p>
                <input
                    ref={inputFileRef}
                    className={styles.input}
                    name="file"
                    type="file"
                    onChange={event => {
                        setFileInput(event.target.files[0]);
                        buttonXRef.current.classList.toggle(`${styles.toggleVisibility}`);
                    }}
                />
                <button
                    ref={buttonXRef}
                    className={`${styles.input} ${styles.toggleVisibility}`}
                    type="button"
                    onClick={() => {
                        inputFileRef.current.value = null;
                        setFileInput(null);
                        buttonXRef.current.classList.toggle(`${styles.toggleVisibility}`);
                    }}>
                    X
                </button>
            </div>
            <div className={styles.coloredBox}>
                <p className={styles.paragraph}>Jeśli nie wybierzesz daty i godziny, e-mail wyślę się natychmiast.</p>
                <div className={styles.inputsContainer}>
                    <label className={styles.label}>
                        <p className={styles.paragraph}>Data:</p>
                        <input
                            className={styles.input}
                            type="date"
                            name="date"
                            onChange={event => updateForm(event.target.name, event.target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        <p className={styles.paragraph}>Godzina:</p>
                        <input
                            className={styles.input}
                            type="time"
                            name="time"
                            onChange={(event) => updateForm(event.target.name, event.target.value)}
                        />
                    </label>
                </div>
            </div>
            <button className={styles.button}>Wyślij mail</button>
        </form>
    )
};
