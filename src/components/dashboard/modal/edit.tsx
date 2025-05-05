import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { User } from '../../../types/authService'; // Chắc chắn rằng kiểu User được định nghĩa trong types

const { Option } = Select;

type Props = {
    open: boolean;
    onCancel: () => void;
    onUpdate: (updatedUser: User) => void;
    user: User | null;
};

const EditUserModal: React.FC<Props> = ({ open, onCancel, onUpdate, user }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            });
        }
    }, [user, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (user) {
                const updated = {
                    ...user,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    role: values.role,
                    status: values.status,
                };
                onUpdate(updated);
                form.resetFields();
            }
        });
    };

    return (
        <Modal
            title="Edit User"
            open={open}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            onOk={handleOk}
            okText="Save"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input first name!' }]}
                >
                    <Input placeholder="Enter first name" />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input last name!' }]}
                >
                    <Input placeholder="Enter last name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input email!' },
                        { type: 'email', message: 'Invalid email format!' },
                    ]}
                >
                    <Input placeholder="example@email.com" />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select role!' }]}
                >
                    <Select placeholder="Select role">
                        <Option value="Admin">Admin</Option>
                        <Option value="Seller">Seller</Option>
                        <Option value="Buyer">Buyer</Option>
                        <Option value="Supplier">Supplier</Option>
                        <Option value="Organization">Organization</Option>
                        <Option value="KOL">KOL</Option>
                        <Option value="Partner">Partner</Option>
                        <Option value="Employee">Employee</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select status!' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
