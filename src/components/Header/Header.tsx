import React from 'react';
import styles from './Header.module.css';
import sn_logo from '../../assets/images/sn_logo.webp'
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {getIsAuth, getLogin} from "../../Redux/Selectors/auth-selectors";

export type HeaderPropsType = {}

export const Header: React.FC<HeaderPropsType> = (props) => {

    const login = useSelector(getLogin)
    const isAuth = useSelector(getIsAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        //debugger;
        dispatch(logOut());
    }
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
                            <button onClick={logout}>Logout</button>
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
