import React from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const CustomToastWithButton = () => {

    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };
    return (
        <div>
            Sesja wygasła, zaloguj się jeszcze raz.
            <br/>
            <br/>
            <button onClick={handleLoginRedirect} style={{width: '100%'}}>Zaloguj</button>
        </div>
    );
};

export const showToastWithButton = () => {
    const toastId = toast.error(<CustomToastWithButton onClose={() => {
        toast.dismiss(toastId);
    }}/>, {
        autoClose: false,
    });
};