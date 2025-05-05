import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { Category } from '../../types/shop';

interface AddCategoryModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: (newCategory: Category) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newCategory: Category = {
                id: `${Date.now()}`,  // Tạo ID duy nhất bằng timestamp
                name: values.name,
                description: values.description || '',
                createdAt: '',
                updatedAt: '',
            };
            onOk(newCategory);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Add New Category"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCategoryModal;
