import React from "react";
import { Route } from "react-router-dom";
import TripDetails from "./containers/TripDetails";
import Home from "./containers/Home";

import "./App.css";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/home" exact component={Home} />
                <Route path="/tripdetails" exact component={TripDetails} />
            </React.Fragment>
        );
    }
}

export default App;
