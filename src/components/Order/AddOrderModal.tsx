import { useEffect, useState } from 'react';
import { Modal, Form, InputNumber, Select, message } from 'antd';
import { Order, OrderItem } from '../../types/shop';
import { User } from '../../types/authService';
import { Product } from '../../types/shop';

const ORDER_STORAGE_KEY = 'orders';

const getStoredOrders = (): Order[] => {
    const data = localStorage.getItem(ORDER_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveOrders = (orders: Order[]) => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
};

const { Option } = Select;

type Props = {
    open: boolean;
    onCancel: () => void;
    onCreate: (order: Order) => void;
    initialData?: Order | null;
    users: User[];
    products: Product[];
};

const AddOrderModal = ({ open, onCancel, onCreate, initialData, users, products }: Props) => {
    const [form] = Form.useForm();
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useEffect(() => {
        if (open) {
            if (initialData) {
                form.setFieldsValue({
                    customer: initialData.customer.id,
                    products: initialData.orderItems.map(item => item.product.id),
                    status: initialData.status,
                    ...initialData.orderItems.reduce((acc, item) => {
                        acc[`quantity_${item.product.id}`] = item.quantity;
                        return acc;
                    }, {} as Record<string, number>)
                });
                setSelectedProducts(initialData.orderItems.map(item => item.product.id));
            } else {
                form.resetFields();
                setSelectedProducts([]);
            }
        }
    }, [initialData, open, form]);

    const handleFinish = async () => {
        try {
            const values = await form.validateFields();
            const customer = users.find(user => user.id === values.customer);

            const orderItems: OrderItem[] = selectedProducts.map(productId => {
                const product = products.find(p => p.id === productId)!;
                const quantity = values[`quantity_${productId}`];
                return { product, quantity };
            });

            const totalAmount = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

            const order: Order = {
                id: initialData?.id ?? crypto.randomUUID(),
                customer: customer!,
                orderItems,
                totalAmount,
                status: values.status,
                createdAt: initialData?.createdAt ?? new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            onCreate(order);
            const orders = getStoredOrders();

            if (initialData) {
                const index = orders.findIndex(o => o.id === initialData.id);
                if (index !== -1) {
                    orders[index] = order;
                }
            } else {
                orders.push(order);
            }

            saveOrders(orders);
            message.success(initialData ? 'Order updated successfully' : 'Order added successfully');
            onCancel();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Modal
            open={open}
            title={initialData ? 'Update Order' : 'Add New Order'}
            okText={initialData ? 'Update' : 'Add'}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleFinish}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="customer"
                    label="Customer"
                    rules={[{ required: true, message: 'Please select a customer' }]}
                >
                    <Select placeholder="Select customer">
                        {users.map(user => (
                            <Option key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="products"
                    label="Products"
                    rules={[{ required: true, message: 'Please select product(s)' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select product(s)"
                        onChange={setSelectedProducts}
                        value={selectedProducts}
                    >
                        {products.map(product => (
                            <Option key={product.id} value={product.id}>
                                {product.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {selectedProducts.map(productId => {
                    const product = products.find(p => p.id === productId);
                    return (
                        <Form.Item
                            key={productId}
                            name={`quantity_${productId}`}
                            label={`Quantity for ${product?.name}`}
                            rules={[{ required: true, message: 'Please enter quantity' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    );
                })}

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select status' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="to pay">To Pay</Option>
                        <Option value="to ship">To Ship</Option>
                        <Option value="complant">Complant</Option>
                        <Option value="cancel">Cancel</Option>
                        <Option value="refunded">Refunded</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddOrderModal;
