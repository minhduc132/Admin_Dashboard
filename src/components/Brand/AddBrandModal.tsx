import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Brand } from '../../types/shop';

const { TextArea } = Input;
const { Option } = Select;

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

type Props = {
    open: boolean;
    onCancel: () => void;
    onCreate: (brand: Brand) => void;
    initialData?: Brand | null;
};

const AddBrandModal = ({ open, onCancel, onCreate, initialData }: Props) => {
    const [form] = Form.useForm();
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            Promise.resolve().then(() => {
                if (initialData) {
                    form.setFieldsValue(initialData);
                    setPreview(initialData.logoUrl); // Set preview image for editing
                } else {
                    form.resetFields();
                    setPreview(null);
                }
            });
        }
    }, [initialData, open]);

    const handleUpload = async (file: File) => {
        const isImage = file.type.startsWith('image/');
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isImage) {
            message.error('Only image files are allowed!');
            return Upload.LIST_IGNORE;
        }

        if (!isLt5M) {
            message.error('Image must be smaller than 5MB!');
            return Upload.LIST_IGNORE;
        }

        const base64 = await getBase64(file);
        form.setFieldsValue({ logoUrl: base64 });
        setPreview(base64); // Update the preview image
        return false;
    };

    const handleFinish = async () => {
        try {
            const values = await form.validateFields();
            const brand: Brand = {
                ...values,
                id: initialData?.id ?? crypto.randomUUID(), // Ensure the brand ID is unique
                createdAt: initialData?.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            onCreate(brand);
            form.resetFields();
            setPreview(null); // Reset preview after successful form submission
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Modal
            open={open}
            title={initialData ? 'Update Brand' : 'Add New Brand'}
            okText={initialData ? 'Update' : 'Add'}
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                setPreview(null);
                onCancel();
            }}
            onOk={handleFinish}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Logo"
                    required
                >
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={handleUpload}
                    >
                        {preview ? (
                            <img src={preview} alt="logo" style={{ width: '100%' }} />
                        ) : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="logoUrl"
                    hidden
                    rules={[{ required: true, message: 'Please upload a logo' }]}
                />
                <Form.Item
                    name="name"
                    label="Brand Name"
                    rules={[{ required: true, message: 'Please enter brand name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="nameuser"
                    label="User Name"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                >
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="contactInfo"
                    label="Contact Information"
                    rules={[{ required: true, message: 'Please enter contact info' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select status' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                        <Option value="blacklisted">Blacklisted</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBrandModal;
