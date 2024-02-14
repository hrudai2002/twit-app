import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    if(!user) {
        return null;
    }
    return JSON.parse(user);
}

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        let loggedUser = isAuthenticated();
        if(!loggedUser) {
            localStorage.setItem('user', ''); 
            loggedUser = '';
        }
        setUser(loggedUser);
    }, []); 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}