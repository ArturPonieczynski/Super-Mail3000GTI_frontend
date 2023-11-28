import React, {useEffect, useState} from "react";
import styles from "./EmailsList.module.css";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";

export const EmailsList = ({onEmailSelect}) => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/mail/all`, {
                    method: 'GET',
                });
                const result = await res.json();
                setMembers(result);
            } catch (error) {
                toast.error('Błąd ładowania książki adresów', {theme: 'colored'});
                console.error(error);
            }
        };

        fetchMembers();
    }, []);

    return <>
        {members.map((member) => (
            <div key={member.id} className={styles.checkboxListRecord}>
                <input
                    id={member.id}
                    type="checkbox"
                    value={member.email}
                    name={member.email}
                    onChange={(event) => onEmailSelect(member.email, event.target.checked)}
                />
                <label htmlFor={member.id}>{member.email}</label>
                <label htmlFor={member.id}>{member.description}</label>
            </div>
        ))}
    </>
}