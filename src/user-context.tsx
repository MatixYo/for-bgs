import React, { FC, useMemo } from 'react'

interface State {
    token: string | null
    isLogged: boolean
}

const initialState = {
    token: null,
    isLogged: false,
}

type Action =
    | {
    type: 'SET_USER'
    token: string
    isLogged: boolean
    }
    | {
    type: 'UNSET_USER'
    }

export const UserContext = React.createContext<State | any>(initialState)

UserContext.displayName = 'UserContext'

function userReducer(state: State, action: Action) {
    switch(action.type) {
        case 'SET_USER': {
            return {
                ...state,
                token: action.token,
                isLogged: action.isLogged
            }
        }
        case 'UNSET_USER': {
            return {
                ...state,
                token: null,
                isLogged: false,
            }
        }
    }
}

export const UserProvider: FC = (props) => {
    const [state, dispatch] = React.useReducer(userReducer, initialState)

    const setUser = (token: string, isLogged: boolean) =>
        dispatch({ type: 'SET_USER', token, isLogged })

    const unsetUser = () =>
        dispatch({ type: 'UNSET_USER' })

    const value = useMemo(
        () => ({
            ...state,
            setUser,
            unsetUser,
        }),
        [state]
    )

    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`)
    }
    return context
}

export const ManagedUserContext: FC = ({ children }) => (
    <UserProvider>{children}</UserProvider>
)
