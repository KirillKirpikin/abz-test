import React from 'react';
import { Link } from 'react-router-dom';

import styles from './haeder.module.scss';

import ILogo from '../../assets/Logo.svg';

import { scrollTo } from '@utils/scrollTo';

interface IHederProps {
    refs: {
        listUserRef: React.RefObject<HTMLDivElement>;
        makeUserRef: React.RefObject<HTMLDivElement>;
    };
}
const Header: React.FC<IHederProps> = ({ refs }) => {
    const { listUserRef, makeUserRef } = refs;
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to={'/'} className={styles.logo}>
                    <img src={ILogo} alt="logo" />
                </Link>
                <div className={styles.btns}>
                    <button
                        className="btn_standart"
                        onClick={() => scrollTo(listUserRef)}
                    >
                        Users
                    </button>
                    <button
                        className="btn_standart"
                        onClick={() => scrollTo(makeUserRef)}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
