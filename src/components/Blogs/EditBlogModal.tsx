import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import { Blog } from '../../types/blogs'; // Giả sử Blog có kiểu dữ liệu này
import { getCurrentUser } from '../../types/authService';
import dayjs from 'dayjs';

const getCurrentUserId = (): string => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || '';
};

interface EditBlogModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    onEditBlog: (blog: Blog) => void;
    blog: Blog | null;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({ open, onOk, onCancel, onEditBlog, blog }) => {
    const [form] = Form.useForm();

    // Khi có blog truyền vào, điền dữ liệu vào form
    useEffect(() => {
        if (blog) {
            form.setFieldsValue({
                title: blog.title,
                content: blog.content,
                status: blog.status,
                createdAt: dayjs(blog.createdAt),
                tags: blog.tags,
                coverImage: blog.coverImage,
            });
        }
    }, [blog, form]);

    if (blog === null) {
        return null;
    }

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const userId = getCurrentUserId();
            // if (!userId) {
            //     alert("Bạn cần đăng nhập để tạo hoặc chỉnh sửa blog");
            //     return;
            // }

            const updatedBlog: Blog = {
                id: blog.id,  // ID blog không thay đổi
                title: values.title,
                content: values.content,
                status: values.status,
                createdAt: dayjs(values.createdAt).format(), // Dữ liệu ngày tạo
                updatedAt: dayjs().format(), // Cập nhật ngày chỉnh sửa
                tags: values.tags || [], // Nếu không có tag thì dùng mảng rỗng
                coverImage: values.coverImage || '', // Nếu không có ảnh thì để trống
                userId: userId, // Lấy userId từ hệ thống người dùng đã đăng nhập
            };

            onEditBlog(updatedBlog);  // Gửi blog đã chỉnh sửa
            form.resetFields();  // Reset lại các trường trong form
            onOk();  // Đóng modal sau khi cập nhật
        });
    };

    return (
        <Modal
            title="Edit Blog"
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Update
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title!' }]} >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please input the content!' }]} >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select the status!' }]} >
                    <Select>
                        <Select.Option value="draft">Draft</Select.Option>
                        <Select.Option value="published">Published</Select.Option>
                        <Select.Option value="pendingApproval">Pending Approval</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="createdAt" label="Created At">
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item name="tags" label="Tags">
                    <Input />
                </Form.Item>

                <Form.Item name="coverImage" label="Cover Image">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditBlogModal;
