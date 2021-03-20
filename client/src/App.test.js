import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";

import App from "./App";
import Header from "./components/Header";

let component;

beforeEach(() => {
    component = shallow(<App />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<App />);
    expect(snapshotComponent).toMatchSnapshot();
});

test("it contains a Header component", () => {
    expect(component.find(Header)).toHaveLength(1);
});
