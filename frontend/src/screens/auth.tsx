import React, { useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axios from 'axios';
import { environment } from '../../environment';



function AuthPage() {
    const userRef = useRef<any>({ email: '', password: '' });
    const [next, setNext] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(true);

    // taking input
    const onChangeUserName = (email) => {
        userRef.current.email = email;
    }

    // validations 
    const onNextClicked = () => {
        if (!userRef.current.email || !userRef.current.email.includes('@gmail.com')) return;
        setNext(true);
    }

    const loginUser = () => {
        axios.post(environment.apiUrl + '/api/users/auth', { email: userRef.current.email, password: userRef.current.password })
        .then((res) => {
            console.log(res);
        })
    }


    return (
        <div className='login-container'>
            <div className='login-dialog'>
                <div className='login-header'>
                    <RxCross2 fontSize={20} color='#fff' style={{ position: 'absolute', zIndex: 3, left: 0, top: 0 }} />
                    <FaTwitter fontSize={30} color='#fff' />
                </div>
                <div className='login-content' style={{ paddingLeft: next ? '4rem' : '8rem', paddingRight: next ? '4rem' : '8rem' }}>
                    {
                        next ? <div style={{ display: 'flex', flexDirection: 'column', gap: 70 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                <h2 style={{ color: '#fff', fontSize: '31px' }}>Enter your password</h2>
                                <div className='email'>
                                    <p style={{ color: '#272a2c', backgroundColor: '#111214' }}>Email</p>
                                    <h3 style={{ color: '#272a2c', backgroundColor: '#111214' }}>{userRef.current.email}</h3>
                                </div>
                                <input type='text' className='login-username' placeholder='Password' style={{ backgroundColor: '#111214', opacity: '0.5', padding: '16px 10px', flex: 1 }} />
                            </div>

                            <div>
                                <p className='login-buttons' style={{ fontWeight: 'bold', cursor: 'pointer', padding: '15px 0' }} onClick={loginUser}>Login</p>
                                <p style={{ color: '#71767a', margin: '20px 0' }}>Don't have an account? <span style={{ color: '#1c99ec' }} onClick={() => { setNext(false); setLogin(false) }}>Sign up</span></p>

                            </div>

                        </div> : (<>
                            {
                                login ? <>
                                    <h2 style={{ color: '#fff', fontSize: '31px' }}>Sign in to Twitter</h2>
                                    <a className='login-buttons'><FcGoogle style={{ backgroundColor: '#fff' }} fontSize={20} /> Sign in with Google</a>
                                    <a className='login-buttons'><FaApple style={{ backgroundColor: '#fff' }} fontSize={20} /> Sign in with Apple</a>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div className='line-style' />
                                        <p style={{ color: '#fff' }}>or</p>
                                        <div className='line-style' />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <input ref={userRef} type='email' className='login-username' placeholder='Phone, email or username' onChange={(data) => onChangeUserName(data.target.value)} />
                                    </div>
                                    <p className='login-buttons' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={onNextClicked}>Next</p>
                                    <p className='login-buttons' style={{ fontWeight: 'bold', backgroundColor: 'black', border: '1px solid #fff', color: '#fff' }}>Forget password?</p>
                                    <p style={{ color: '#71767a', margin: '20px 0' }}>Don't have an account? <span style={{ color: '#1c99ec' }} onClick={() => setLogin(false)}>Sign up</span></p>
                                </> : <>
                                     <h2 style={{ color: '#fff', fontSize: '31px' }}>Create your account</h2>
                                     <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 15 }}>
                                        <input type='email' className='login-username' placeholder='email' style={{padding: '16px 10px'}} />
                                        <input type='password' className='login-username' placeholder='password' style={{padding: '16px 10px'}}/>
                                    </div>
                                    <p className='login-buttons' style={{ fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</p>
                                </>
                            }
                        </>)
                    }

                </div>
            </div>
        </div>
    )
}

export default AuthPage;
