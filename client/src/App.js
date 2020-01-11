import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashbord from "./components/Dashboard";

class App extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Route path="/" component={Dashbord} />
            </React.Fragment>
        );
    }
}

export default App;
