// AWS
import { Auth } from "aws-amplify";
import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SET_AUTHENTICATING,
} from '../types';

export const loginUser = async (userData, history) => async dispatch => {
    dispatch({ type: LOADING_UI });
    try {
        await Auth.signIn(userData.email, userData.password);
        dispatch({ type: SET_AUTHENTICATED })
        dispatch({ type: CLEAR_ERRORS });
        history.push('/')
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }


};

export const logoutUsaer = async () => async dispatch => {
    dispatch({ type: LOADING_UI });
    await Auth.signOut();
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const signupUser = (userData) => dispatch => {
    dispatch({ type: LOADING_UI });
    Auth.signUp(userData.email, userData.password)
        .then((data) => {
            console.log(data);
            dispatch({ type: CLEAR_ERRORS })
            dispatch({ type: SET_AUTHENTICATING })
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err
            });
        });
}

export const confirmSignupUser = (userData, confirmationCode) => dispatch => {
    dispatch({ type: LOADING_UI });
    Auth.confirmSignUp(userData.email, confirmationCode)
        .then((data) => {
            console.log(data);
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch((err) => {
            console.error(err);
        });
    Auth.signIn(userData.email, userData.password)
        .then((data) => {
            console.log(data);
            dispatch({ type: SET_AUTHENTICATED })
        })
        .catch((err) => {
            console.error(err);
        });

}