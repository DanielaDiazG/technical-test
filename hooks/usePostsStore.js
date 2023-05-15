import { useReducer} from 'react';
import axios from "axios";
import constants from '@/utils/constants';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const {ACTIONS_TYPES} = constants;


function reducer(state, action) {

    switch (action.type) {
        case ACTIONS_TYPES.GET_POSTS: {
            return {
                ...state,
                userId: action.nextUserId,
                posts: action.nextPosts,
            }
        }
    }
}

function usePostStore() {
    const [state, dispatch] = useReducer(
        reducer,
        {userId: "", posts: []}
    );

    const {userId} = JSON.parse(localStorage.getItem('user'));

    const baseURL = process.env.baseUrl;
    const token = process.env.accessToken;

    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + token
    };

    const getPosts = () => {
        axios.get(`${baseURL}/users/${userId}/posts`, {headers}
        ).then((response) => {
            dispatch({
                type: ACTIONS_TYPES.GET_POSTS,
                nextPosts: response.data,
                nextUserId: userId,

            });
        }).catch((error) => {
            console.log(error)
        })
    }

    const createPost = ({title, body, onSuccess}) => {
        const {userId} = JSON.parse(localStorage.getItem('user'));

        axios.post(`${baseURL}/users/${userId}/posts`, {title, body}, {headers}
        ).then((response) => {
            dispatch({
                type: ACTIONS_TYPES.GET_POSTS,
                nextPosts: response.data,
                nextUserId: userId,
            });
            onSuccess()
        }).catch((error) => {
            console.log(error)
            return error
        })
    }

    return {
        createPost,
        posts: state.posts,
        getPosts,}
}

export default usePostStore
