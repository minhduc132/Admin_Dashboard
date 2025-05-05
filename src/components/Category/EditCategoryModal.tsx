import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Category } from '../../types/shop';

interface EditCategoryModalProps {
    open: boolean;
    category: Category | null;  // Chúng ta cần category hiện tại để chỉnh sửa
    onCancel: () => void;
    onOk: (updatedCategory: Category) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ open, category, onCancel, onOk }) => {
    const [form] = Form.useForm();

    // Khi modal mở, tự động điền dữ liệu hiện tại vào form
    React.useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name,
                description: category.description,
            });
        }
    }, [category, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (category) {
                const updatedCategory: Category = {
                    ...category,
                    name: values.name,
                    description: values.description || '',
                    updatedAt: new Date().toISOString(),  // Cập nhật thời gian chỉnh sửa
                };
                onOk(updatedCategory);  // Gửi category đã chỉnh sửa lên trang 

                form.resetFields();  // Reset form
            }
        });
    };

    return (
        <Modal
            title="Edit Category"
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

export default EditCategoryModal;
