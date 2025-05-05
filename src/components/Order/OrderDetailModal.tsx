import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Typography } from 'antd';
import { Order, Product } from '../../types/shop';
const { Option } = Select;

type Props = {
    open: boolean;
    onCancel: () => void;
    order: Order | null;
};

const OrderDetailModal: React.FC<Props> = ({ open, onCancel, order }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (order) {
            form.setFieldsValue({
                orderId: order.id,
                customer: order.customer?.email || '',
                totalAmount: order.totalAmount,
                status: order.status,
                trackingInfo: order.trackingInfo || '',
                disputeStatus: order.disputeStatus || '',
                orderItems: order.orderItems && order.orderItems.length > 0
                    ? order.orderItems.map(item => `${item.product.name} (x${item.quantity})`).join(', ')
                    : 'No items',
            });
        }
    }, [order, form]);

    return (
        <Modal
            title="Product Details"
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" disabled>
                <Form.Item label="Order ID" name="orderId">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Customer" name="customer">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Order Items" name="orderItems">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Total Amount" name="totalAmount">
                    <InputNumber
                        style={{ width: '100%' }}
                        disabled
                        value={order?.totalAmount}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </Form.Item>

                <Form.Item label="Status" name="status">
                    <Select disabled>
                        <Option value="to pay">To Pay</Option>
                        <Option value="to ship">To Ship</Option>
                        <Option value="complant">Complaint</Option>
                        <Option value="cancel">Cancel</Option>
                        <Option value="refunded">Refunded</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Tracking Info" name="trackingInfo">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Dispute Status" name="disputeStatus">
                    <Select disabled>
                        <Option value="open">Open</Option>
                        <Option value="resolved">Resolved</Option>
                        <Option value="pending">Pending</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderDetailModal;
