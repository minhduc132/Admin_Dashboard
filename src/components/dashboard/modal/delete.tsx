import React from 'react';
import { Modal } from 'antd';

type DeleteConfirmModalProps = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    itemName?: string;
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    open,
    onConfirm,
    onCancel,
    itemName = 'item',
}) => {
    return (
        <Modal
            title="Confirm Delete"
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
        >
            <p style={{ textAlign: 'center', fontSize: '16px', margin: '20px 0' }}>
                Are you sure you want to delete <br />
                <strong>{itemName}</strong>?
            </p>

        </Modal>
    );
};

export default DeleteConfirmModal;
