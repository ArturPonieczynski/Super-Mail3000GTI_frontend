import {Navigate, Route, Routes} from "react-router-dom";
import {EmailFormPage} from "./components/EmailFormPage/EmailFormPage";
import {LoginView} from "./views/LoginView";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export function App() {
    return <>
        <ToastContainer theme='dark' position='top-center'/>
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace/>}/>
            <Route path='/login' element={<LoginView/>}/>
            <Route path='/email' element={<EmailFormPage/>}/>
        </Routes>
    </>;
}