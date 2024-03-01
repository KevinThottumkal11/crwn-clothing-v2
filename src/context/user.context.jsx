import { createContext, useState, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

import { 
    onAuthStateChangedListener, 
    signOutUser, 
    createUserDocumentFromAuth 
} from '../utils/firebase/firebase.utils';

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const UserReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in UserReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({ children }) => {
    const [{currentUser}, dispatch] = useReducer(UserReducer, INITIAL_STATE);   // const { currentUser } = state;
    console.log(currentUser);
    // const [currentUser, setCurrentUser] = useState(null);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };
    const value = { currentUser, setCurrentUser };


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            // console.log(user);
            setCurrentUser(user);
        });

        return unsubscribe; // cleanup function, runs when component unmounts
    }, [])

    return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}