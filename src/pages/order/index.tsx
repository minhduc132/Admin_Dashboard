import { useEffect, useState, useRef } from 'react';
import { Button, Card, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Order, Product } from '../../types/shop';
import { User } from '../../types/authService';
import { OrderTable } from '../../components/Order/OrderTable';
import AddOrderModal from '../../components/Order/AddOrderModal';
import OrderDetailModal from '../../components/Order/OrderDetailModal';

const LOCAL_STORAGE_KEY = 'orders';
const USER_LOCAL_STORAGE_KEY = 'users';
const PRODUCT_LOCAL_STORAGE_KEY = 'productList';

export const OrdersDashboardPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const isFirstLoad = useRef(true);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage nếu có
        const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
        const storedUsers = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
        const storedProducts = localStorage.getItem(PRODUCT_LOCAL_STORAGE_KEY);

        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }

        // Nếu không có dữ liệu trong localStorage, bạn có thể đặt dữ liệu mặc định
        if (!storedOrders) {
            setOrders([]);
        }
        if (!storedUsers) {
            setUsers([]);
        }
        if (!storedProducts) {
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        // Lưu dữ liệu vào localStorage mỗi khi có sự thay đổi
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(users));
        localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(products));
    }, [orders, users, products]);

    const handleAddOrEditOrder = (order: Order) => {
        const exists = orders.find((o) => o.id === order.id);
        let newOrders;
        if (exists) {
            // Cập nhật đơn hàng đã tồn tại
            newOrders = orders.map((o) => (o.id === order.id ? order : o));
            message.success('Order updated successfully');
        } else {
            // Thêm đơn hàng mới
            newOrders = [...orders, order];
            message.success('Order added successfully');
        }

        // Sắp xếp lại đơn hàng
        newOrders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(newOrders);
        setIsAddModalOpen(false);
    };


    const handleDeleteOrder = (id: string) => {
        Modal.confirm({
            title: 'Delete Order',
            content: 'Are you sure you want to delete this order?',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => {
                setOrders((prev) => prev.filter((o) => o.id !== id));
                message.success('Order deleted successfully');
            },
        });
    };

    return (
        <Card
            title="Order Management"
            extra={
                <Button icon={<PlusOutlined />} onClick={() => {
                    setSelectedOrder(null);
                    setIsAddModalOpen(true);
                }}>
                    Add Order
                </Button>
            }
        >
            <OrderTable
                data={orders}
                // onEdit={(order) => {
                //     setSelectedOrder(order);
                //     setIsAddModalOpen(true);
                // }}
                onDelete={handleDeleteOrder}
                onView={(order) => {
                    setSelectedOrder(order);
                    setIsDetailOpen(true);
                }}
            />

            <AddOrderModal
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                onCreate={handleAddOrEditOrder}
                initialData={selectedOrder}
                users={users}
                products={products}
            />

            <OrderDetailModal
                open={isDetailOpen}
                order={selectedOrder}
                onCancel={() => setIsDetailOpen(false)}
            />

        </Card>
    );
};

export default OrdersDashboardPage;
