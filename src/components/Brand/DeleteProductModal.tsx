import { Modal } from 'antd';

type Props = {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    itemName?: string;
};

const DeleteBrandModal = ({ open, onCancel, onConfirm, itemName }: Props) => {
    return (
        <Modal
            open={open}
            title="Confirm brand delete"
            onCancel={onCancel}
            onOk={onConfirm}
            okText="Delete"
            cancelText="Cancel"
        >
            Are you sure you want to delete the <strong>{itemName}</strong> brand?
        </Modal>
    );
};

export default DeleteBrandModal;
