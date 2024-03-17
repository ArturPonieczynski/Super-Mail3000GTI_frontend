import {loginSuccess, loginFailure, logout} from './authSlice';
import {config} from "../config/config";
import {toast} from "react-toastify";

export const login = (credentials) => async (dispatch) => {
    try {
        const loginResponse = await fetch(`${config.apiUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        const result = await loginResponse.json();

        if (!loginResponse.ok || result.error) {
            dispatch(loginFailure(result.error || 'Nieudane logowanie'));
            return toast.error(result.error || 'Nieudane logowanie');
        } else {
            dispatch(loginSuccess(result.user));
        }

    } catch (error) {
        dispatch(loginFailure('Ups... Coś poszło nie tak!'));
        toast.error('Ups... Coś poszło nie tak! Spróbuj ponownie za jakiś czas.');
    }
};

export const checkAuthToken = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${config.apiUrl}/api/login/auth`,
            {
                method: 'GET',
                credentials: 'include',
            }
        );

        if (!response.ok) {
            dispatch(loginFailure('Sesja wygasła lub błąd autoryzacji'));
        } else {
            dispatch(loginSuccess());
        }

    } catch (error) {
        dispatch(loginFailure('Nie udało się zweryfikować sesji'));
        toast.error('Nie udało się zweryfikować sesji');
    }
};

export const signOut = () => (dispatch) => {
    dispatch(logout());
};
