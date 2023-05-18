import actionTypes from '../../action-types/';
import { history } from '../../../helpers';
import { http } from '../../../helpers';
import { toast } from 'react-toastify';

export const getArticlesAction = () =>  dispatch => {
    http
        .get("/allArticles", )
        .then(response => {
            dispatch({ type: actionTypes.LOADING_ALL_ARTICLES, loading: false });
            if (response.data) {
                dispatch({
                    type: actionTypes.LOADING_ALL_ARTICLES,
                    articles:response.data
                })
                console.log(response.data)
            }
        })
        .catch(err => {
            toast.error(err.message);
            dispatch({ type: actionTypes.LOADING_ALL_ARTICLES, loading: false });
        })
}

export const searchArticles = (searchTerm,country,author,source,category,startDate) =>  dispatch => {
    http
        .post("/searchArticles",{
            searchTerm:searchTerm,
            country:country,
            author:author,
            source:source,
            category:category,
            startDate:startDate
        } )
        .then(response => {
            dispatch({ type: actionTypes.SEARCHING_ARTICLES, loading: false });
            if (response.data) {
                console.log(searchTerm)
                console.log(response.data)
                dispatch({
                    type: actionTypes.SEARCHING_ARTICLES,
                    articles:response.data
                })
            }
        })
        .catch(err => {
            toast.error(err.message);
            dispatch({ type: actionTypes.SEARCHING_ARTICLES, loading: false });
        })
}
