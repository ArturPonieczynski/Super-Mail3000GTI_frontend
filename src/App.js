import './App.css';
import {LoginPage} from "./components/LoginPage/LoginPage";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


export function App() {
    return (<>
        <ToastContainer theme="dark" position="top-center"/>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    </>);
}