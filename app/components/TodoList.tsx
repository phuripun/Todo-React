'use client';

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { Todo, deleteTodo, loadTodos, toggleTodoStatus } from '../store/features/todoSlice';
import { Button, Checkbox, Space, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import TodoFilter from './TodoFilter';

const TodoList = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todo.todos);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedData = localStorage.getItem('todos');
        if (storedData) {
            dispatch(loadTodos(JSON.parse(storedData)));
        }
    }, [dispatch]);

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.status === 1;
        if (filter === 'incomplete') return todo.status === 0;
        return false;
    });

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        dispatch(deleteTodo(id));
    };

    const handleToggleTodoStatus = (id: number) => {
        dispatch(toggleTodoStatus(id));

        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, status: todo.status === 0 ? 1 : 0 };
            }
            return todo;
        });

        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    
    
    const columns: ColumnType<Todo>[] = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (text: string, record: any) => (
                <Checkbox checked={record.status === 1} onChange={() => handleToggleTodoStatus(record.id)} />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status: number) => (
                <span style={{ color: status === 0 ? '' : 'green' }}>
                    {status === 0 ? 'Incomplete' : 'Completed'}
                </span>
            ),

        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text: string, record: any) => (
                <Button type="primary" danger onClick={() => handleDeleteTodo(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];



    return (
        <div className="rounded-md shadow border p-2">
            <TodoFilter filter={filter} onChange={handleFilterChange} />
            <Table columns={columns} dataSource={filteredTodos} />
        </div>
    )
}

export default TodoList;