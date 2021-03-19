import React from "react";
import SelectWidgetsModal from ".";
import { shallow } from "enzyme";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

test("Button opens modal when clicked", () => {
    const wrapper = shallow(<SelectWidgetsModal />);
    expect(wrapper.find(Dialog).prop("open")).toBe(false);
    wrapper.find(Button).simulate("click");
    expect(wrapper.find(Dialog).prop("open")).toBe(true);
});
