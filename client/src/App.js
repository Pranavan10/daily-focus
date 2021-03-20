import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/signup" />
                </Route>

                <Route exact path="/signup">
                    <LandingPage />
                </Route>

                <Route exact path="/home">
                    {/* Replace following component with actual Home component when created */}
                    <Header />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
