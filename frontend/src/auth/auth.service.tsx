

export const login = (username, password) => {
    const res = { data: {token: null} };
    const token = res.data.token; 
    if(token) {
        localStorage.setItem('user', JSON.stringify(res.data)); 
    }
    return res.data;
}

export const isAuthenticated = () => {
    const user = localStorage.getItem('user'); 
    if(!user) {
        return null;
    }
    return JSON.parse(user);
}