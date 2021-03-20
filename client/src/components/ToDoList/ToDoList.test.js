import React from "react";
import { shallow } from "enzyme";
import ToDoList from ".";
import TodaysToDo from "./TodaysToDo";
import UpcomingToDo from "./UpcomingToDo";
import AddToDo from "./AddToDo";
import ToDoItem from "./ToDoItem";
import moment from "moment";

test("Showing today's todos by default", () => {
    const wrapper = shallow(<ToDoList />);
    expect(wrapper.find(TodaysToDo).length).toBe(1);
    expect(wrapper.find(UpcomingToDo).length).toBe(0);
});

test("Add a todo item", () => {
    const wrapper = shallow(<ToDoList />);
    const todaysTodoWrapper = shallow(<TodaysToDo {...wrapper.find(TodaysToDo).props()} />);
    todaysTodoWrapper.find("WithStyles(ForwardRef(Fab))").simulate("click");

    expect(wrapper.find(TodaysToDo).length).toBe(0);
    expect(wrapper.find(AddToDo).length).toBe(1);

    // In add screen
    const addToDoWrapper = shallow(<AddToDo {...wrapper.find(AddToDo).props()} />);
    const textFieldsWrapper = addToDoWrapper.find("WithStyles(ForwardRef(TextField))");
    expect(textFieldsWrapper.length).toBe(4);

    // first text field should be for date
    expect(textFieldsWrapper.at(0).props().label).toBe("Date");
    expect(textFieldsWrapper.at(0).props().type).toBe("date");

    // second text field should be for time
    expect(textFieldsWrapper.at(1).props().label).toBe("Time");
    expect(textFieldsWrapper.at(1).props().type).toBe("time");

    // third text field should be for title
    expect(textFieldsWrapper.at(2).props().label).toBe("Title");

    // first text field should be for details
    expect(textFieldsWrapper.at(3).props().label).toBe("Details");
    expect(textFieldsWrapper.at(3).props().multiline).toBe(true);
});

test("Interaction on todo item", () => {
    const wrapper = shallow(<ToDoList />);
    wrapper.find(TodaysToDo).props().switchToAdd();
    wrapper.find(AddToDo).props().addClicked(moment().format("YYYY-MM-D"), "00:00", "Testing", "Hello world from test");
    let todaysTodoWrapper = wrapper.find(TodaysToDo).shallow();

    // Checked
    todaysTodoWrapper.find(ToDoItem).shallow().find("WithStyles(ForwardRef(Checkbox))").props().onChange();
    todaysTodoWrapper = wrapper.find(TodaysToDo).shallow();
    expect(todaysTodoWrapper.find(ToDoItem).at(0).props().checked).toBe(true);

    // edit time
    todaysTodoWrapper.find(ToDoItem).props().onEdit("time", "23:59");
    todaysTodoWrapper = wrapper.find(TodaysToDo).shallow();
    expect(todaysTodoWrapper.find(ToDoItem).at(0).props().time).toBe("23:59");

    // edit details
    todaysTodoWrapper.find(ToDoItem).props().onEdit("details", "new details");
    todaysTodoWrapper = wrapper.find(TodaysToDo).shallow();
    expect(todaysTodoWrapper.find(ToDoItem).at(0).props().details).toBe("new details");

    // Delete item
    todaysTodoWrapper.find(ToDoItem).props().onDelete();
    todaysTodoWrapper = wrapper.find(TodaysToDo).shallow();
    expect(todaysTodoWrapper.find(ToDoItem).length).toBe(0);
});
