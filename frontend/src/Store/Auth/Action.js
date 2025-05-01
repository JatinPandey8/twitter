import axios from 'axios';
import { api, API_BASE_URL } from "../../config/api"
import { GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE, LOGOUT } from "./ActionType"


export const loginUser = (loginData) => async (dispatch) => {
    try {
         console.log("Login data being sent: ", loginData);  
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData)
           console.log("Login response data: ", data); 
           console.log("Full response from backend: ", data);

       if (data.token) {
  localStorage.setItem("jwt", data.token);
  console.log("JWT saved to localStorage: ", data.token);
} 

        dispatch({ 
          type: LOGIN_USER_SUCCESS, 
          payload: { jwt: data.token, user: data.user } 
        });

        return { success: true }
    } catch (error) {
        console.error("Login failed: ", error); 
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.message })
        return { success: false, error: error.message }
    }
}

export const registerUser = (registerData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData)
        console.log("logged in user", data)
        if (data.token) {
            localStorage.setItem("jwt", data.token)
        }
        dispatch({ type: REGISTER_USER_SUCCESS,  payload: {
    jwt: data.token,
    user: data.user 
  }, })
    } catch (error) {
        console.log("error", error)
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.message })
    }
}
// export const getUserProfile = (jwt) => async (dispatch) => {
//   try {
//     const { data } = await api.get(`${API_BASE_URL}/api/users/profile`, {
//       headers: {
//         "Authorization": `Bearer ${jwt}`
//       }
//     })

//     dispatch({ type: GET_USER_PROFILE_SUCCESS, payload:data })
//   } catch (error) {
//     dispatch({ type: GET_USER_PROFILE_FAILURE, payload:error.message })
//   }
// }

export const getUserProfile = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/users/profile");
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("getUserProfile error: ", error.response?.data || error.message);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
}

 
export const findUserById = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/users/${userId}`);

        //const { data } = await axios.get(`/api/users/${userId}`);
        dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
    }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/users/update`, reqData)
        console.log("updated user", data)
        dispatch({ type:UPDATE_USER_SUCCESS, payload:data })
        }
    catch (error) {
        console.log("error", error)
        dispatch({ type:UPDATE_USER_FAILURE, payload:error.message })
    }
}

export const followUserAction = (userId) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/users/${userId}/follow`)
        console.log("followed user", data)
        dispatch({ type:FOLLOW_USER_SUCCESS, payload:data })
        }
    catch (error) {
        console.log("error", error)
        dispatch({ type:FOLLOW_USER_FAILURE, payload:error.message })
    }
}

export const logout = () => async (dispatch) => {

    localStorage.removeItem("jwt")
    dispatch({ type: LOGOUT, payload: null })
}
