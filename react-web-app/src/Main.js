import React from 'react';
import App from './App';
import Home from './Home';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

function Main() {
    return(
        <Router>
            <div className="Main">
                <switch>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/App" component={App}/>
                </switch>
            </div>
        </Router>
    )
}

export default Main;