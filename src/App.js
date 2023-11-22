import {LoginPage} from "./components/LoginPage/LoginPage";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {MailPage} from "./components/MailPage/MailPage";

export function App() {
    return (<>
        <ToastContainer theme="dark" position="top-center"/>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/mail' element={<MailPage/>}/>
        </Routes>
    </>);
}