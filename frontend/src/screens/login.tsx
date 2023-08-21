import React, { useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import {FaTwitter} from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";



function LoginPage() {
    const userRef = useRef<any>({ name: 'hrudai2002@gmil.com', password: '' }); 
    const [next, setNext] = useState<boolean>(true);
    
    // taking input
    const onChangeUserName = (name) => {
        userRef.current.name = name;
    }

    // validations 
    const onNextClicked = () => {
        if(!userRef.current.name || ! userRef.current.name.includes('@gmail.com')) return;
        setNext(true);
    }


    return (
        <div className='login-container'>
                <div className='login-dialog'>
                    <div className='login-header'>
                        <RxCross2 fontSize={20} color='#fff' style={{position: 'absolute', zIndex: 3, left: 0, top: 0}} /> 
                        <FaTwitter fontSize={30} color='#fff' />
                    </div>
                    <div className='login-content'>
                        {
                            next ? <>
                                 <h2 style={{color: '#fff', fontSize: '31px'}}>Enter your password</h2>
                                 <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <input type='text' className='login-username' style={{backgroundColor: '#111214', opacity: '0.5', padding: '15px 30px'}} value={userRef.current.name} disabled />
                                </div>
                            </> : (<>
                                  <h2 style={{color: '#fff', fontSize: '31px'}}>Sign in to Twitter</h2>  
                                <a className='login-buttons'><FcGoogle style={{backgroundColor: '#fff'}} fontSize={20} /> Sign in with Google</a>
                                <a className='login-buttons'><FaApple style={{backgroundColor: '#fff'}} fontSize={20} /> Sign in with Apple</a>
                                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                    <div className='line-style'/>
                                    <p style={{color: '#fff'}}>or</p>
                                    <div className='line-style'/>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <input ref={userRef} type='email' className='login-username' placeholder='Phone, email or username' onChange={(data) => onChangeUserName(data.target.value)} />
                                </div>
                                <p className='login-buttons' style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={onNextClicked}>Next</p>
                                <p className='login-buttons' style={{fontWeight: 'bold', backgroundColor: 'black', border: '1px solid #fff', color: '#fff'}}>Forget password?</p>
                                <p style={{color: '#71767a', margin: '20px 0'}}>Don't have an account? <span style={{color: '#1c99ec'}}>Sign up</span></p>
                            </>)
                        }
                      
                        </div>
                </div>
        </div>   
    )
}

export default LoginPage;
