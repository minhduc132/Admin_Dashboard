import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Image } from 'antd';
import { EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Brand } from '../../types/shop';

type Props = {
    data: Brand[];
    onEdit?: (brand: Brand) => void;
    onDelete?: (id: string) => void;
    onView?: (brand: Brand) => void;
};

const statusColors: Record<Brand['status'], string> = {
    active: 'green',
    inactive: 'default',
    blacklisted: 'red',
};

export const BrandTable: React.FC<Props> = ({ data, onEdit, onDelete, onView }) => {
    const [tableData, setTableData] = useState<Brand[]>([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const columns = [
        {
            title: 'Logo',
            dataIndex: 'logoUrl',
            key: 'logo',
            render: (url: string) => (
                <Image src={url || '/default-logo.png'} width={40} height={40} preview={false} />
            ),
        },
        {
            title: 'Brand Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
        },
        {
            title: 'Contact Info',
            dataIndex: 'contactInfo',
            key: 'contactInfo',
            render: (contactInfo: string) => (
                <Typography.Paragraph ellipsis={{ rows: 2 }}>{contactInfo}</Typography.Paragraph>
            ),
        },
        {
            title: 'Number Products',
            dataIndex: 'productIds',
            key: 'productIds',
            render: (productIds: string) => (
                <Typography.Paragraph
                    style={{
                        color: 'red',
                        fontWeight: 700,
                        marginBottom: 0
                    }}
                >
                    {productIds?.length || 0}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: Brand['status']) => (
                <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Brand) => (
                <div style={{ display: 'flex', gap: 12 }}>
                    <EyeTwoTone style={{ cursor: 'pointer', color: '#52c41a' }} onClick={() => onView?.(record)} />
                    <EditTwoTone style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => onEdit?.(record)} />
                    <DeleteTwoTone style={{ cursor: 'pointer', color: '#f5222d' }} onClick={() => onDelete?.(record.id)} />
                </div>
            ),
        },
    ];

    return <Table columns={columns} dataSource={tableData} rowKey={(record) => record.id} />;
};
