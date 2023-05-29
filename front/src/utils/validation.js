// function to check if the input is a valid email address
export const isEmail = (email) => {
    // check if email is an email address
    const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return re.test(email);
}
