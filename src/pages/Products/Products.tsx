import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Space } from 'antd';
import { HomeOutlined, PlusOutlined, ShopOutlined } from '@ant-design/icons';
import { Card, PageHeader } from '../../components';
import { Helmet } from 'react-helmet-async';
import { Product } from '../../types/shop';
import { ProductTable } from '../../components/Product/productTable';
import AddProductModal from '../../components/Product/AddProductModal';
import ProductDetailModal from '../../components/Product/ProductDetailModal';

import EditProductModal from '../../components/Product/EditProductModal'; // Đảm bảo đã import modal chỉnh sửa
import { Brand } from '../../types/shop'; // đảm bảo bạn đã tạo type này
import { Category } from '../../types/shop'; // nếu có loại sản phẩm

const PRODUCT_TABS = [
    { key: 'all', label: 'All Products' },
    { key: 'inStock', label: 'In Stock' },
    { key: 'outOfStock', label: 'Out of Stock' },
    { key: 'preOrder', label: 'Pre-Order' },
];

export const ProductDashboardPage = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal sửa sản phẩm
    const [activeTab, setActiveTab] = useState<string>('all');
    const [productToEdit, setProductToEdit] = useState<Product | null>(null); // Sản phẩm để chỉnh sửa

    useEffect(() => {
        const saved = localStorage.getItem('productList');
        if (saved) {
            setProductList(JSON.parse(saved));
        }
    }, []);

    const handleAddProduct = (newProduct: Product) => {
        const updated = [newProduct, ...productList];
        setProductList(updated);
        localStorage.setItem('productList', JSON.stringify(updated));
    };

    const handleDelete = (id: string) => {
        const updated = productList.filter(p => p.id !== id);
        setProductList(updated);
        localStorage.setItem('productList', JSON.stringify(updated));
    };

    const handleEdit = (product: Product) => {
        setProductToEdit(product); // Chọn sản phẩm để sửa
        setIsEditModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleUpdateProduct = (updatedProduct: Product) => {
        const updatedList = productList.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        setProductList(updatedList);
        localStorage.setItem('productList', JSON.stringify(updatedList));
        setIsEditModalOpen(false); // Đóng modal sau khi cập nhật
    };

    const filteredData = activeTab === 'all'
        ? productList
        : productList.filter(p => p.stockStatus === activeTab);

    return (
        <div>
            <Helmet>
                <title>Product Dashboard</title>
            </Helmet>

            <PageHeader
                title=""
                breadcrumbs={[
                    {
                        title: (
                            <>
                                <HomeOutlined />
                                <span>Home</span>
                            </>
                        ),
                        path: '/',
                    },
                    { title: 'Product' },
                ]}
            />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Product Management"
                        extra={
                            <Space>
                                <Button icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                    New Product
                                </Button>
                            </Space>
                        }
                        tabList={PRODUCT_TABS}
                        activeTabKey={activeTab}
                        onTabChange={setActiveTab}
                    >
                        <ProductTable
                            data={filteredData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            brands={[]}
                            categories={[]}
                        />
                    </Card>

                    <AddProductModal
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                        onAddProduct={handleAddProduct}
                    // brandId={[]}
                    // categories={[]}
                    />

                    <ProductDetailModal
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        product={productToEdit}
                        categories={[]}
                        brands={[]}
                    />

                </Col>
            </Row>
        </div>
    );
};
