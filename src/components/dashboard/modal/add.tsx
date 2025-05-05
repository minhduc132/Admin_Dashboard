import React from 'react';
import { Modal, Input, Form, Select, DatePicker } from 'antd';

const { Option } = Select;

interface AddUserModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  onAddUser: (user: any) => void;
}

const generateId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9); // Tạo id ngẫu nhiên 
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onOk,
  onCancel,
  onAddUser,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newUser = {
        id: generateId(),
        email: values.email,
        firstName: values.name.split(' ')[0], // Tách tên và họ từ ô tên
        lastName: values.name.split(' ')[1] || '',
        role: values.role,
        status: values.status,
        start_date: values.start_date.format('MM/DD/YYYY'),
      };

      onAddUser(newUser);
      form.resetFields();
      onOk();
    });
  };

  return (
    <Modal
      title="Add New User"
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="Add"
    >
      <Form form={form} layout="vertical">
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
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input full name!' }]}
        >
          <Input placeholder="Enter full name" />
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

        <Form.Item
          label="Start Date"
          name="start_date"
          rules={[{ required: true, message: 'Please select start date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
