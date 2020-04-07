import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATING,
    SET_USER
} from '../types';

const initialState = {
    authenticated: false,
    authenticating: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                authenticated: true,
                authenticating: false,
                loading: false,
                ...action.payload
            };
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                authenticating: false,
                loading: false
            };
        case SET_AUTHENTICATING:
            return {
                ...state,
                authenticating: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        default:
            return state;
    }
}