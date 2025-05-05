import { Modal, Descriptions, Image, Tag } from 'antd';
import { Brand } from '../../types/shop';

type Props = {
    open: boolean;
    onClose: () => void;
    brand: Brand | null;
};

const BrandDetailModal = ({ open, onClose, brand }: Props) => {
    if (!brand) return null;

    // Determine the status color based on the brand's status
    const statusColor = {
        active: 'green',
        inactive: 'gold',
        blacklisted: 'red',
    }[brand.status];

    return (
        <Modal
            open={open}
            title="Brand Details"
            onCancel={onClose}
            footer={null}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Brand Name">{brand.name}</Descriptions.Item>
                <Descriptions.Item label="Logo">
                    {/* Display brand logo with a width of 80px */}
                    <Image width={80} src={brand.logoUrl} />
                </Descriptions.Item>
                <Descriptions.Item label="Description">{brand.description}</Descriptions.Item>
                <Descriptions.Item label="Contact Info">{brand.contactInfo}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={statusColor}>{brand.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Number of Products">
                    {brand.productIds?.length || 0}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default BrandDetailModal;
