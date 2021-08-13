import React from 'react';
import './App.css';
import {ManagedUserContext} from "./user-context";
import {Main} from "./components/Main";

function App() {
    return (
        <ManagedUserContext>
            <div className="App">
                <Main />
            </div>
        </ManagedUserContext>
    );
}

export default App;
