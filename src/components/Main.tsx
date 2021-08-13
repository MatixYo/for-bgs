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
    const { token, setUser } = useUser()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if(token) setUser(token)
    }, [])

    return (
        <>
            {!token ? (
                <LoginView />
            ) : (
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
            )}
        </>
    );
}
