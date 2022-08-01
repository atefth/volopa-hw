import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

import {
    history
} from '../../helpers';
import AuthService from '../../services/Auth';
import jwt from 'jwt-decode';

// create slice
export const KEY = "_auth";
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers
});

export const authActions = {
    ...slice.actions,
    ...extraActions
};
export const authReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        ...JSON.parse(localStorage.getItem(KEY))
    }
}

function createReducers() {
    return {
        logout: (state) => {
            localStorage.removeItem(KEY);
            AuthService.logout(state.token);
            state = {};
        }
    };
}

function createExtraActions() {
    const login = () => {
        return createAsyncThunk(`${name}/login`, async (credentials) => await AuthService.login(credentials))
    }
    return {
        login: login()
    }
};

function createExtraReducers() {
    const login = () => {
        var {
            fulfilled,
            rejected
        } = extraActions.login;
        return {
            [fulfilled]: (state, action) => {
                const user = action.payload;
                // store token in local storage to keep user logged in between page refreshes
                localStorage.setItem(KEY, JSON.stringify({
                    ...user,
                    jwt: jwt(user.token)
                }));
                state.user = user;

                // get return url from location state || home page
                const {
                    from
                } = history.location.state || {
                    from: {
                        pathname: '/'
                    }
                };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.user = null;
                alert(action.error.message);
            }
        }
    }
    return {
        ...login()
    }
}
