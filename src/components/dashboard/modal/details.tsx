import React from 'react';
import { Modal, Descriptions } from 'antd';

interface UserDetailModalProps {
    open: boolean;
    onClose: () => void;
    user: any | null;  // Sử dụng `user` thay vì `project`
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ open, onClose, user }) => {
    if (!user) return null;

    return (
        <Modal
            title="User Details"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Name">{`${user.firstName} ${user.lastName}`}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                <Descriptions.Item label="Status">{user.status}</Descriptions.Item>
                <Descriptions.Item label="Joined Date">{user.joinedDate}</Descriptions.Item>
                <Descriptions.Item label="Location">{user.location}</Descriptions.Item>
                <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                <Descriptions.Item label="Department">{user.department}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default UserDetailModal;
