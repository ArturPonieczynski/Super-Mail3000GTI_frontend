import React from "react";
import styles from "./EmailsList.module.css";

export const EmailsList = () => {
    return (
        <div className={styles.checkboxListRecord}>
            <input id="first" type="checkbox" value="mail@test.com" name="test"/>
            <label htmlFor="first">example@mail.com</label>
            <p>mail.com</p>
        </div>
    )
}