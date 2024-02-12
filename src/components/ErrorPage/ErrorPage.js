import {useNavigate} from "react-router-dom";

import errorLost from "../assets/images/error-lost.png";
import styles from "./ErrorPage.module.css";


export const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img className={styles.img} src={`${errorLost}`} alt="Man lost in space, error 404."/>
                <button
                    className={styles.button}
                    onClick={() => navigate('/')}
                >
                    Help ME
                </button>
            </div>
        </div>
    );
}
