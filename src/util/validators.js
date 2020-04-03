const isEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

const containsLower = (string) => {
    const regex = /^(?=.*[a-z]).+$/;
    if (regex.test(string)) return true;
    else return false;
}

const containsUpper = (string) => {
    const regex = /^(?=.*[A-Z]).+$/;
    if (regex.test(string)) return true;
    else return false;
}

const containsSpecial = (string) => {
    const regex = /[-!$%^&*()_+|~=`\\#{}[\]:";'<>?,./]/;
    if (regex.test(string)) return true;
    else return false;
}

const containsDigit = (string) => {
    if (string.search(/[0-9]/i)) return true;
    else return false;
}

export const validateSignupData = (data) => {

    let errors = {};


    // email
    if (data.email) {

        if (isEmpty(data.email))
            errors.email = 'Must not be empty';

        else if (!isEmail(data.email))
            errors.email = 'Must be a valid email address';

    } else {
        console.error('Email not present in validation.')
    }

    // password
    if (data.password) {

        if (isEmpty(data.password)) errors.password = 'Must not be empty';

        else if (!containsLower(data.password))
            errors.password = 'Must contain a lower case letter';

        else if (!containsUpper(data.password))
            errors.password = 'Must contain a upper case letter';

        else if (!containsDigit(data.password))
            errors.password = 'Must contain a digit';

        else if (!containsSpecial(data.password))
            errors.password = 'Must contain a special character';

        else if ((data.password).length < 8)
            errors.password = 'Must not be longer than 7 characters';

    } else {
        console.error('Password not present in validation.')
    }

    // confirm password
    if (data.confirmPassword) {

        if (data.password !== data.confirmPassword)
            errors.confirmPassword = 'Must match';

    } else {
        console.error('Confirm password not present in validation.')
    }

    // handle
    if (data.handle) {

        if (isEmpty(data.handle))
            errors.handle = 'Must not be empty';

        else if ((data.handle).length < 5)
            errors.handle = 'Must not be longer than 5 characters';

        else if (containsSpecial(data.handle))
            errors.handle = 'Must not contain special characters';

    } else {
        console.error('Handle not present in validation.')
    }

    if (errors) {
        console.error(errors);

    }

    return errors;
};

export const validateConfirmationSignupData = (data) => {

    let errors = {};

    // password
    if (isEmpty(data.confirmationCode)) errors.confirmationCode = 'Must not be empty';

    return errors;
};


export const validateLoginData = (data) => {
    let errors = {};
    if (data.email) {
        if (isEmpty(data.email)) errors.email = 'Must not be empty';
        if (!isEmail(data.email)) {
            errors.email = 'Must be a valid email address';
        }
    } else {
        console.error('Email not present in validation.')
    }

    if (data.password) {
        if (isEmpty(data.password)) errors.password = 'Must not be empty';
    } else {
        console.error('Password not present in validation.')
    }

    // valid: Object.keys(errors).length === 0 ? true : false
    if (errors) {
        console.error(errors);
    }


    return errors;
};
