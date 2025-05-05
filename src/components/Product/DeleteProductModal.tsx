import React from 'react';
import { Modal } from 'antd';

type DeleteProductModalProps = {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    itemName?: string;
};

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    open,
    onCancel,
    onConfirm,
    itemName = 'this item',
}) => {
    return (
        <Modal
            open={open}
            title="Confirm Delete"
            onCancel={onCancel}
            onOk={onConfirm}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
        >
            <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
        </Modal>
    );
};

export default DeleteProductModal;
