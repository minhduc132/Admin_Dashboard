import React from 'react';
import { Modal, Descriptions, Image, Tag } from 'antd';
import { Product } from '../../types/shop';

type Props = {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    categories: { id: string, name: string }[];  // Danh sách category
    brands: { id: string, name: string }[];      // Danh sách brand
};

const ProductDetailModal: React.FC<Props> = ({ open, onClose, product, categories, brands }) => {
    if (!product) return null;

    // Tìm tên category và brand từ ID
    const categoryName = categories.find(category => category.id === product.categoryId)?.name || 'N/A';
    const brandName = brands.find(brand => brand.id === product.brandId)?.name || 'N/A';

    // Tạo màu sắc cho status
    const stockStatusColor = {
        inStock: 'green',
        outOfStock: 'red',
        preOrder: 'gold',
    }[product.stockStatus];

    return (
        <Modal
            open={open}
            title="Product Details"
            onCancel={onClose}
            footer={null}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Product Name">{product.name}</Descriptions.Item>
                <Descriptions.Item label="Image">
                    <Image width={80} src={product.imageUrl} />
                </Descriptions.Item>
                <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
                <Descriptions.Item label="Stock Status">
                    <Tag color={stockStatusColor}>{product.stockStatus}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Category">{categoryName}</Descriptions.Item>
                <Descriptions.Item label="Brand">{brandName}</Descriptions.Item>
                <Descriptions.Item label="Discount">
                    {product.discount ? `${product.discount}%` : 'No Discount'}
                </Descriptions.Item>
                <Descriptions.Item label="Review Enabled">
                    {product.isReviewEnabled ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">{product.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{product.updatedAt}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default ProductDetailModal;
