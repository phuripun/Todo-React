import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface TodoFilterProps {
    filter: string;
    onChange: (value: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onChange }) => {
    const handleFilterChange = (value: string) => {
        onChange(value);
    };

    return (
        <Select value={filter} onChange={handleFilterChange}>
            <Option value="all">Show All</Option>
            <Option value="completed">Completed</Option>
            <Option value="incomplete">Incomplete</Option>
        </Select>
    );
};

export default TodoFilter;
