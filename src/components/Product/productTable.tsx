import { useEffect, useState } from 'react';
import { Table, TableProps, Typography, Badge, Tag } from 'antd';
import { EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Product } from '../../types/shop';
import ProductDetailModal from '../Product/ProductDetailModal';
import DeleteConfirmModal from '../Product/DeleteProductModal';
import EditProductModal from '../Product/EditProductModal';

type Props = {
    data: Product[];
    onEdit: (product: Product) => void;  // Thêm prop onEdit
    onDelete: (id: string) => void;      // Thêm prop onDelete
    brands: { id: string; name: string }[];
    categories: { id: string; name: string }[];
} & TableProps<Product>;

export const ProductTable = ({ data, onEdit, onDelete, categories, brands, ...others }: Props) => {
    const [tableData, setTableData] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const formatPrice = (value: number) =>
        `$ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleView = (record: Product) => {
        setSelectedProduct(record);
        setIsDetailOpen(true);
    };

    const handleEdit = (record: Product) => {
        onEdit(record);
        setProductToEdit(record);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (record: Product) => {
        setProductToDelete(record);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (productToDelete) {
            onDelete(productToDelete.id);
            const newData = tableData.filter((p) => p.id !== productToDelete.id);
            setTableData(newData);
        }
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleProductUpdate = (updated: Product) => {
        const newData = tableData.map((p) =>
            p.id === updated.id ? updated : p
        );
        setTableData(newData);
        setEditModalOpen(false);
    };

    const COLUMNS = [
        {
            title: 'Image Product',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (_: any, record: Product) => (
                <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
                    {record.name}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'product_name',
            render: (_: any, record: Product) => (
                <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
                    {record.name}
                </Typography.Paragraph>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'product_price',
            render: (price: number) => formatPrice(price),
        },
        {
            title: 'Stock',
            dataIndex: 'stockStatus',
            key: 'stock_status',
            render: (status: Product['stockStatus']) => {
                let badgeStatus: 'success' | 'error' | 'processing';
                if (status === 'inStock') badgeStatus = 'success';
                else if (status === 'outOfStock') badgeStatus = 'error';
                else badgeStatus = 'processing';
                return <Badge status={badgeStatus} text={status} className="text-capitalize" />;
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (catId?: string) => {
                const categoryName = categories.find(c => c.id === catId)?.name || 'N/A';
                return <Tag color="default">{categoryName}</Tag>;
            }

        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (brandId?: string) => {
                const brand = brands.find(c => c.id === brandId)?.name || 'N/A';
                return <Tag color="default">{brand}</Tag>;
            }

        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Product) => (
                <div style={{ display: 'flex', gap: '12px' }}>
                    <EyeTwoTone style={{ color: '#52c41a', cursor: 'pointer' }} onClick={() => handleView(record)} />
                    <EditTwoTone style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => handleEdit(record)} />
                    <DeleteTwoTone style={{ color: '#faad14', cursor: 'pointer' }} onClick={() => handleDeleteClick(record)} />
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={tableData}
                columns={COLUMNS}
                rowKey={(record) => String(record.id)}
                className="overflow-scroll"
                {...others}
            />

            <ProductDetailModal
                open={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                product={selectedProduct}
                brands={brands}
                categories={categories}
            />

            <DeleteConfirmModal
                open={deleteModalOpen}
                onCancel={() => {
                    setDeleteModalOpen(false);
                    setProductToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                itemName={productToDelete?.name}
            />

            <EditProductModal
                open={editModalOpen}
                onCancel={() => {
                    setEditModalOpen(false);
                    setProductToEdit(null);
                }}
                onUpdate={handleProductUpdate}
                product={productToEdit}
                categories={[]} // truyền mảng category thực tế vào đây
                brands={[]}     // truyền mảng brand thực tế vào đây
            />

        </>
    );
};
