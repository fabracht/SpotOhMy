import React from 'react';

import {
    BrowserRouter as Router, Route,
    Switch
} from 'react-router-dom';
import Login from './Components/Login';
import App from "./App";


export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/callback/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    )
}