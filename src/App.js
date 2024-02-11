import {LoginPage} from "./components/LoginPage/LoginPage";
import {ToastContainer} from "react-toastify";
import {Navigate, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {EmailFormPage} from "./components/EmailFormPage/EmailFormPage";
import {Footer} from "./components/Footer/Footer";

export function App() {
    return (<>
        <ToastContainer theme='dark' position='top-center'/>
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/email' element={<EmailFormPage/>}/>
        </Routes>
        <Footer/>
    </>);
}