import {http} from "../../../helpers";
import actionTypes from "../../action-types";
import {toast} from "react-toastify";

export const savePreferences = (country,author,source,category,startDate) =>  dispatch => {
    http
        .post("/savePreferences",{
            country:country,
            author:author,
            source:source,
            category:category,
            startDate:startDate
        } )
        .then(response => {
            dispatch({ type: actionTypes.SAVE_PREFERENCE, loading: false });
            if (response.data) {
                console.log(response.data)
                dispatch({
                    type: actionTypes.SAVE_PREFERENCE,
                    preferences: {
                        categories:response.data.prefs.categories,
                        authors: response.data.prefs.authors,
                        countries:response.data.prefs.countries,
                        dates: response.data.prefs.dates,
                        sources: response.data.prefs.sources,
                        id:response.data.prefs.id
                    }
                })
            }
        })
        .catch(err => {
            toast.error(err.message);
            dispatch({ type: actionTypes.SEARCHING_ARTICLES, loading: false });
        })
}
export const getPreferenceById = (id) =>  dispatch => {
    http
        .post("/getPreferenceById",{
            id:id
        } )
        .then(response => {
            dispatch({ type: actionTypes.GET_PREFERENCE_BY_ID, loading: false });
            if (response.data) {
                console.log(response.data)
                dispatch({
                    type: actionTypes.GET_PREFERENCE_BY_ID,
                    preference: response.data.preference,
                    articles: response.data.articles
                })
                window.location('/news')
            }
        })
        .catch(err => {
            toast.error(err.message);
            dispatch({ type: actionTypes.GET_PREFERENCE_BY_ID, loading: false });
        })
}