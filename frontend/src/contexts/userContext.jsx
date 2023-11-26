import { createContext, useEffect, useState } from "react";
import AuthPage from "../screens/auth";


export const UserContext = createContext();

export const isAuthenticated = () => {
    const user = localStorage.getItem('user'); 
    if(!user) {
        return null;
    }
    return JSON.parse(user);
}

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null); 

    useEffect(() => {
        let user = isAuthenticated();
        if(!user) {
            localStorage.setItem('user', ''); 
            user = '';
        }
        setCurrentUser(user);
    }, [localStorage]); 

    

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            { currentUser?.token ? children : <AuthPage /> }
        </UserContext.Provider>
    )
}