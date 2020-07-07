import * as ActionTypes from './ActionTypes';

export const Comments = (state = {err: null, comments: []}, action) => {
    switch(action.type) {

        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, err: null, comments: action.payload};
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, err: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};
        
        default:
            return state;
    }
}