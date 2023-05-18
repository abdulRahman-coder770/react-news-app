import actionTypes from '../../action-types';
const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    isAuthLoading: false,
    currentUser: null,
    articles:[],
    preferences: {
        categories: [],
        authors:[],
        sources:[],
        dates:[],
        countries:[],
    },
    preference:{}

};

export const authReducer = (state = initialState, action) => {
    if (action.type === actionTypes.LOGIN_USER) {
        console.log(action.token)
        if (action.token) {
            localStorage.setItem('token', action.token);
        }  
        return {
            ...state,
            isLoggedIn: true,
            currentUser: action.currentUser
        };
    }

    if (action.type === actionTypes.LOGOUT_USER) {
        localStorage.removeItem('token');
        return {
            ...state,
            isLoggedIn: false,
            currentUser: null
        };
    }
    if (action.type === actionTypes.LOAD_USER) {
        return {
            ...state,
            currentUser: action.currentUser
        };
    }
    if (action.type === actionTypes.AUTH_LOADING) {
        return {
            ...state,
            isAuthLoading: action.loading
        };
    }
    if (action.type === actionTypes.LOADING_ALL_ARTICLES) {

        return {
            ...state,
            articles: action.articles,

        };

    }
    if (action.type === actionTypes.SEARCHING_ARTICLES) {

        return {
            ...state,
            articles: action.articles,

        };

    }
    if (action.type === actionTypes.SAVE_PREFERENCE) {

        return {
            ...state.auth,
            articles: action.articles,
            preferences: {
                categories:action.categories,
                authors: action.authors,
                countries:action.countries,
                dates: action.dates,
                sources: action.sources
            }

        };

    }
    if (action.type === actionTypes.GET_PREFERENCE_BY_ID) {

        return {
            ...state.auth,
          preference: action.preference,
            articles: action.articles

        };

    }
    return { ...state };
};

