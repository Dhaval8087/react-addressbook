import { GET_USER_LIST, ISLOADING, SEARCH_USER, SET_NAT, SET_PAGE } from '../constants/action-types';

const getInitialState = () => ({
    users: [],
    isLoading: false,
    page: 0,
    filterUser: [],
    nat: 'US'
});
const userReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ISLOADING:
            return { ...state, isLoading: action.isLoading };
        case GET_USER_LIST:
            return { ...state, users: [...state.users, ...action.users], filterUser: [...state.users, ...action.users] };
        case SET_PAGE:
            return { ...state, page: action.page };
        case SEARCH_USER:
            const filterUser = state.filterUser.filter(p => p.name.first.toLowerCase().indexOf(action.searchString.toLowerCase()) > -1);
            return { ...state, users: filterUser.length > 0 ? filterUser : state.users };
        case SET_NAT:
            return { ...state, nat: action.nat, page: 0 };
        default:
            return state;
    }
}
export default userReducer;