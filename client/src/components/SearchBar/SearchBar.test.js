import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

import SearchBar from "./";

let component;

beforeEach(() => {
    component = shallow(<SearchBar />);
});

test("it renders correctly", () => {
    const shallowRenderer = new ShallowRenderer();
    const snapshotComponent = shallowRenderer.render(<SearchBar />);
    expect(snapshotComponent).toMatchSnapshot();
});

test("it contains Material UI Paper, InputBase, and IconButton components", () => {
    expect(component.find(Paper)).toHaveLength(1);
    expect(component.find(InputBase)).toHaveLength(1);
    expect(component.find(IconButton)).toHaveLength(1);
});
