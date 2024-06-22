import React from 'react';
import styles from './Header.module.css';
import sn_logo from '../../assets/images/sn_logo.webp'
import {useNavigate} from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
}

const Header = ({ isAuth, login, logOut }: HeaderPropsType) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    const handleProfile = () => {
        navigate('/Profile');
    };


    return (
        <header className={styles.header}>
            <img src={sn_logo} alt="Logo" />
            <h1 className={styles.headerTitle}>My Social Network</h1>
            <div className={styles.loginBlock}>
                {isAuth ? (
                    <>
                        <button>{login}</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={handleProfile}>Profile</button>
                            {/*<Link to="/Profile">Profile</Link>*/}
                            <button onClick={logOut}>Logout</button>
                        </div>
                    </>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div>
        </header>
    );
};

export default Header;
