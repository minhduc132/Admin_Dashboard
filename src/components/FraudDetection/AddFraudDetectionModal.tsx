// src/components/AddFraudDetectionModal.tsx
import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { FraudDetection } from '../../types/shop';
import dayjs from 'dayjs';

interface AddFraudDetectionModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    onAddFraudDetection: (newFraud: FraudDetection) => void;
}
const generateId = () => 'ref_' + Math.random().toString(36).substr(2, 9);

const AddFraudDetectionModal: React.FC<AddFraudDetectionModalProps> = ({ open, onOk, onCancel, onAddFraudDetection }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const newFraud: FraudDetection = {
                id: generateId(),
                flaggedReviewIds: values.flaggedReviewIds ? values.flaggedReviewIds.split(',').map((s: string) => s.trim()) : [],
                fakeProductListingIds: values.fakeProductListingIds ? values.fakeProductListingIds.split(',').map((s: string) => s.trim()) : [],
                suspendedSupplierIds: values.suspendedSupplierIds ? values.suspendedSupplierIds.split(',').map((s: string) => s.trim()) : [],
                severityLevel: values.severityLevel,
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
            };
            onAddFraudDetection(newFraud);
            form.resetFields();
            onOk();
        });
    };

    return (
        <Modal
            title="Add New Fraud Detection"
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Add
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="severityLevel"
                    label="Severity Level"
                    rules={[{ required: true, message: 'Please select severity level!' }]}
                >
                    <Select placeholder="Select severity">
                        <Select.Option value="low">Low</Select.Option>
                        <Select.Option value="medium">Medium</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="flaggedReviewIds"
                    label="Flagged Review IDs"
                    tooltip="Nhập các ID cách nhau bởi dấu phẩy"
                >
                    <Input placeholder="Ex: review1, review2" />
                </Form.Item>

                <Form.Item
                    name="fakeProductListingIds"
                    label="Fake Product Listing IDs"
                    tooltip="Nhập các ID cách nhau bởi dấu phẩy"
                >
                    <Input placeholder="Ex: product1, product2" />
                </Form.Item>

                <Form.Item
                    name="suspendedSupplierIds"
                    label="Suspended Supplier IDs"
                    tooltip="Nhập các ID cách nhau bởi dấu phẩy"
                >
                    <Input placeholder="Ex: supplier1, supplier2" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFraudDetectionModal;
