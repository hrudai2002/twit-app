import React from 'react';

function LoginPage() {
    return (
        <div style={styles.loginContainer}>
                <div style={styles.loginDialog}>
                    <h1 style={{color: '#fff'}}>Hello World</h1>
                </div>
        </div>   
    )
}

export default LoginPage;


const styles = {
    loginContainer: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#242d35',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginDialog: {
        borderRadius: '10px', 
        padding: '10px',
    }
}
