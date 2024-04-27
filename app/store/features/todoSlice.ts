import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: number;
};

interface TodoState {
    todos: Todo[],
};

const initialState: TodoState = {
    todos: [],
};



export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        loadTodos: (state, action) => {
            state.todos = action.payload;
        },

        addTodo: (state, action: PayloadAction<{ title: string, description: string }>) => {
            const maxId = state.todos.reduce((max, todo) => Math.max(max, todo.id), 0);
            const nextId = maxId + 1;
            state.todos.push({
                id: nextId,
                title: action.payload.title,
                description: action.payload.description,
                status: 0
            });

            localStorage.setItem('todos', JSON.stringify(state.todos));
        },

        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        
        toggleTodoStatus: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, status: todo.status === 0 ? 1 : 0 };
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
    },
});

export default TodoSlice.reducer;
export const { addTodo, loadTodos, deleteTodo, toggleTodoStatus } = TodoSlice.actions;