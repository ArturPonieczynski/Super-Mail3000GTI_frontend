import React, {useEffect, useState} from "react";
import styles from "./EmailsList.module.css";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";

export const EmailsList = ({onEmailSelect}) => {

    const [members, setMembers] = useState([]);
    // const [checkedValue, setCheckedValue] = useState(new Map());
    const [selectedValue, setSelectedValue] = useState({});


    // const handleSelectChange = (memberId, value) => {
    //
    //     if (typeof value === 'boolean') {
    //         setSelectedValue(selectedValue => {
    //             return {...selectedValue, [memberId]:{...selectedValue[memberId],isChecked: value}};
    //         })
    //     } else {
    //         setSelectedValue(selectedValue => {
    //             return {...selectedValue, [memberId]:{...selectedValue[memberId],method: value}}
    //         });
    //     }
    //     console.log(selectedValue);
    //     const [email, method, isChecked] = Object.values(selectedValue[memberId]);
    //     console.log(email, method, !isChecked);
    //     onEmailSelect(
    //         email,
    //         method,
    //         !isChecked
    //     )
    // };

    const handleSelectChange = (memberId, value) => {
        let email = members.find(member => member.id === memberId).email;
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

    // const handleCheckedChange = (memberId, value) => {
    //     setCheckedValue(prev => prev.set(memberId, value));
    // };

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/mail/all`, {
                    method: 'GET',
                });
                const result = await res.json();
                setMembers(result);

                let initialList = {};

                /* result is an array of objects */
                result.forEach((obj) => {
                    const [key, email] = Object.entries(obj);
                    initialList = {...initialList, [key[1]]: {email:email[1],method: 'udw'}};
                });

                setSelectedValue(initialList);
            } catch (error) {
                toast.error('Błąd ładowania książki adresów', {theme: 'colored'});
                console.error(error);
            }
        };

        fetchMembers();
    }, []);

    useEffect(() => {

    }, [selectedValue]);

    console.log(selectedValue);

// Teraz możesz łatwo uzyskać dostęp do wartości za pomocą adresu e-mail
//     const exampleEmail = 'pol9488@wp.pl';
//     console.log(emailToValueMap.get(exampleEmail));

    return <>
        {members.map((member) => (
            <div key={member.id} className={styles.checkboxListRecord}>
                <input
                    id={member.id}
                    type="checkbox"
                    value={member.email}
                    name={member.email}
                    onChange={event => handleSelectChange(member.id, event.target.checked)}
                />
                <label htmlFor={member.id}>{member.email}</label>
                <label htmlFor={member.id}>{member.description}</label>
                <select
                    value={selectedValue[member.id].method}
                    onChange={event => handleSelectChange(member.id, event.target.value)}
                >
                    <option value="udw">UDW</option>
                    <option value="1">Zwykły</option>
                    <option value="dw">DW</option>
                </select>
            </div>
        ))}
    </>
}
