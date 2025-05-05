import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Brand } from '../../types/shop';

type Props = {
    open: boolean;
    onCancel: () => void;
    onUpdate: (updated: Brand) => void;
    brand: Brand | null;
};

const EditBrandModal = ({ open, onCancel, onUpdate, brand }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (brand) {
            form.setFieldsValue(brand);
        }
    }, [brand, form]);

    const handleFinish = (values: any) => {
        if (brand) {
            const updatedBrand: Brand = {
                ...brand,
                ...values,
                updatedAt: new Date().toISOString(),
            };
            onUpdate(updatedBrand);
            form.resetFields();
        }
    };

    return (
        <Modal
            open={open}
            title="Update brand"
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText="Update"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item label="Name Brand" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Logo URL" name="logoUrl" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="contactInfo" name="contactInfo">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                        <Select.Option value="blacklisted">Blacklisted</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditBrandModal;
