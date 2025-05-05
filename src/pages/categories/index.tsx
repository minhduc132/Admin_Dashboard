import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Space } from 'antd';
import { HomeOutlined, PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Card, PageHeader } from '../../components';
import { Helmet } from 'react-helmet-async';
import { Category } from '../../types/shop';
import { CategoryTable } from '../../components/Category/CategoryTable';
import AddCategoryModal from '../../components/Category/AddCategoryModal';
import EditCategoryModal from '../../components/Category/EditCategoryModal';

export const CategoryDashboardPage = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('categoryList');
        if (saved) {
            setCategoryList(JSON.parse(saved));
        }
    }, []);

    const handleAddCategory = (newCategory: Category) => {
        const updated = [newCategory, ...categoryList];
        setCategoryList(updated);
        localStorage.setItem('categoryList', JSON.stringify(updated));
    };

    const handleDelete = (id: string) => {
        const updated = categoryList.filter(c => c.id !== id);
        setCategoryList(updated);
        localStorage.setItem('categoryList', JSON.stringify(updated));
    };

    const handleEdit = (category: Category) => {
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };

    const handleUpdateCategory = (updatedCategory: Category) => {
        const updatedList = categoryList.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
        );
        setCategoryList(updatedList);
        localStorage.setItem('categoryList', JSON.stringify(updatedList));
        setIsEditModalOpen(false);  // Đóng modal sau khi cập nhật
    };

    return (
        <div>
            <Helmet>
                <title>Category Dashboard</title>
            </Helmet>

            <PageHeader
                title=""
                breadcrumbs={[{ title: <><HomeOutlined /><span>Home</span></>, path: '/' }, { title: 'Category' }]}
            />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Category Management"
                        extra={
                            <Space>
                                <Button icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                    New Category
                                </Button>
                            </Space>
                        }
                    >
                        <CategoryTable
                            data={categoryList}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </Card>
                </Col>
            </Row>

            <AddCategoryModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={(newCategory) => {
                    handleAddCategory(newCategory);
                    setIsModalOpen(false);
                }}
            />

            <EditCategoryModal
                open={isEditModalOpen}
                category={currentCategory}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={handleUpdateCategory}
            />
        </div>
    );
};
