import { useEffect, useState } from "react";
import { Table, Typography, Badge, Tag, Button, Space, Row, Col } from "antd";
import {
  EyeTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Product } from "../../types/shop";
import ProductDetailModal from "./ProductDetailModal";
import DeleteConfirmModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";
import AddProductModal from "./AddProductModal";
import { Card, PageHeader } from "../index";
import { Helmet } from "react-helmet-async";

const PRODUCT_TABS = [
  { key: "all", label: "All Products" },
  { key: "inStock", label: "In Stock" },
  { key: "outOfStock", label: "Out of Stock" },
  { key: "preOrder", label: "Pre-Order" },
];

export const ProductTable = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const categories: { id: string; name: string }[] = []; // bạn có thể thay bằng danh sách thực tế
  const brands: { id: string; name: string }[] = [];

  useEffect(() => {
    const saved = localStorage.getItem("productList");
    if (saved) {
      setProductList(JSON.parse(saved));
    }
  }, []);

  const formatPrice = (value: number) =>
    `$ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...productList];
    setProductList(updated);
    localStorage.setItem("productList", JSON.stringify(updated));
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setEditModalOpen(true);
  };

  const handleUpdate = (updated: Product) => {
    const newList = productList.map((p) => (p.id === updated.id ? updated : p));
    setProductList(newList);
    localStorage.setItem("productList", JSON.stringify(newList));
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    if (productToDelete) {
      const newList = productList.filter((p) => p.id !== productToDelete.id);
      setProductList(newList);
      localStorage.setItem("productList", JSON.stringify(newList));
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const filteredData =
    activeTab === "all"
      ? productList
      : productList.filter((p) => p.stockStatus === activeTab);

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          style={{ marginBottom: 0 }}
        >
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatPrice(price),
    },
    {
      title: "Stock",
      dataIndex: "stockStatus",
      key: "stockStatus",
      render: (status: string) => {
        let badgeStatus: "success" | "error" | "processing" = "processing";
        if (status === "inStock") badgeStatus = "success";
        else if (status === "outOfStock") badgeStatus = "error";
        return <Badge status={badgeStatus} text={status} />;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (id: string) => {
        const name = categories.find((c) => c.id === id)?.name || "N/A";
        return <Tag>{name}</Tag>;
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (id: string) => {
        const name = brands.find((b) => b.id === id)?.name || "N/A";
        return <Tag>{name}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <Space>
          <EyeTwoTone
            onClick={() => {
              setSelectedProduct(record);
              setIsDetailOpen(true);
            }}
          />
          <EditTwoTone onClick={() => handleEdit(record)} />
          <DeleteTwoTone
            onClick={() => {
              setProductToDelete(record);
              setDeleteModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Product Dashboard</title>
      </Helmet>

      <PageHeader
        title=""
        breadcrumbs={[{ title: "Home", path: "/" }, { title: "Product" }]}
      />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Product Management"
            extra={
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsAddModalOpen(true)}
              >
                New Product
              </Button>
            }
            tabList={PRODUCT_TABS}
            activeTabKey={activeTab}
            onTabChange={setActiveTab}
          >
            <Table
              dataSource={filteredData}
              columns={columns}
              rowKey={(record) => record.id}
            />
          </Card>
        </Col>
      </Row>

      <AddProductModal
        open={isAddModalOpen}
        onOk={() => setIsAddModalOpen(false)}
        onCancel={handleCancel}
        onAddProduct={handleAddProduct}
      />

      <ProductDetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        categories={categories}
        brands={brands}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={productToDelete?.name}
      />

      <EditProductModal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onUpdate={handleUpdate}
        product={productToEdit}
        categories={categories}
        brands={brands}
      />
    </>
  );
};
