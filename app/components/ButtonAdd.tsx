'use client';

import React, { useState } from 'react'
import { Button } from 'antd';
import ModalAdd from './ModalAdd';

const ButtonAdd = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" size='large' onClick={showModal}>
                Add Todo
            </Button>
            <ModalAdd visible={visible} onCancel={handleCancel} />
        </>
    );
}

export default ButtonAdd;