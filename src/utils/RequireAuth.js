import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {checkAuthToken} from '../auth/authThunks';

export const RequireAuth = ({children}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(checkAuthToken());
        }
    }, [dispatch, isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
};
