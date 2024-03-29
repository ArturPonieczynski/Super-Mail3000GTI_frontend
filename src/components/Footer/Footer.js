import React from "react";
import styles from "./Footer.module.css";

export const Footer = ({children}) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.footerText}>
                    Copyright © 2023 | Created by Artur Ponieczyński™ | Icon url:
                    https://thenounproject.com/term/super-man/2776274
                    licence:
                    https://creativecommons.org/licenses/by/3.0/
                </p>
                <p className={styles.footerText}>
                    {children}
                </p>
            </div>
        </footer>
    );
}