import { Auth, API } from "aws-amplify";

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
    const regex = /^(?=.*[0-9_\W]).+$/;
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
    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address';
    }

    // password
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password !== data.confirmPassword)
        errors.confirmPassword = 'Must match';
    if (!containsLower(data.password))
        errors.password = 'Must contain a lower case letter';
    if (!containsUpper(data.password))
        errors.password = 'Must contain a upper case letter';
    if (!containsDigit(data.password))
        errors.password = 'Must contain a digit';
    if (!containsSpecial(data.password))
        errors.password = 'Must contain a special character';
    if ((data.password).length < 8) errors.password = 'Must not be longer than 7 characters';

    // handle
    if (isEmpty(data.handle)) errors.handle = 'Must not be empty';
    if ((data.handle).length < 5) errors.handle = 'Must not be longer than 5 characters';
    if (containsSpecial(data.handle)) errors.handle = 'Must not contain special characters';

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

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    // valid: Object.keys(errors).length === 0 ? true : false
    return errors;
};
