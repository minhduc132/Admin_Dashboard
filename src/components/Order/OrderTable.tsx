import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography } from 'antd';
import { EyeTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Order } from '../../types/shop';

type Props = {
    data: Order[];
    // onEdit?: (order: Order) => void;
    onDelete?: (id: string) => void;
    onView?: (order: Order) => void;
};

const statusColors: Record<Order['status'], string> = {
    'to pay': 'blue',
    'to ship': 'orange',
    'complant': 'red',
    'cancel': 'gray',
    'refunded': 'purple',
};
export const OrderTable: React.FC<Props> = ({ data, onDelete, onView }) => {
    const [tableData, setTableData] = useState<Order[]>([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: { firstName: string; lastName: string }) => (
                <Typography.Text>{customer.firstName} {customer.lastName}</Typography.Text>
            ),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number | null | undefined) => {
                const safeAmount = typeof amount === 'number' ? amount : 0;
                return <Typography.Text>{`$ ${safeAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Typography.Text>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: Order['status']) => (
                <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Order) => (
                <div style={{ display: 'flex', gap: 12 }}>
                    <EyeTwoTone
                        style={{ cursor: 'pointer', color: '#52c41a' }}
                        onClick={() => onView?.(record)}
                    />
                    <DeleteTwoTone
                        style={{ cursor: 'pointer', color: '#f5222d' }}
                        onClick={() => onDelete?.(record.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={tableData}
            rowKey={(record) => record.id}
        />
    );
};
