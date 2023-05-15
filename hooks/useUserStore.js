import { useReducer } from 'react';
import axios from "axios";
import constants from '@/utils/constants';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const { USER_STATUS, ACTIONS_TYPES } = constants;

const baseURL = process.env.baseUrl;
const token = process.env.accessToken;

let headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": 'Bearer ' + token
};

function reducer(state, action) {

    switch (action.type) {
            case ACTIONS_TYPES.LOGIN_USER: {
            return {
                ...state,
                status: action.nextStatus,
                userName: action.nextUserName,
                userId: action.nextUserId,
            }
        }
        case ACTIONS_TYPES.LOG_OUT_USER: {
            return{
                ...state,
                userName:"",
                status: USER_STATUS.LOGGED_OUT,
                userId: null
            }
        }
    }
}

function useUserStore() {
    const [state, dispatch] = useReducer (
        reducer,
        { userName:"", status: USER_STATUS.LOGGED_OUT, userId: null }
    );

    const createUser = ({name, email, gender}) =>{
        axios.post(`${baseURL}/users`, {name, email, gender, status: "active"}, {headers}
        ).then((response) => {
            const {name, id}=response.data;
            localStorage.setItem('user', JSON.stringify({name:name, userId:id}))
            dispatch({
                type: ACTIONS_TYPES.LOGIN_USER,
                nextStatus: USER_STATUS.LOGGED_IN,
                nextUserName: name,
                nextUserId: id,

            });
        }).catch((error) => {
            console.log(error)
        })
    }

    return {
        createUser,
        userStatus: state.status,
    }
}

export default useUserStore
