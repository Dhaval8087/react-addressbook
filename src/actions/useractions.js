import axios from 'axios';
import toastr from 'toastr';

import config from '../config';
import { GET_USER_LIST, ISLOADING, SEARCH_USER, SET_NAT, SET_PAGE } from '../constants/action-types';

export const isLoading = bool => ({
    type: ISLOADING,
    isLoading: bool

});
export const getUserList = users => ({
    type: GET_USER_LIST,
    users
});
export const setPage = page => ({
    type: SET_PAGE,
    page
})
export const filterUsers = searchString =>({
    type : SEARCH_USER,
    searchString
})
export const setLanguage = nat =>({
    type: SET_NAT,
    nat
})

export const getUsers = (page,nat) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        const url = `${config.API_URL}?nat=${nat.toLowerCase()}&page=${page}&results=${config.PAGE_SIZE}`;
        axios.get(url)
            .then((response) => {
                dispatch(isLoading(false));
                if (response.data) {
                    dispatch(getUserList(response.data.results))
                }
                else {
                    dispatch(getUserList([]));
                }

            }).catch(error => {
                toastr.error(error);
                dispatch(isLoading(false));
            });
    }
}
export const setCurrentPage =(page)=>{
    return (dispatch) => {
        dispatch(setPage(page));
    }
}

