'use client';

import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useAppDispatch } from '../store/store'
import { addTodo } from '../store/features/todoSlice';

interface ModalAddProps {
    visible: boolean;
    onCancel: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinish = (values: { title: string, description: string }) => {
        dispatch(addTodo(values));
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Add Todo"
            centered
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalAdd;