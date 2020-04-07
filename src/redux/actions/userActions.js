// AWS
import { Auth, API } from "aws-amplify";
import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SET_AUTHENTICATING,
    SET_USER,
    LOADING_USER
} from '../types';

function createUser(userData) {

}

export const loginUser = (userData, history) => dispatch => {
    console.log('loginUser');
    dispatch({ type: LOADING_UI });
    Auth.signIn(userData.email, userData.password)
        .then(res => {
            console.log(res);
            dispatch({
                type: SET_USER, payload: {
                    credentials: {
                        handle: userData.handle,
                        email: userData.email
                    }
                }
            })
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: { general: err.message }
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
            history.push('/');
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: { general: err.message }
            });
        });

}

export const signupUser = (userData) => dispatch => {
    dispatch({ type: LOADING_UI });

    API.get("social", `/user/${userData.handle}`)
        .then(res => {
            console.log('signup user response: ');
            console.log(res);

            dispatch({
                type: SET_ERRORS,
                payload: { handle: 'Handle already exists' }
            });

        })
        .catch(() => {
            Auth.signUp({
                username: userData.email,
                password: userData.password,
                attributes: { "custom:handle": userData.handle }
            })
                .then((data) => {
                    console.log(data);
                    dispatch({ type: CLEAR_ERRORS });
                    dispatch({ type: SET_AUTHENTICATING });

                    API.post("social", '/user', {
                        handle: userData.handle,
                        email: userData.email,
                        confirmed: false
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.error(err);
                    });
                })
                .catch((err) => {
                    console.error(err);
                    dispatch({
                        type: SET_ERRORS,
                        payload: { general: err.message }
                    });
                });
        })
}

export const confirmSignupUser = (userData, confirmationCode, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    Auth.confirmSignUp(userData.email, confirmationCode)
        .then((res) => {
            console.log(res);

            // TODO: Create confirmation

            Auth.signIn(userData.email, userData.password)
                .then((data) => {
                    console.log(data);
                    dispatch({ type: SET_AUTHENTICATED })
                    dispatch({ type: CLEAR_ERRORS })
                    history.push('/');
                })
                .catch((err) => {
                    console.error(err);
                    dispatch({
                        type: SET_ERRORS,
                        payload: { general: err.message }
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: { general: err.message }
            });
        });
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_USER });


    API.get("social", `/auth/${userHandle}`)
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res
            });
        })
        .catch((err) => {
            console.error(err)
        });
};