import { createContext, useEffect, useState } from "react";
import AuthPage from "../../screens/auth";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null); 

    useEffect(() => {
        let user = localStorage.getItem('user');
        if(!user) {
            localStorage.setItem('user', ''); 
            user = '';
        }
        setCurrentUser(user);

    }, []); 

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            { currentUser?.token ? children : <AuthPage /> }
        </UserContext.Provider>
    )
}