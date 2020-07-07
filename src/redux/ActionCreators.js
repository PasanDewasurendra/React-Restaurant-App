import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error '+ response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(res => res.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (err) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHED,
    payload: dishes
})


export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl+'comments')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error: '+ response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(res => res.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err.message)));
}

export const commentsFailed = (err) => ({
    type: ActionTypes.COMMENTS_FAILED,
    paylaod: err
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    console.log('ccccccc'+JSON.stringify(newComment))

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error '+ response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(res => res.json())
    .then(res => dispatch(addComment(res)))
    .catch(err => {
        console.log('Post comments', err.message)
        alert('your comment could not be posted\nError: '+err.message)
    })
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error: '+ response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(res => res.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(err => dispatch(promosFailed(err.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (err) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: err
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})



export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error: '+ response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(res => res.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (err) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: err
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    newFeedback.date = new Date().toISOString();
    console.log('feeeeeedback'+JSON.stringify(newFeedback))

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error '+ response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(res => res.json())
    .then(res => {
        alert('Thank for your feedback! \n'+ JSON.stringify(res))
    })
    .catch(err => {
        console.log('Post Feedback', err.message)
        alert('your Feedback could not be posted\nError: '+err.message)
    })
}