import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";

import Header from ".";
import DateTime from "../DateTime";
import SearchBar from "../SearchBar";

let component;

beforeEach(() => {
    component = shallow(<Header />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<Header />);
    expect(snapshotComponent).toMatchSnapshot();
});

test("it contains a DateTime component", () => {
    expect(component.find(DateTime)).toHaveLength(1);
});

test("it contains a SearchBar component", () => {
    expect(component.find(SearchBar)).toHaveLength(1);
});
