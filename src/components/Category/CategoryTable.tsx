import { useState, useEffect } from 'react';
import { Table, TableProps, Typography } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Category } from '../../types/shop';

type Props = {
    data: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
} & TableProps<Category>;

export const CategoryTable = ({ data, onEdit, onDelete, ...others }: Props) => {
    const [tableData, setTableData] = useState<Category[]>([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleEdit = (record: Category) => {
        onEdit(record);
    };

    const handleDeleteClick = (record: Category) => {
        onDelete(record.id);
    };

    const COLUMNS = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: Category) => (
                <Typography.Paragraph ellipsis={{ rows: 1 }}>
                    {record.name}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Category Description',
            dataIndex: 'desrciption',
            key: 'desrciption',
            render: (_: any, record: Category) => (
                <Typography.Paragraph ellipsis={{ rows: 1 }}>
                    {record.description}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Category) => (
                <div style={{ display: 'flex', gap: '12px' }}>
                    <EditTwoTone style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => handleEdit(record)} />
                    <DeleteTwoTone style={{ color: '#faad14', cursor: 'pointer' }} onClick={() => handleDeleteClick(record)} />
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={tableData}
            columns={COLUMNS}
            rowKey={(record) => record.id}
            {...others}
        />
    );
};
