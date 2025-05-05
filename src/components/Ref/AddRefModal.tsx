// src/components/AddRefModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Refer } from '../../types/referral';
import dayjs from 'dayjs';

interface AddRefModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    onAddRefer: (newRefer: Refer) => void;
}
const generateId = () => 'ref_' + Math.random().toString(36).substr(2, 9);

const AddRefModal: React.FC<AddRefModalProps> = ({ open, onOk, onCancel, onAddRefer }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            // Giả sử bạn lấy userId từ localStorage
            const userId: string = JSON.parse(localStorage.getItem('user') || '{}')?.id || '';
            const newRefer: Refer = {
                id: generateId(),
                referralLink: values.referralLink,
                userId: userId,
                clickCount: 0,
                registrationCount: 0,
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
                description: values.description || '',
            };
            onAddRefer(newRefer);
            form.resetFields();
            onOk();
        });
    };

    return (
        <Modal
            title="Add New Referral"
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>Add</Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="referralLink"
                    label="Referral Link"
                    rules={[{ required: true, message: 'Please input the referral link!' }]}
                >
                    <Input placeholder="Enter referral link" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input placeholder="Optional description" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddRefModal;
