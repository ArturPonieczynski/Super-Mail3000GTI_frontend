import React, {useEffect, useRef, useState} from "react";
import styles from "./EmailsList.module.css";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";

export const EmailsList = () => {

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
                console.log(error);
            }
        };

        fetchMembers();
    }, []);

    const emailListContainerRef = useRef(null);

    return <div ref={emailListContainerRef}>
        {members.map((member) => (
            <div key={member.id} className={styles.checkboxListRecord}>
                <input id={member.id} type="checkbox" value={member.email} name={member.email}/>
                <label htmlFor={member.id}>{member.email}</label>
                <label htmlFor={member.id}>{member.description}</label>
            </div>
        ))}
    </div>
}