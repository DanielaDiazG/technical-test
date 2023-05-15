import {useReducer} from 'react';
import axios from "axios";
import constants from '@/utils/constants';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const {ACTIONS_TYPES} = constants;


function reducer(state, action) {

    switch (action.type) {
        case ACTIONS_TYPES.GET_COMMENTS: {
            return {
                ...state,
                postId: action.nextPostId,
                comments: action.nextComments,
            }
        }
        case ACTIONS_TYPES.ADD_COMMENT: {
            return {
                ...state,
                comments: [...state.comments, action.nextComment],
            }
        }
    }
}

function usePostStore() {
    const [state, dispatch] = useReducer(
        reducer,
        {postId: "", coments: []}
    );

    const baseURL = process.env.baseUrl;
    const token = process.env.accessToken;

    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + token
    };

    const getComments = (postId) => {
        axios.get(`${baseURL}/posts/${postId}/comments`, {headers}
        ).then((response) => {
            dispatch({
                type: ACTIONS_TYPES.GET_COMMENTS,
                nextComments: response.data,
                nextPostId: response.data.id,

            });
        }).catch((error) => {
            console.log(error)
        })
    }

    const createComment = ({comment, postId, name, email, onSuccess}) => {
        axios.post(`${baseURL}/posts/${postId}/comments`,
            {
                post_id: parseInt(postId),
                name,
                email,
                body: comment
            },
            {headers}
        ).then((response) => {
            dispatch({
                type: ACTIONS_TYPES.ADD_COMMENT,
                nextComment: response.data,
            });
            onSuccess()
        }).catch((error) => {
            console.log(error)
            return error
        })
    }

    return {
        getComments,
        createComment,
        comments: state.comments
    }
}

export default usePostStore
