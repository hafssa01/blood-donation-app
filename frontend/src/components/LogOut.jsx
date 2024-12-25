const logOut = (setLogged) => { 
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('email', "");
    localStorage.setItem('password', "");

    setLogged("false");
}

export default logOut