import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import AcceptHelpRequest from "./AcceptHelpRequest";
import SendHelpRequest from "./SendHelpRequest";
import Maps from "./Maps";
import Signin from "./Signin";
import Signup from "./Signup";

class Routes extends Component {
    state = {};
    render() {
        return (
            <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/acceptRequest" component={AcceptHelpRequest} />
                <Route path="/sendRequest" component={SendHelpRequest} />
                <Route path="/maps" component={Maps} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
            </Switch>
        );
    }
}

export default Routes;
