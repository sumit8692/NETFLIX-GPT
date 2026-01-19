const checkValidData = (email, password, name = null    ) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
    if(name) {
        const isNameValid = /^[a-zA-Z]+$/.test(name);
        if(!isNameValid) return "Name is not valid";
    }
    if(!isEmailValid) return "Email is not valid";
    if(!isPasswordValid) return "Password is not valid";
    return null;
}

export default checkValidData;