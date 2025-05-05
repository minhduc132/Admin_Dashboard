import { useState, useEffect } from 'react';
import { Badge, BadgeProps, Table, TableProps, Tag, TagProps, Typography } from 'antd';
import { EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import UserDetailModal from '../dashboard/modal/details';
import DeleteConfirmModal from '../dashboard/modal/delete';
import EditUserModal from '../dashboard/modal/edit';
import { User } from '../../types/authService';

type Props = {
    data: User[];
} & TableProps<User>;

export const UserTable = ({ data, ...others }: Props) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tableData, setTableData] = useState<User[]>([]); // clone dữ liệu
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleView = (record: User) => {
        setSelectedUser(record);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (record: User) => {
        setUserToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            const newData = tableData.filter(
                (user) => user.id !== userToDelete.id  // Dùng id để xác định người dùng cần xóa
            );
            setTableData(newData);
        }
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleUserUpdate = (updated: User) => {
        const newData = tableData.map((u) =>
            u.id === updated.id ? updated : u
        );
        setTableData(newData);
        setEditModalOpen(false);
    };

    const COLUMNS = [
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'user_name',
            render: (_: any, { firstName, lastName }: User) => (
                <Typography.Paragraph
                    ellipsis={{ rows: 1 }}
                    className="text-capitalize"
                    style={{ marginBottom: 0 }}
                >
                    {`${firstName} ${lastName}`}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'user_email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'user_role',
            render: (_: any) => <Tag className="text-capitalize">{_}</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'user_status',
            render: (_: any) => {
                let status: BadgeProps['status'];
                if (_ === 'active') status = 'success';
                else if (_ === 'inactive') status = 'default';
                else status = 'warning';
                return <Badge status={status} text={_} className="text-capitalize" />;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => (
                <div style={{ display: 'flex', gap: '12px' }}>
                    <EyeTwoTone
                        style={{ color: '#52c41a', cursor: 'pointer' }}
                        onClick={() => handleView(record)}
                    />
                    <EditTwoTone
                        style={{ color: '#1890ff', cursor: 'pointer' }}
                        onClick={() => {
                            setUserToEdit(record);
                            setEditModalOpen(true);
                        }}
                    />
                    <DeleteTwoTone
                        style={{ color: '#faad14', cursor: 'pointer' }}
                        onClick={() => handleDeleteClick(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={tableData}
                columns={COLUMNS}
                rowKey={(record) => String(record.id)}  // Dùng id của người dùng làm key
                className="overflow-scroll"
                {...others}
            />

            {/* Modal xem chi tiết người dùng */}
            <UserDetailModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />

            {/* Modal xác nhận xóa */}
            <DeleteConfirmModal
                open={isDeleteModalOpen}
                onCancel={() => {
                    setIsDeleteModalOpen(false);
                    setUserToDelete(null); // reset state modal
                }}
                onConfirm={handleDeleteConfirm}
                itemName={userToDelete?.firstName}  // Hiển thị tên người dùng khi xóa
            />

            {/* Modal chỉnh sửa người dùng */}
            <EditUserModal
                open={editModalOpen}
                onCancel={() => {
                    setEditModalOpen(false);
                    setUserToEdit(null); // reset state mở model
                }}
                onUpdate={handleUserUpdate}
                user={userToEdit}
            />
        </>
    );
};
