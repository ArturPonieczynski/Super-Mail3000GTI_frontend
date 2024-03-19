import React from "react";
import {toast} from "react-toastify";
import {signOut} from "../auth/authThunks";
import {useDispatch} from "react-redux";

const CustomToastWithButton = () => {

    const dispatch = useDispatch();

    const handleLoginRedirect = () => {
        dispatch(signOut())
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

    toast.error(<CustomToastWithButton />, {
        autoClose: false,
    });
};
