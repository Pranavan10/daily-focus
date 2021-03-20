import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { mount } from "enzyme";

import LandingPage from ".";

test("Route changes to '/path' when sign in clicked", () => {
    const history = createMemoryHistory();
    const wrapper = mount(
        <Router history={history}>
            <LandingPage />
        </Router>
    );
    wrapper.find("a").simulate("click", { button: 0 });
    expect(history.location.pathname).toBe("/login");
});
