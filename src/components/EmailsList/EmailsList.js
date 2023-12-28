import React, {useEffect, useState} from "react";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";
import {RotatingLines} from "react-loader-spinner";
import styles from "./EmailsList.module.css";

export const EmailsList = ({onEmailSelect}) => {

    const [members, setMembers] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/mail/all`, {
                    method: 'GET',
                });
                const result = await res.json();

                if (result.error) {
                    return toast.warning(result.error);
                }

                setMembers(result);

                let initialList = {};

                /* result is an array of objects */
                result.forEach((obj) => {
                    const [key, email] = Object.entries(obj);
                    initialList = {...initialList, [key[1]]: {email:email[1],method: 'bcc'}};
                });

                setSelectedValue(initialList);
            } catch (error) {
                toast.warning('Błąd ładowania książki adresów', {theme: 'colored', autoClose: 8000});
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) {
        return <div style={{margin: '0 calc(50% - 32px)'}}>
            <RotatingLines
                width='64'
                strokeColor='#555'
                strokeWidth='4'
            />
        </div>
    }

    const handleSelectChange = (memberId, value) => {
        let email = selectedValue[memberId].email;
        let newSelectedValue;

        if (typeof value === 'boolean') {
            newSelectedValue = {
                ...selectedValue,
                [memberId]: {
                    ...selectedValue[memberId],
                    isChecked: value
                }
            };
        } else {
            newSelectedValue = {
                ...selectedValue,
                [memberId]: {
                    ...selectedValue[memberId],
                    method: value
                }
            };
        }

        setSelectedValue(newSelectedValue);
        const { method, isChecked } = newSelectedValue[memberId];
        onEmailSelect(email, method, isChecked);
    };

    return <>
        {members.map((member) => (
            <div key={member.id} className={styles.checkboxListRecord}>
                <input
                    id={member.id}
                    type="checkbox"
                    onChange={event => handleSelectChange(member.id, event.target.checked)}
                />
                <label htmlFor={member.id} className={styles.emailLabel}>{member.email}</label>
                <label htmlFor={member.id}>{member.description}</label>
                <select
                    value={selectedValue[member.id].method}
                    onChange={event => handleSelectChange(member.id, event.target.value)}
                >
                    <option value="bcc">UDW</option>
                    <option value="default">Zwykły</option>
                    <option value="cc">DW</option>
                </select>
            </div>
        ))}
    </>
}
