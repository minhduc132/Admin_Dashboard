import React from 'react';
import { Modal, Input, Form, Select, DatePicker } from 'antd';
import { Blog } from '../../types/blogs';
import dayjs from 'dayjs';
import { getCurrentUser } from '../../types/authService';

const { Option } = Select;

interface AddBlogModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    onAddBlog: (blog: Blog) => void;
}

const generateId = () => 'blog_' + Math.random().toString(36).substr(2, 9);

const AddBlogModal: React.FC<AddBlogModalProps> = ({
    open,
    onOk,
    onCancel,
    onAddBlog,
}) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const user = getCurrentUser();
            if (!user) {
                alert("Bạn cần đăng nhập để tạo blog");
                return;
            }

            const newBlog: Blog = {
                id: generateId(),
                title: values.title,
                content: values.content,
                userId: user.id,
                status: values.status,
                createdAt: dayjs(values.createdAt).format(),
                updatedAt: dayjs().format(),
                tags: values.tags || [],
                coverImage: values.coverImage || '',
            };
            onAddBlog(newBlog);
            form.resetFields();
            onOk();
        });
    };

    return (
        <Modal
            title="Add New Blog"
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            okText="Add"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the blog title!' }]}
                >
                    <Input placeholder="Enter blog title" />
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input the content!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Write something..." />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select status!' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="draft">Draft</Option>
                        <Option value="published">Published</Option>
                        <Option value="pendingApproval">Pending Approval</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Tags" name="tags">
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags" />
                </Form.Item>

                <Form.Item label="Cover Image URL" name="coverImage">
                    <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item
                    label="Created At"
                    name="createdAt"
                    initialValue={dayjs()}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                        placeholder="Select creation date"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBlogModal;
