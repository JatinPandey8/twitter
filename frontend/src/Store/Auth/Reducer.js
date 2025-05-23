import { LOGIN_USER_SUCCESS, LOGIN_USER_REQUEST, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST, LOGIN_USER_FAILURE, REGISTER_USER_FAILURE, GET_USER_PROFILE_FAILURE, LOGOUT, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_SUCCESS, UPDATE_USER_SUCCESS } from "./ActionType"
import axios from 'axios';

const initialState = {
    user: null,
    error: null,
    jwt: null,
    loading: false,
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null }

        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload.jwt,  user: action.payload.user, }
        case GET_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload }
        //  case UPDATE_USER_SUCCESS:
        //     return { ...state, loading: false, error: null, user: action.payload, updateUser:true }
        case FIND_USER_BY_ID_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, error: null, findUser: action.payload }
        case FOLLOW_USER_SUCCESS:
            return { ...state, loading: false, error: null, findUser: action.payload }
        case LOGOUT:
            return initialState
        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_PROFILE_FAILURE:
            return { ...state, loading: false, error:   action.payload }
        default:
            return state;
    }
}; 