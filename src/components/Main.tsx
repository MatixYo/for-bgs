import React, {useEffect} from 'react';
import { LoginView } from "components/LoginView";
import {useUser} from "../user-context";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {ListView} from "./ListView";
import {VideoView} from "./VideoView";

export const Main: React.FC = () => {
    const { token, setUser, unsetUser } = useUser()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if(token) setUser(token)
    }, [])

    const logout = () => {
        sessionStorage.removeItem('token')
        unsetUser()
    }

    return (
        <>
            {!token ? (
                <LoginView />
            ) : (
                <>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" type="button" onClick={logout}>
                        Wyloguj
                    </button>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <ListView />
                            </Route>
                            <Route path="/video/:id">
                                <VideoView />
                            </Route>
                        </Switch>
                    </Router>
                </>
            )}
        </>
    );
}
