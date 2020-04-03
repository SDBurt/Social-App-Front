import {
    SET_POSTS,
    LOADING_DATA,
    // LIKE_POST,
    // UNLIKE_POST,
    // DELETE_POST,
    // SET_ERRORS,
    // POST_POST,
    // CLEAR_ERRORS,
    // LOADING_UI,
    // SET_POST,
    // STOP_LOADING_UI,
    // SUBMIT_COMMENT
} from '../types';

import { API } from 'aws-amplify';

export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_DATA });

    API.get("social", `/posts`)
        .then(res => {
            console.log(res);
            // dispatch({
            //     type: SET_POSTS,
            //     payload: res
            // });
        })
        .catch(err => {
            console.error(err);
            // dispatch({
            //     type: SET_POSTS,
            //     payload: []
            // });
        });

}