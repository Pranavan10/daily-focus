import React from "react";
import { shallow } from "enzyme";

import DateTime from ".";

let component;

beforeEach(() => {
    component = shallow(<DateTime />);
});

test("it renders a div with text", () => {
    expect(component.text()).toBeTruthy();
});
