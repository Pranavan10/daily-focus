import { useEffect, useState } from "react";
import moment from "moment";

const saveListToStorage = (list) => {
    const listJson = JSON.stringify(list);
    localStorage.setItem("todoList", listJson);
};

const sortOverallTodosByDate = (overallTodos) => {
    let sorted = {};
    Object.keys(overallTodos).sort().forEach(date => {
        sorted[date] = overallTodos[date];
    });
    return sorted;
};

const sortSpecificTodoListByTime = (todos) => todos.sort((thisTodo, otherTodo) => thisTodo.time.localeCompare(otherTodo.time));

const newTodaysDate = moment().format("YYYY-MM-D");

function useTodosState(initialTodos, setIsAddingItem) {
    const [todoList, setTodoList] = useState(initialTodos);

    useEffect(() => {
        const savedTodoListJson = localStorage.getItem("todoList");
        let savedTodoList;
        if (savedTodoListJson) {
            savedTodoList = JSON.parse(savedTodoListJson);
            setTodoList(savedTodoList);
        }
        if (!savedTodoListJson || !savedTodoList[newTodaysDate]) {
            savedTodoList = {};
            savedTodoList[newTodaysDate] = [];
            setTodoList(savedTodoList);
        }
    }, []);

    return {
        todoList,
        addTodoItem: (date, time, title, details) => {
            const newTaskObject = {
                checked: false,
                time,
                title,
                details
            };
            const currentListOnThatDate = todoList[date] || [];
            const newList = [...currentListOnThatDate, newTaskObject];
            sortSpecificTodoListByTime(newList);
    
            let todoListCopy = {...todoList};
            todoListCopy[date] = newList;
            todoListCopy = sortOverallTodosByDate(todoListCopy);
    
            setTodoList(todoListCopy);
            setIsAddingItem(false);
            saveListToStorage(todoListCopy);
        },
        deleteTodoItem: (index, date) => {
            const newListOnThatDay = [...todoList[date]];
            newListOnThatDay.splice(index, 1);
            const newList = {...todoList};
            newList[date] = newListOnThatDay;
            setTodoList(newList);
            saveListToStorage(newList);
        },
        editTodoItem: (index, date, field, updatedValue) => {
            const newListOnThatDay = [...todoList[date]];
            newListOnThatDay[index][field] = updatedValue;
            if (field === "time") {
                sortSpecificTodoListByTime(newListOnThatDay);
            }
            const newList = {...todoList};
            newList[date] = newListOnThatDay;
            setTodoList(newList);
            saveListToStorage(newList);
        },
        toggleCheck: (index, date) => {
            const newListOnThatDay = [...todoList[date]];
            newListOnThatDay[index].checked = !newListOnThatDay[index].checked;
            const newList = {...todoList};
            newList[date] = newListOnThatDay;
            setTodoList(newList);
            saveListToStorage(newList);
        }
    };
}

export default useTodosState;