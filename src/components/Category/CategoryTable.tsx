import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Table, Typography, Row, Col, Button, Space } from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, PageHeader } from "~/components";
import { AddCategoryModal, EditCategoryModal } from "~/components/Category";
import { Category } from "~/types/shop";

const CategoryTable = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("categoryList");
    if (saved) {
      setCategoryList(JSON.parse(saved));
    }
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    const updated = [newCategory, ...categoryList];
    setCategoryList(updated);
    localStorage.setItem("categoryList", JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = categoryList.filter((c) => c.id !== id);
    setCategoryList(updated);
    localStorage.setItem("categoryList", JSON.stringify(updated));
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    const updatedList = categoryList.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category,
    );
    setCategoryList(updatedList);
    localStorage.setItem("categoryList", JSON.stringify(updatedList));
    setIsEditModalOpen(false);
  };

  const COLUMNS = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: Category) => (
        <Typography.Paragraph ellipsis={{ rows: 1 }}>
          {record.name}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Category Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, record: Category) => (
        <Typography.Paragraph ellipsis={{ rows: 1 }}>
          {record.description}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <div style={{ display: "flex", gap: "12px" }}>
          <EditTwoTone
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
          <DeleteTwoTone
            style={{ color: "#faad14", cursor: "pointer" }}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Category Dashboard</title>
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
            path: "/",
          },
          { title: "Category" },
        ]}
      />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Category Management"
            extra={
              <Space>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  New Category
                </Button>
              </Space>
            }
          >
            <Table
              dataSource={categoryList}
              columns={COLUMNS}
              rowKey={(record) => record.id}
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
    </>
  );
};

export default CategoryTable;
