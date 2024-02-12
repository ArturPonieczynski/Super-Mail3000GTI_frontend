import {Navigate, Route, Routes} from "react-router-dom";
import {LoginView} from "./views/LoginView";
import {EmailFormView} from "./views/EmailFormView";
import {NotFoundView} from "./views/NotFoundView";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
    return <>
        <ToastContainer theme='dark' position='top-center'/>
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace/>}/>
            <Route path='/login' element={<LoginView/>}/>
            <Route path='/email' element={<EmailFormView/>}/>
            <Route path='/*' element={<NotFoundView/>}/>
        </Routes>
    </>
}