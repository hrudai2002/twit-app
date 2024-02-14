import React, { useContext, useEffect, useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axios from 'axios';
import { environmentApi } from "../environment";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { UserContext } from '../contexts/userContext';



const Login = (props: any) => {
    if(props.next) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 70 
            }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 15 
                }}>
                    <h2 style={{ 
                        color: '#fff', 
                        fontSize: '31px' 
                    }}>Enter your password</h2>
                    <div className='email'>
                        <p style={{ 
                            color: '#272a2c', 
                            backgroundColor: '#111214' 
                        }}>Email</p>
                        <h3 style={{ 
                            color: '#272a2c', 
                            backgroundColor: '#111214' 
                        }}>{props.user.email}</h3>
                    </div>
                    <input type='text' className='login-username' placeholder='Password' 
                    style={{ backgroundColor: '#111214', opacity: '0.5', padding: '16px 10px', flex: 1 }}  
                    onChange={(e) => props.setUser({...props.user, password: e.target.value})}
                    />
                </div>
                <div>
                    <p className='login-buttons' style={{ fontWeight: 'bold', cursor: 'pointer', padding: '15px 0' }} onClick={props.login}>Login</p>
                    <p style={{ 
                        color: '#71767a', 
                        margin: '20px 0'
                     }}>Don't have an account? <span style={{ color: '#1c99ec' }} onClick={() => { props.setNext(false); props.setLogin(false) }}>Sign up</span></p>

                </div>
            </div>
        )
    }

    return ( 
        <>
            <h2 style={{ 
                color: '#fff', 
                fontSize: '31px' 
            }}>Sign in to Twitter</h2>
            <a className='login-buttons'><FcGoogle style={{ backgroundColor: '#fff' }} fontSize={20} /> Sign in with Google</a>
            <a className='login-buttons'><FaApple style={{ backgroundColor: '#fff' }} fontSize={20} /> Sign in with Apple</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className='line-style' />
                <p style={{ color: '#fff' }}>or</p>
                <div className='line-style' />
            </div>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <input  type='email' className='login-username' placeholder='Phone, email or username' onChange={(e) => {props.setUser({...props.user, email: e.target.value})}} />
            </div>
            <p className='login-buttons' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { props.setNext(true) }}>Next</p>
            <p className='login-buttons' style={{ fontWeight: 'bold', backgroundColor: 'black', border: '1px solid #fff', color: '#fff' }}>Forget password?</p>
            <p style={{ 
                color: '#71767a', 
                margin: '20px 0' 
            }}>Don't have an account? <span style={{ color: '#1c99ec' }} onClick={() => {props.setLogin(false)}}>Sign up</span></p>
        </>
    )
}

const Signup = (props: any) => {
    return (
        <>
            <h2 style={{ color: '#fff', fontSize: '31px' }}>Create your account</h2>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 15 }}>
                <input type='email' className='login-username' placeholder='name' onChange={(e) => props.setUser({...props.user, name: e.target.value })} style={{ padding: '16px 10px' }} />
                <input type='email' className='login-username' placeholder='email' onChange={(e) => props.setUser({...props.user, email: e.target.value})} style={{ padding: '16px 10px' }} />
                <input type='password' className='login-username' placeholder='password' onChange={(e) => props.setUser({...props.user, password: e.target.value})} style={{ padding: '16px 10px' }} />
            </div>
            <p className='login-buttons' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={props.signUp} >Sign Up</p>
        </>
    )
}

function AuthPage() {
    const [ userData, setUserData ] = useState({
        name: '',  email: '',  password: ''
    });
    const [next, setNext] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(true);
    const navigate = useNavigate(); 

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if(user) {
            navigate('/');
        }
    }, [user])

    // authenticate user
    const signUp = () => {
        axios.post(environmentApi.host + '/user', { 
            name: userData.name, 
            email: userData.email, 
            password: userData.password 
        }).then((res) => {
            if(res.data.success) {
                if(res.data.token) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    setUser(res.data);
                }
                toast.success('registered successfully!');
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => {
            toast.error(err)
        })
    }
    const loginUser = () => {
        axios.post(environmentApi.host + '/user/auth', { 
            email: userData.email, 
            password: userData.password 
        }).then((res) => {
            if(res.data.success) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                setLogin(true);
                toast.success('logged in successfully!');
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => {
            toast.error(err);
        })
    }

    const renderContent = () => {
        if(next || login) {
            return <Login 
            user={userData} 
            next={next} 
            setUser={setUserData} 
            setLogin={setLogin} 
            setNext={setNext} login={loginUser} />
        }
        
        return <Signup user={userData} setUser={setUserData} signUp={signUp} />
    }

    return (
        <div>
            <div className='login-container'>
                <div className='login-dialog'>
                    <div className='login-header'>
                        <RxCross2 fontSize={20} color='#fff' style={{ 
                            position: 'absolute', 
                            zIndex: 3, 
                            left: 0, 
                            top: 0 }}
                         />
                        <FaTwitter fontSize={30} color='#fff' />
                    </div>
                    <div className='login-content' style={{ paddingLeft: next ? '4rem' : '8rem', paddingRight: next ? '4rem' : '8rem' }}>
                        { renderContent() }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
