// AWS
import { Auth, API } from "aws-amplify";
import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SET_AUTHENTICATING,
} from '../types';

export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    Auth.signIn(userData.email, userData.password)
        .then(res => {
            console.log(res);
            dispatch({ type: SET_AUTHENTICATED })
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.message
            });
        });
};

export const logoutUser = (history) => dispatch => {
    dispatch({ type: LOADING_UI });
    Auth.signOut()
        .then(res => {
            console.log(res);
            dispatch({ type: SET_UNAUTHENTICATED });
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.message
            });
        });

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
                payload: err.message
            });
        });
}

function createUser(userData) {
    return API.post("users", "/users", {
        body: userData
    });
}

export const confirmSignupUser = (userData, confirmationCode) => dispatch => {
    dispatch({ type: LOADING_UI });
    Auth.confirmSignUp(userData.email, confirmationCode)
        .then((res) => {
            console.log(res);

            // confirmed, therefore create user in users table
            createUser(
                {
                    handle: userData.handle,
                    email: userData.email
                }
            )
            dispatch({ type: CLEAR_ERRORS })

            Auth.signIn(userData.email, userData.password)
                .then((data) => {
                    console.log(data);
                    dispatch({ type: SET_AUTHENTICATED })
                })
                .catch((err) => {
                    console.error(err);
                    dispatch({
                        type: SET_ERRORS,
                        payload: err.message
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.message
            });
        });


}